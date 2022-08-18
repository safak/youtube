const mongoose = require("mongoose");

const IssueSchema = new mongoose.Schema({
  userId: { type: String, required: true }, 
  title: {
    type: String,
    required: true,
  },
  Issuetype: {
    type: String,
    required: true,
  },
  projects: [
      {
        projectId: {
          type: String,
        },
        issues: {
          type: Number,
          default: 1,
        },
      },
    ],
  Issue: {
    type: String
  },
  IssueStatus: {
    type: String,
    default: "pending"
  },
  IssuePriority: {
    type: String,
    required: true,
  },
  listPosition: {
    type: Number,
    required: true,
  },
   description: {
    type: [String],
  },
  descriptionText: {
    type: String,
    required: true,
  },
  createdAt: {
    type: 'Date',
  },
  updatedAt: {
    type: 'Date',
  },
  reporterId: {
    type: Number,
    default: false,
  },
     
});


module.exports = mongoose.model("Issue", IssueSchema);
