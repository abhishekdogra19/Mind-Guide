const asyncHandler = require("express-async-handler");
const User = require("../model/User");
const OpenAIApi = require("openai");
const openai = new OpenAIApi({
  apiKey: process.env.OPENAI_API_KEY,
});
const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
require("aws-sdk/lib/maintenance_mode_message").suppress = true;
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }
  const user = await User.create({
    name,
    email,
    pic,
    password,
  });
  if (user) {
    res.status(201).json(user);
  } else {
    res.status(400);
    throw new Error("Failed to create the user!!");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }
  const user = await User.findOne({ email });
  if (!user) {
    res.status(400);
    throw new Error("Invalid Credentials");
  }
  // Check Password
  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    throw new Error("Invalid Credentials");
  }
  const token = user.createJWT();
  res.cookie("token", token, {
    expires: new Date(Date.now() + 604800000),
  });
  return res.status(200).json({
    ...user._doc,
    createdAt: user._id.getTimestamp(),
    password: undefined,
  });
});
const getUserProfile = asyncHandler(async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    let user = await User.findById(decoded._id).select("-password");
    return res.status(200).json({
      ...user._doc,
      createdAt: user._id.getTimestamp(),
    });
  }
  return res.status(200).json(null);
});
const handleLogout = asyncHandler(async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

const handleGetRoadmap = asyncHandler(async (req, res) => {
  console.log(req.user);
  try {
    // Assuming you're identifying the user somehow, such as through a JWT token
    const userId = req.user._id; // Replace with actual user identifier

    // Find the user by their ID
    const user = await User.findById(userId);

    // Check if the user exists and has a roadmap
    if (user && user.roadmap && user.roadmap.length > 0) {
      // If user has a roadmap, send it in the response
      return res.status(200).json({ roadmap: user.roadmap });
    } else {
      // If user does not have a roadmap, send a message indicating so
      return res.status(200).json({ roadmap: [] });
    }
  } catch (error) {
    // If an error occurs, send an error response
    console.error("Error fetching roadmap:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
const handleGetUserData = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (user) {
      return res.status(200).json({ user });
    } else {
      return res.status(200).json({ user: null });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
const handleGetAllUserData = asyncHandler(async (req, res) => {
  try {
    console.log("All USer Data");
    const users = await User.find({}, "-password -pic -skills -roadmap");

    if (users) {
      return res.status(200).json({ users });
    } else {
      return res.status(200).json({ user: null });
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
const handleReportUpload = asyncHandler(async (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const { counsellorType } = req.params;
  const { email } = req.user;

  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `pdfs/${Date.now()}_${req.file.originalname}`,
    Body: req.file.buffer,
    ContentType: "application/pdf",
  };

  try {
    const data = await s3.upload(params).promise();

    // Add the new report to the user's reportHistory
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          reportHistory: {
            title: `${counsellorType} Session Report`, // Customize the title as needed
            filePath: data.Location,
          },
        },
      },
      { new: true, upsert: true } // Upsert true to ensure the document is created if it does not exist
    );
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
      subject: "Mind Guide Session Report",
      html: `
      <!DOCTYPE html>
      <html lang="en">

      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Download Your Mind Guide Session Report</title>
          <style>
              body {
                  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #f0f0f0;
                  color: #333;
              }

              .container {
                  max-width: 600px;
                  margin: 20px auto;
                  padding: 20px;
                  background-color: #ffffff;
                  border-radius: 10px;
                  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                  text-align: center;
              }

              h1 {
                  color: #2a5298;
              }

              p {
                  color: #666;
                  line-height: 1.5;
                  margin: 10px 0;
              }

              a {
                  display: inline-block;
                  padding: 10px 20px;
                  margin-top: 20px;
                  background-color: #007bff;
                  color: #ffffff;
                  text-decoration: none;
                  border-radius: 5px;
                  transition: background-color 0.3s;
              }

              a:hover {
                  background-color: #0056b3;
              }

              .footer {
                  text-align: center;
                  font-size: 0.85em;
                  margin-top: 40px;
                  color: #777;
              }
          </style>
      </head>

      <body>
          <div class="container">
              <h1>Your Mind Guide Session Report</h1>
              <p>Dear ${req.user.name},</p>
              <p>Your latest session report is now available for download:</p>
              <a href=${data.Location} target="_blank">Download Report</a>
              <p>If you encounter any issues, please do not hesitate to contact us.</p>

              <div class="footer">
                  <p>Thank you for choosing Mind Guide.</p>
                  <p><a href="https://mind-guide.onrender.com" target="_blank">Visit our Website</a></p>
              </div>
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

    console.log("updatedUser ", updatedUser);
    res.status(200).send({
      message: "PDF uploaded and saved to report history successfully",
      url: data.Location,
      user: updatedUser,
    });
  } catch (err) {
    console.error("Error uploading to S3 or updating user:", err);
    res.status(500).send(err.message);
  }
});
const handleGetAllReports = asyncHandler(async (req, res) => {
  const { email } = req.user;
  try {
    const user = await User.findOne({ email });
    if (user) {
      return res.status(200).json(user.reportHistory);
    }
    return res.status(200).json([]);
  } catch (error) {
    console.error("Error fetching reports:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
const handleGetSkills = asyncHandler(async (req, res) => {
  // Make API request to fetch short heading based on the provided roadmap
  // Example:
  // console.log("heading started");
  // console.log("goalsss!!!!!!------------>");
  // const { email } = req.user;
  const { email } = req.user;
  const user = await User.findOne({ email });
  const getroadmap = user.roadmap;
  const goals = getroadmap.map((item) => item.Goal);
  console.log("goals: ", goals);
  // console.log(typeof getroadmap);
  // console.log(getroadmap);

  const Heading = [
    {
      role: "system",
      content: `given this is goals -> ${goals} go through this  goals   and split the goals into two categories one should have non technical skill that the goal is aiming to provide and in second category  out of it  provide me striclty   containing  techinal skill name  of  what this  goals is aiming to provide and strictly make sure to only add technical skills topic name strictly only and note that the tecnical skill name should  be in less bare minimum words.and if there is no technical skills then send me empty. The desired skill topic should reflect the main thing that  goals is trying to achieve and that technical skill name should be revelant in realm of development only and after splitting into two i want you to send me in strictly below format and dont add anything other than the format specified below very strictly. 
      [{
        "skill": "name of the skill",
        "type": "technical Or nontechnical",
      }] in json format only.
      `,
    },
  ];
  // console.log("Heading:", response.choices[0].message.content);
  // console.log(response.choices[0].message.content);
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: Heading,
    });
    let skill = response.choices[0].message.content;

    skill = JSON.parse(skill);
    const user = await User.findOne({ email });
    skill.forEach((element) => {
      user.skills.push(element);
    });
    user.roadmap = [];
    await user.save();
    res.cookie("token", user.createJWT(), {
      expires: new Date(Date.now() + 604800000),
    });
    res.json(user);
  } catch (error) {
    console.log("error happened while saving skills", error);
    res.json("Error while saving User skills!!!");
  }
});
module.exports = {
  registerUser,
  authUser,
  getUserProfile,
  handleLogout,
  handleGetRoadmap,
  handleGetUserData,
  handleReportUpload,
  handleGetAllReports,
  handleGetSkills,
  handleGetAllUserData,
};
