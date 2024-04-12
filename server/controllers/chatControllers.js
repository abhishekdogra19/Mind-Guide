const asyncHandler = require("express-async-handler");
const OpenAIApi = require("openai");
const User = require("../model/User");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

let messages = [];
function updateChat(messages, role, content) {
  messages.push({ role, content });
  return messages;
}

async function getChatGPTResponse(messages) {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: messages,
  });

  return response.choices[0].message.content;
}

const getChat = (req, res) => {
  const counselorType = req.params.counselorType;
  messages = [
    {
      role: "system",
      content: `You are a helpful AI counsellor. Please ask me the most relevant questions related to counseling. Ask questions one by one followed by response by the user then continue. Striclty reply outside the scope if anything is asked outside the counselling domain.`,
    },
    { role: "system", content: "Ask me questions one by one." },
    {
      role: "system",
      content: `I want you to act as a ${counselorType}.`,
    },
  ];

  res.status(200).json(messages);
};

const handleSendChat = asyncHandler(async (req, res) => {
  try {
    const userMessage = req.body.messages.slice(-1)[0];
    messages = updateChat(messages, "user", userMessage.content);

    const modelResponse = await getChatGPTResponse(messages);
    messages = updateChat(messages, "assistant", modelResponse);

    console.log(messages);
    res.status(200).json(modelResponse);
  } catch (err) {
    console.error("Error processing chat request", err);
    res.status(500).send("Internal Server Error");
  }
});

const handleCreateReport = asyncHandler(async (req, res) => {
  const { chat, userName } = req.body;
  console.log(chat);
  if (!chat || chat.length == 0) {
    res.status(400);
    throw new Error("Failed to create the report!!");
  }
  try {
    const gptReportPrompt = [
      ...chat,
      {
        role: "system",
        content: `I am ${userName} I want you to create a report from the above chat conversation for the user. compile a formal report with proper space and headings, including SWOT analysis, roadmap, tips, recommendation with proper roadmap, videos, books, blogs,news anything  and tricks to help user. To help user to understand more about him/her.`,
      },
    ];
    report = await getChatGPTResponse(gptReportPrompt);
    return res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});
const handleCreateRoadmap = asyncHandler(async (req, res) => {
  const { roadmap } = req.body;
  let roadmapPrompt = [];
  try {
    roadmapPrompt = [
      ...messages,
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
    User.findOneAndUpdate(
      { email: req.user.email }, // Replace with actual user email
      { $set: { roadmap: roadmapData } }, // Update the roadmap field
      { new: true } // To return the updated user object
    )
      .then((updatedUser) => {
        if (updatedUser) {
          console.log("User roadmap updated successfully:", updatedUser);
          const transporter = nodemailer.createTransport({
            // Configure your email service provider
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.Email,
              pass: process.env.PASS,
            },
            tls: {
              rejectUnauthorized: false,
            },
          });
          const mailOptions = {
            from: `${process.env.USERNAME}`,
            to: req.user.email,
            subject: "Verify your Account",
            html: `
                  <!DOCTYPE html>
                  <html lang="en">
                  
                  <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Email Verification</title>
                      <style>
                          /* Add your custom CSS styles here */
                          body {
                              font-family: Arial, sans-serif;
                              line-height: 1.6;
                              margin: 0;
                              padding: 0;
                              background-color: #f4f4f4;
                              text-align: center;
                          }
                  
                          .container {
                              max-width: 600px;
                              margin: 20px auto;
                              padding: 20px;
                              background-color: #fff;
                              border-radius: 8px;
                              box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                          }
                  
                          h1 {
                              color: #333;
                          }
                  
                          h2 {
                              color: #007bff;
                          }
                  
                          p {
                              margin-bottom: 20px;
                              color: #666;
                          }
                  
                          .verify-button {
                              display: inline-block;
                              padding: 10px 20px;
                              background-color: #007bff;
                              color: #fff;
                              text-decoration: none;
                              border-radius: 5px;
                              margin-top: 20px;
                              transition: background-color 0.3s, transform 0.3s;
                          }
                  
                          .verify-button:hover {
                              background-color: #0056b3;
                              transform: scale(1.05);
                          }
                  
                          .section {
                              margin-bottom: 30px;
                          }
                  
                          .footer {
                              margin-top: 30px;
                              border-top: 1px solid #ddd;
                              padding-top: 20px;
                          }
                  
                          .footer a {
                              color: #007bff;
                              text-decoration: none;
                              transition: color 0.3s;
                          }
                  
                          .footer a:hover {
                              color: #0056b3;
                          }
                      </style>
                  </head>
                  
                  <body>
                      <div class="container">
                      Hi    
                      </div>
                  </body>
                  
                  </html>
                  `,
          };

          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("NodeMailer Error:", error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
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
  getChat,
  handleSendChat,
  handleCreateReport,
  handleCreateRoadmap,
  handleRoadmapUpdation,
  handleTaskUpdate,
};

// On Friay Add A frontend Funtionality in which user an create the roadmap before that it must create roadmap using the conversation.
