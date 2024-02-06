const student = require("../controllers/StudentController");

var router = require("express").Router();

// student signup
router.post("/signup/", student.create);

// send OTP
router.post("/send-otp", student.sendOtp);

// verify OTP
router.post("/verify-otp", student.verifyOtp);

// update password
router.post("/update-password", student.updatePassword);

// login with email and password
router.post("/student-login", student.loginEmail);

// login with email and password
router.post("/login-mobile", student.loginMobile);

// Retrieve all student
router.get("/list", student.findAll);

// Retrieve a single student with id
router.get("/details", student.findOne);

// Update a trainer with id
router.put("/update", student.update);

// Delete a trainer with id
router.delete("/delete/:id", student.delete);

// Retrive all home slider
router.get("/home-sliders", student.allAdvertisingBanner);

//update student profile
router.put("/update-sprofile", student.updateStudentProfile);

module.exports = router;
