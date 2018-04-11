const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const SALT_WORK_FACTOR = 10;

const companySchema = new mongoose.Schema(
  {
    name: { type: String, min: 1, max: 55, required: true }, //Needs to be immutable
    email: { type: String, min: 1, max: 55, required: true },
    handle: { type: String, min: 1, max: 55, required: true },
    password: { type: String, min: 1, max: 55, required: true },
    logo: { type: String }, //mongoose.SchemaTypes.Url,
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ],
    jobs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job"
      }
    ]
  },
  { timestamps: true }
);

companySchema.pre("findOneAndUpdate", function(monNext) {
  const password = this.getUpdate().password;
  if (!password) {
    return monNext();
  }
  try {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(password, salt);
    this.getUpdate().password = hash;
    return monNext();
  } catch (error) {
    return next(error);
  }
});

companySchema.pre("save", function(monNext) {
  if (!this.isModified("password")) {
    return monNext();
  }
  return bcrypt
    .hash(this.password, SALT_WORK_FACTOR)
    .then(hash => {
      this.password = hash;
      return monNext();
    })
    .catch(err => next(err));
});

companySchema.post("findOneAndRemove", async function(company, next) {
  let Job = mongoose.model("Job");
  let p = company.jobs.map(val => Job.findByIdAndRemove(val));
  await Promise.all(p);
  return next();
});

companySchema.methods.comparePassword = function(companyPassword, next) {
  bcrypt.compare(companyPassword, this.password, (err, isMatch) => {
    if (err) {
      return next(err);
    }
    return next(null, isMatch);
  });
};

const Company = mongoose.model("Company", companySchema);
module.exports = Company;
