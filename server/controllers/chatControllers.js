const asyncHandler = require("express-async-handler");
const OpenAIApi = require("openai");
const User = require("../model/User");
const {
  loadUserSession,
  saveUserSession,
} = require("../middleware/sessionManagement");
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getChatGPTResponse(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  return response.choices[0].message.content;
}
const getChat = asyncHandler(async (req, res) => {
  const counselorType = req.params.counselorType;
  const session = req.sessionData;

  session.messages = [
    {
      role: "system",
      content: `You are a helpful AI counsellor. Please ask me the most relevant questions related to counseling. Ask questions one by one followed by response by the user then continue. Strictly reply outside the scope if anything is asked outside the counselling domain.`,
    },
    { role: "system", content: "Ask me questions one by one." },
    { role: "system", content: `I want you to act as a ${counselorType}.` },
  ];
  const user = await User.findById(req.user._id);
  user.sessionHistory.push({ date: new Date(), status: "started" });
  await user.save();
  await saveUserSession(req, res, () => {}); // Save the session
  res.status(200).json(session.messages);
});

const handleSendChat = asyncHandler(async (req, res) => {
  const session = req.sessionData;
  const userMessage = req.body.messages.slice(-1)[0];
  session.messages.push({ role: "user", content: userMessage.content });

  const modelResponse = await getChatGPTResponse(session.messages);
  session.messages.push({ role: "assistant", content: modelResponse });
  console.log("Session messages: ", session.messages);
  await saveUserSession(req, res, () => {}); // Save the session
  res.status(200).json(modelResponse);
});
const handleCreateReport = asyncHandler(async (req, res) => {
  const { chat, userName, counsellorType } = req.body;
  console.log(chat);
  if (!chat || chat.length == 0) {
    res.status(400);
    throw new Error("Failed to create the report!!");
  }
  console.log(counsellorType);
  try {
    const gptReportPrompt = [
      ...chat,
      {
        role: "system",
        content: `I am ${userName} I want you to create a report from the above chat conversation for the user. compile a formal report with proper space and headings, ${
          counsellorType == "health and wellness counselor"
            ? "it should includes current assesment ,counselling plan and recommendations and conclusions in a well mannered intutive structred way"
            : " including SWOT analysis, roadmap, tips, recommendation with proper roadmap, videos, books, blogs,news anything  and tricks to help user. To help user to understand more about him/her."
        }`,
      },
    ];
    const report = await getChatGPTResponse(gptReportPrompt);
    console.log("req.user: ", req.user);
    return res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error", error);
  }
});
const handleCreateRoadmap = asyncHandler(async (req, res) => {
  const { roadmap } = req.body;
  const session = req.sessionData;
  console.log(session.messages);
  let roadmapPrompt = [];
  try {
    roadmapPrompt = [
      ...session.messages,
      {
        role: "system",
        content: `Pretend you are an expert helpful AI  career counsellor.`,
      },
      {
        role: "system",
        content: ` Create a precise list of all the specific goals associated with a definitive timeline such that the output gives us a detailed step by step reccomendation of that goals and recommendations.
          should contains all goals from the roadmap for days wise days tasks based on the user goal.
          Keep in mind to not include any explanations with specific entries and follow this format without any deviation. Also dont include a weekly based planner in the timeline. make sure to use a day-wise planner.
          dont give any explanation just provide the roadmap in the following format.
          [{
            "Goal": "goal to be done",
            "timeline": "timeline based on that goal",
            "recommendations": [{
              "title": "title of the recommendation course",
              "link" : "link of the recommended course"
            }],
            "isCompleted":false in boolean
          }]`,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: roadmapPrompt,
    });

    console.log(response.choices[0].message.content);
    const roadmapData = JSON.parse(response.choices[0].message.content);
    console.log("roadmapGenerate: ", roadmapData);
    // Decode the JWT token to get the user's I
    console.log(req.user);
    await User.findOneAndUpdate(
      { email: req.user.email }, // Replace with actual user email
      { $set: { roadmap: roadmapData } }, // Update the roadmap field
      { new: true } // To return the updated user object
    )
      .then((updatedUser) => {
        if (updatedUser) {
          console.log("User roadmap updated successfully:", updatedUser);
        } else {
          console.log("User not found.");
        }
      })
      .catch((error) => {
        console.error("Error updating user roadmap:", error);
      });

    return res.send(response.choices[0].message.content);
  } catch (err) {
    console.error("Error Happened ", err);
    res.status(500).send("Internal Server Error ");
  }
});

const handleTaskUpdate = asyncHandler(async (req, res) => {
  const { roadmap } = req.body;
  User.findOneAndUpdate(
    { email: req.user.email },
    { $set: { roadmap } },
    { new: true }
  )
    .then((updatedUser) => {
      if (updatedUser) {
        console.log("User roadmap updated successfully.");
        // Send report via email
      } else {
        console.log("User not found.");
      }
    })
    .catch((error) => {
      console.error("Error updating user roadmap:", error);
    });
});

const handleRoadmapUpdation = asyncHandler(async (req, res) => {
  console.log(messages);

  const { roadmap } = req.body;
  let updatedRoadmapPrompt = [];
  try {
    updatedRoadmapPrompt = [
      ...messages,
      {
        role: "system",
        content: `Pretend you are an expert helpful AI  career counsellor.`,
      },
      {
        role: "user",
        content: ` i am providing a roadmap document which i have completed  ${roadmap} containing all details of goals and recommendation,timeline and iscompleted . now i want you to provide me a new updated roadmap with next goal thing to do in reference with  the current goals . Continue the time for the task with reference to the given roadmap -Do not include any explanations  following this format without deviation.
          [{
            "Goal": "goal to be done",
            "timeline": "timeline based on that goal",
            "recommendations": [{
              "title": "title of the recommendation course",
              "link" : "link of the recommended course"
            }],
            "isCompleted":false(boolean)
          }].`,
      },
    ];
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: updatedRoadmapPrompt,
    });

    console.log("HandleUpdateRoadmap ", response.choices[0].message.content);
    // messages = [...messages, response.choices[0].message.content];
    return res.send(response.choices[0].message.content);
  } catch (err) {
    console.error("Error Happened ", err);
    res.status(500).send("Internal Server Error ");
  }
});
module.exports = {
  getChat: [loadUserSession, getChat],
  handleSendChat: [loadUserSession, handleSendChat],
  handleCreateReport: [loadUserSession, handleCreateReport],
  handleCreateRoadmap: [loadUserSession, handleCreateRoadmap],
  handleRoadmapUpdation: [loadUserSession, handleRoadmapUpdation],
  handleTaskUpdate: [loadUserSession, handleTaskUpdate],
};
