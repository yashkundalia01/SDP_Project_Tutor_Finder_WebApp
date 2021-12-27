const express = require("express");
const router = express.Router();
const auth = require("../../../middleware/auth");
const config = require("config");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../../../models/Student");

// @route  GET api/students/auth
// @desc   Get Current User
// @access Private
router.get("/", auth, async (req, res) => {
  try {
    const user = await Student.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

/* @route   POST api/students/auth
 * @desc    Authenticate user & get token  (Login)
 * @access  Public
 */
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await Student.findOne({ email });

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

module.exports = router;
