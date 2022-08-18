const Issue = require("../models/Issue");
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("./verifyToken");

const router = require("express").Router();

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newIssue = new Issue(req.body);

  try {
    const savedIssue = await newIssue.save();
    res.status(200).json(savedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedIssue = await Issue.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedIssue);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Issue.findByIdAndDelete(req.params.id);
    res.status(200).json("Issue has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER Issues
router.get("/find/:userId", verifyTokenAndAuthorization, async (req, res) => {
  try {
    const issues = await Issue.find({ userId: req.params.userId });
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json(err);
  }
});

// //GET ALL

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const issues = await Issue.find();
    res.status(200).json(issues);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
