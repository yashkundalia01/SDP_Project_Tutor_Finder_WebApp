const express = require("express");
const router = express.Router();
const Student = require("../../../models/Student");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../../middleware/auth");

// @route   POST api/students
// @desc    Register student
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password, education_info, city, country, phone_no } =
    req.body;

  try {
    // See if user exists
    let student = await Student.findOne({ email });

    if (student) {
      res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    student = new Student({
      name,
      email,
      password,
      education_info,
      city,
      country,
      phone_no,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    student.password = await bcrypt.hash(password, salt);

    await student.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: student.id,
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

    // res.send('User registered')
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/students/edit
// @desc    Update student details
// @access  Private

router.post("/edit", auth, async (req, res) => {
  const { email, name, education_info, city, country, phone_no } = req.body;

  try {
    // See if user exists
    let student = await Student.findOne({ email });

    if (student == null) {
      res.status(400).json({ errors: [{ msg: "User not exists" }] });
    }

    student.name = name;
    student.education_info = education_info;
    student.city = city;
    student.country = country;
    student.phone_no = phone_no;

    await Student.findOneAndUpdate({ email: email }, student);

    res.send("Student Updated Successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.post("/post", async (req, res) => {
  const { title, fee, language, description, course, email } =
    req.body;

  try {
    // See if user exists
    let student = await Student.findOne({ email });

    if (student == null) {
      res.status(400).json({ errors: [{ msg: "User not exists" }] });
    }

    const newpost = {
      title: title,
      fee: fee,
      language: language,
      description: description,
      course: course,
    };

    // Add to post array
    student.post.unshift(newpost);

    student.save();
    res.send("Post added Successfully");
    console.log("data send");

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
module.exports = router;
