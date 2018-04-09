//._ID
const mongoose = require('mongoose');
const Company = require('./Company');
const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, min: 1, max: 55 },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    content: { type: String },
    salary: { type: Number, required: true },
    equity: { type: Number, required: true },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamp: true }
);

jobSchema.post('remove', function(job, next) {
  Company.findById(job.company).then(company => {
    //update returns a promise needs to be resolved
    company.update({ $pull: { jobs: { _id: job._id } } }).then(() => {
      console.log('sweet!');
      next();
    });
  });
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
