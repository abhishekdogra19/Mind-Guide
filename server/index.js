require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/connectDB");
const userRouter = require("./routes/User");
const chatRouter = require("./routes/Chat"); // Import chatRouter module
const { errorHandler, notFound } = require("./middleware/errorMiddleware");
const path = require("path");
const app = express();
const port = 3001;

app.use(bodyParser.json());
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:4000",
  "https://chat-app-zpvi.onrender.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  optionsSuccessStatus: 204,
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.json());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/chat", chatRouter); // Use chatRouter for /chat route
app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"), (err) => {
    if (err) {
      console.error("Error sending file:", err);
    }
  });
});
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
