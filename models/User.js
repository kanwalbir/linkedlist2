const mongoose = require("mongoose");
const uuidv4 = require("uuid/v4");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, min: 1, max: 55, required: true },
    lastName: { type: String, min: 1, max: 55, required: true },
    username: {
      type: String,
      min: 1,
      max: 55,
      required: true,
      index: { unique: true }
    },
    email: {
      type: String,
      min: 1,
      max: 55,
      required: true,
      index: { unique: true }
    },
    password: { type: String, min: 1, max: 55, required: true },
    currentCompany: { type: String, min: 1, max: 55 },
    photo: { type: String }, //mongoose.SchemaTypes.Url,
    experience: [
      {
        jobTitle: { type: String },
        company: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Company"
        },
        startDate: { type: Date },
        endDate: { type: Date, default: Date.now }
      }
    ],
    education: [
      {
        institution: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Inst"
        },
        degree: String,
        endDate: { type: Date }
      }
    ],
    skills: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Skill"
      }
    ],
    jobsApplied: [
      {
        jobId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Job"
        }
      }
    ],
    connection: [
      {
        userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
      }
    ],
    messages: [
      {
        messageId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Message"
        }
      }
    ]
  },
  { timestamps: true }
);

async function _hashPassword(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const hashed = await bcrypt.hash(this.password, SALT_WORK_FACTOR);
    this.password = hashed;
    return next();
  } catch (err) {
    return next(err);
  }
}

userSchema.pre("save", _hashPassword);
userSchema.pre("findOneAndUpdate", _hashPassword);

userSchema.methods.comparePassword = function(userPassword, next) {
  bcrypt.compare(userPassword, this.password, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    return next(null, isMatch);
  });
};

const User = mongoose.model("User", userSchema);
module.exports = User;
