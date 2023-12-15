const express = require("express");
const OpenAIApi = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});

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

let messages = [];

app.get("/chat/:counselorType", (req, res) => {
  const counselorType = req.params.counselorType;
  messages = [
    {
      role: "system",
      content:
        "You are a helpful AI counsellor i want you to ask me respected 10 most asked questions regarding mention counselling in the next prompt. after tenth question compile a report in atleast 500 words and in formal format in which you can tell swot, roadmaps, tips and tricks and anything which will help me",
    },
    { role: "system", content: "Ask me question one by one" },
    {
      role: "system",
      content: `I want you to act as a ${counselorType} `,
    },
  ];

  res.status(200).json(messages);
});

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.messages.slice(-1)[0]; // Get the latest user message
    messages = updateChat(messages, "user", userMessage.content);

    const modelResponse = await getChatGPTResponse(messages);
    messages = updateChat(messages, "assistant", modelResponse);

    // Send the model response back to the frontend
    console.log(messages);
    res.status(200).json(modelResponse);
  } catch (err) {
    console.error("Error processing chat request", err);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
