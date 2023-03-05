const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });
  console.log("registerPOST req is: ", req.body)
  console.log("user is: ", newUser, newUser.username)
  try {
    const user = await newUser.save();
    console.log("registerPOST createUser Success")
    res.status(201).json(user);
  } catch (err) {
    console.log("error auth.js register", err)
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    console.log("loginPOST res is: ", req.body, req.body.email)
    const user = await User.findOne({ email: req.body.email });
    console.log("loginPOST userFound: ", user)
    if (!user) {
      res.status(401).json("Wrong password or username!");
      console.log("loginPOST userNotFoundInDB")
      return;
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("Wrong password or username!");

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: "5d" }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    // res.status(500).json(err);
    console.log("error auth.js register: ", err);
  }
});

module.exports = router;
