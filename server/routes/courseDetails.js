const courseDetails = require("../controllers/courseDetailsController");

var router = require("express").Router();

//create new module for courses
router.post("/create-module", courseDetails.createModule);

//retrive all modules data
router.get("/all-modules", courseDetails.allModules);

//retrive all moudle from specfic course
router.get("/course-modules", courseDetails.getModulesFromCourses);

//update module
router.put("/update-module", courseDetails.updateModule);

//delete module
router.delete("/delete-module", courseDetails.deleteModule);

//create sub module
router.post("/create-submodule", courseDetails.createSubModule);

//retrive all sub module data from module
router.get("/course-submodule", courseDetails.getSubModule);

//update sub module
router.put("/update-submodule", courseDetails.updateSubModule);

//delete sub module
router.delete("/delete-submodule", courseDetails.deleteSubModule);

//create course student reviews
router.post("/create-sreviews", courseDetails.createCourseStudentReviews);

//retrive reviews from courses
router.get("/get-sreviews", courseDetails.getCourseStudentReviews);

//updating course reviews
router.put("/update-sreviews", courseDetails.updateCourseStudentReviews);

//delete course reviews
router.delete("/delete-sreviews", courseDetails.deleteCourseStudentReviews);
module.exports = router;
