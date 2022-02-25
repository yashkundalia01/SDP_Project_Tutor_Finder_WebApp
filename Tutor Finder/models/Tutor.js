const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone_no: {
    type: String,
    required: true,
  },
  photo_url: {
    type: String,
    required: true,
  },
  availability_status: {
    type: String,
    default: "NO",
  },
  rating: {
    type: Number,
    default: 0,
  },
  noOfRating: {
    type: Number,
    default: 0,
  },
  sum_rating: {
    type: Number,
    default: 0,
  },
  allRatings: [
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      feedback: {
        type: String,
      },
      rating: {
        type: Number,
        required: true,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  course: [
    {
      title: {
        type: String,
        required: true,
      },
      fee: {
        type: String,
        required: true,
      },
      language: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
      demo_video_link: {
        type: String,
        required: true,
      },
    },
  ],
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      description: {
        type: String,
      },
    },
  ],
  education: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      description: {
        type: String,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Tutor = mongoose.model("tutor", TutorSchema);
