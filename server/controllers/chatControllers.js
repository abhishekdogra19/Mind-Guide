const asyncHandler = require("express-async-handler");
const OpenAIApi = require("openai");

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
      content: `You are a helpful AI counsellor. Please ask me the most relevant questions related to counseling. Ask questions one by one followed by response by the user then continue.`,
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
        content: `I am ${userName} I want you to create a report from the above chat conversation for the user. compile a formal report, including SWOT analysis, roadmap, tips, and tricks to help user. To help user to understand more about him/her.`,
      },
    ];
    const report = await getChatGPTResponse(gptReportPrompt);
    return res.status(200).json(report);
  } catch (error) {
    res.status(500);
    throw new Error("Internal Server Error");
  }
});
module.exports = {
  getChat,
  handleSendChat,
  handleCreateReport,
};
