const express = require("express");
const router = express.Router();
const Tutor = require("../../../models/Tutor");
const Student = require("../../../models/Student");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../../middleware/auth");

// @route   GET api/tutors
// @desc    Get all tutor details
// @access  Public
router.get("/", async (req, res) => {
  try {
    const tutors = await Tutor.find();
    res.send(tutors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/tutors
// @desc    Register tutor
// @access  Public
router.post("/", async (req, res) => {
  const { name, email, password, city, country, phone_no, photo_url } =
    req.body;

  try {
    // See if user exists
    let tutor = await Tutor.findOne({ email });

    if (tutor) {
      res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    tutor = new Tutor({
      name,
      email,
      password,
      city,
      country,
      phone_no,
      photo_url,
    });

    // Encrypt password
    const salt = await bcrypt.genSalt(10);

    tutor.password = await bcrypt.hash(password, salt);

    await tutor.save();

    // Return jsonwebtoken
    const payload = {
      user: {
        id: tutor.id,
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

// @route   POST api/tutors/edit
// @desc    Update tutor details
// @access  Private

router.post("/edit", auth, async (req, res) => {
  const { email, name, city, country, phone_no, photo_url } = req.body;

  try {
    // See if user exists
    let tutor = await Tutor.findOne({ email });

    if (tutor == null) {
      res.status(400).json({ errors: [{ msg: "User not exists" }] });
    }

    tutor.name = name;
    tutor.city = city;
    tutor.country = country;
    tutor.phone_no = phone_no;
    tutor.photo_url = photo_url;

    await Tutor.findOneAndUpdate({ email: email }, tutor);

    res.send("Tutor Updated Successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/tutors/experiences
// @desc    Add experience details
// @access  Private

router.post("/experiences", auth, async (req, res) => {
  const { email, title, company, from, to, description } = req.body;

  try {
    // See if user exists
    let tutor = await Tutor.findOne({ email });

    if (tutor == null) {
      res.status(400).json({ errors: [{ msg: "User not exists" }] });
    }

    const newExp = {
      title: title,
      company: company,
      from: from,
      to: to,
      description: description,
    };

    // Add to exp array
    tutor.experience.unshift(newExp);

    tutor.save();

    res.send("Experience added Successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/tutors/educations
// @desc    Add experience details
// @access  Private

router.post("/educations", auth, async (req, res) => {
  const { email, school, degree, from, to, fieldofstudy, description } =
    req.body;

  try {
    // See if user exists
    let tutor = await Tutor.findOne({ email });

    if (tutor == null) {
      res.status(400).json({ errors: [{ msg: "User not exists" }] });
    }

    const newEdu = {
      school: school,
      degree: degree,
      from: from,
      to: to,
      fieldofstudy: fieldofstudy,
      description: description,
    };

    // Add to exp array
    tutor.education.unshift(newEdu);

    tutor.save();

    res.send("Education added Successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/tutors/experiences/:exp_id
// @desc    Delete experience from tutor
// @access  Private
router.delete("/experiences/:exp_id", auth, async (req, res) => {
  // See if user exists
  let tutor = await Tutor.findById((id = req.user.id));

  if (tutor == null) {
    res.status(400).json({ errors: [{ msg: "User not exists" }] });
  }

  const removeIndex = tutor.experience
    .map((item) => item.id)
    .indexOf(req.params.exp_id);

  // Splice out of array
  tutor.experience.splice(removeIndex, 1);

  // Save
  tutor.save();
  res.send("DELETED Successfully");
});

// @route   DELETE api/tutors/educations/:edu_id
// @desc    Delete education from tutor
// @access  Private
router.delete("/educations/:edu_id", auth, async (req, res) => {
  // See if user exists
  let tutor = await Tutor.findById((id = req.user.id));

  if (tutor == null) {
    res.status(400).json({ errors: [{ msg: "User not exists" }] });
  }

  const removeIndex = tutor.education
    .map((item) => item.id)
    .indexOf(req.params.edu_id);

  // Splice out of array
  tutor.education.splice(removeIndex, 1);

  // Save
  tutor.save();
  res.send("DELETED SUCCESSFULLY");
});

// @route   POST api/tutors/courses
// @desc    Add course details
// @access  Private

router.post("/courses", auth, async (req, res) => {
  const { email, title, fee, description, language, demo_video_link } =
    req.body;

  try {
    // See if user exists
    let tutor = await Tutor.findOne({ email });

    if (tutor == null) {
      res.status(400).json({ errors: [{ msg: "User not exists" }] });
    }

    const newCourse = {
      title: title,
      fee: fee,
      language: language,
      description: description,
      demo_video_link: demo_video_link,
    };

    // Add to exp array
    tutor.course.unshift(newCourse);

    tutor.save();

    res.send("Course added Successfully");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   DELETE api/tutors/courses/:course_id
// @desc    Delete experience from tutor
// @access  Private
router.delete("/courses/:course_id", auth, async (req, res) => {
  // See if user exists
  let tutor = await Tutor.findById((id = req.user.id));

  if (tutor == null) {
    res.status(400).json({ errors: [{ msg: "User not exists" }] });
  }

  const removeIndex = tutor.course
    .map((item) => item.id)
    .indexOf(req.params.course_id);

  // Splice out of array
  tutor.course.splice(removeIndex, 1);

  // Save
  tutor.save();
  res.send("DELETED Successfully");
});

// @route   POST api/tutors/availability_status
// @desc    Update availability_status of tutor
// @access  Private
router.post("/availability_status", auth, async (req, res) => {
  // See if user exists
  let tutor = await Tutor.findById((id = req.user.id));

  if (tutor == null) {
    res.status(400).json({ errors: [{ msg: "User not exists" }] });
  }

  tutor.availability_status = req.body.availability_status;

  // Save
  tutor.save();
  res.send("UPDATED Successfully");
});

// @route   POST api/tutors/rate
// @desc    Add rating
// @access  Private

router.post("/rate", async (req, res) => {
  const { email_id, name, rating, feedback, tid } = req.body;

  try {
    // See if user exists
    let tutor = await Tutor.findById(tid);

    if (tutor == null) {
      return res.status(400).json({ errors: [{ msg: "Tutor not exists" }] });
    }

    let student = await Student.findOne({ email: email_id });

    if (student == null) {
      return res.status(400).json({
        errors: [{ msg: "You don't have an account in tutor finder." }],
      });
    }

    const newRating = {
      name: name,
      email: email_id,
      feedback: feedback,
      rating: rating,
    };

    let found = false;
    tutor.allRatings.forEach((t) => {
      if (t.email == email_id) {
        found = true;
      }
    });
    if (found == true) {
      return res
        .status(400)
        .send({ errors: [{ msg: "Feedback already taken." }] });
    } else {
      tutor.sum_rating = tutor.sum_rating + rating;
      tutor.noOfRating = tutor.noOfRating + 1;
      tutor.rating = tutor.sum_rating / tutor.noOfRating;
      tutor.allRatings.unshift(newRating);
      tutor.save();
      res.send("Feedback received.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route   POST api/tutors/exists
// @desc    To see user is exists or not using email id
// @access  Public

router.post("/exists", async (req, res) => {
  const { email } = req.body;

  try {
    // See if user exists
    let tutor = await Tutor.findOne({ email });

    if (tutor == null) {
      return res.status(400).json({
        errors: [{ msg: "You don't have an account in tutor finder." }],
      });
    } else {
      res.send("User exists.");
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/tutors
// @desc Delete user
// @access private

router.delete("/", auth, async (req, res) => {
  try {
    //Remove user
    await Tutor.findByIdAndRemove(req.user.id);

    res.json({ msg: "Account deleted" });
  } catch (error) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
