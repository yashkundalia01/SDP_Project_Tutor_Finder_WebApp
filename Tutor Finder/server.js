const express = require("express");
const connectDB = require("./config/db");
const app = express();

//Connect DB
connectDB();

const PORT = process.env.PORT || 5000;

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes For Student
app.use("/api/students", require("./routes/api/students/student"));
app.use("/api/students/auth", require("./routes/api/students/auth"));

// Define Routes For Tutor
app.use("/api/tutors", require("./routes/api/tutors/tutor"));
app.use("/api/tutors/auth", require("./routes/api/tutors/auth"));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
