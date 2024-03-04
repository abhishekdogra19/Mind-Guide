require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/User");
const chatRouter = require("./routes/Chat"); // Import chatRouter module
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter); // Use chatRouter for /chat route

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
