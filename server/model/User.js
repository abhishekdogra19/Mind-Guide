const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const skillTypes = ["technical", "nontechnical"];
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    pic: {
      type: String,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    skills: [
      {
        skill: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: skillTypes,
          default: "technical", // Default to technical if not provided
        },
      },
    ],
    roadmap: {
      type: [
        {
          Goal: String,
          timeline: String,
          recommendations: [
            {
              title: String,
              link: String,
            },
          ],
          isCompleted: Boolean,
        },
      ],
      default: [], // You may want to set a default value as an empty array
    },
    sessionHistory: [
      {
        date: { type: Date, default: Date.now },
      },
    ],
    reportHistory: [
      {
        date: { type: Date, default: Date.now },
        title: { type: String, default: "New Report" },
        filePath: { type: String, default: "" },
      },
    ],
  },

  {
    timeStamps: true,
  }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createJWT = function () {
  return jwt.sign(
    {
      email: this.email,
      _id: this._id,
      name: this.name,
      pic: this.pic,
      createdAt: this._id.getTimestamp(),
      skills: this.skills,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
const User = mongoose.model("User", userSchema);
module.exports = User;
