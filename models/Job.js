const mongoose = require("mongoose");
const Company = require("./Company");
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, min: 1, max: 55 },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    content: { type: String },
    salary: { type: Number, required: true },
    equity: { type: Number, required: true },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamp: true }
);

jobSchema.post("remove", function(job, next) {
  Company.findById(job.company).then(company => {
    company.jobs.remove(job._id);
    company.save().then(() => next());
  });
});

const Job = mongoose.model("Job", jobSchema);
module.exports = Job;
