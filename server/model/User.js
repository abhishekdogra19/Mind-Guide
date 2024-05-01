const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
    // skills:[String]
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
  if (!this.isModified) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createJWT = function () {
  return jwt.sign(
    { email: this.email, _id: this._id, name: this.name, pic: this.pic },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME,
    }
  );
};
const User = mongoose.model("User", userSchema);
module.exports = User;
