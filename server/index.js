require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/User");
const chatRouter = require("./routes/Chat"); // Import chatRouter module
const { errorHandler, notFound } = require("./middleware/errorMiddleWare");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors());

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/chat", chatRouter); // Use chatRouter for /chat route

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {}
};

start();
