const courses = require("../controllers/courseController.js");

var router = require("express").Router();

// Retrieve popular courses
router.get("/popular-courses", courses.findAll);

// course detail
router.get("/course-detail", courses.findOne);

//create course by trainer
router.post("/course-trainers", courses.courseTrainers);

module.exports = router;
