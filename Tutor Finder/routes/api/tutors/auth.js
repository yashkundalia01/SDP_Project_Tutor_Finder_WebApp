const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Tutor = require("../../../models/Tutor");

// @route  GET api/tutors/auth
// @desc   Get Current User
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await Tutor.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* @route   POST api/tutors/auth
 * @desc    Authenticate user & get token  (Login)
 * @access  Public
 */
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await Tutor.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

/* @route   POST api/tutors/auth/changepassword
 * @desc    Update user's password
 * @access  Private
 */
router.post("/changepassword", auth, async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const userId = req.user.id;

  try {
    let user = await Tutor.findById(userId);

    //Authenticating user
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Password!!!" }] });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    let hash_password = await bcrypt.hash(newPassword, salt);

    //updating database
    user = await Tutor.updateOne(
      { email: user.email },
      { password: hash_password }
    );
    res.send("Password Updated");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

/* @route   POST /api/tutors/auth/setpassword
 * @desc    Set user's new password
 * @access  Private
 */
router.post("/setpassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await Tutor.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "User not exists" }] });
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    let hash_password = await bcrypt.hash(password, salt);

    //updating database
    user = await Tutor.updateOne(
      { email: user.email },
      { password: hash_password }
    );
    res.send("Password Updated");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
