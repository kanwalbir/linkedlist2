//
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, min: 1, max: 55 },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Company'
    },
    content: { type: String },
    salary: { type: Number, required: true }, //number also covers financial $
    equity: { type: Number, required: true }, //number by default takes care of both floats and integers
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  { timestamp: true } //creates createdAt and updatedAt
);

// jobSchemas;

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
