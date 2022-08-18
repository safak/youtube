const Project = require("../models/Project");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProject = new Project(req.body);

  try {
    const savedProject = await newProject.save();
    // console.log(savedProduct);
    res.status(200).json(savedProject);
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json("Project has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PROJECT
router.get("/find/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL PROJECT
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let projects;

    if (qNew) {
      projects = await Project.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      projects = await Project.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      projects = await Project.find();
    }

    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
