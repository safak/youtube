const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    // id: {
    //   type: Number,
    //   required: true,
    // },
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    categories: {
      type: Array
    },
    subcategory: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: false,
    }, 
    updatedAt: {
      type: Date,
      required: false,
    },
    // IssueId: {
    //   type: Number,
    //   required: true,
    // },
  },
  { timestamps: true }
);

// export default mongoose.model("Project", ProjectSchema);

module.exports = mongoose.model("Project", ProjectSchema);
