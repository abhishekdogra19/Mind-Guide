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
      content: `You are a helpful AI counsellor. Please ask me the 10 most respected questions related to counseling. After the tenth question, compile a formal report, including SWOT analysis, roadmap, tips, and tricks to help me.`,
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

module.exports = {
  getChat,
  handleSendChat,
};
