const { default: mongoose } = require("mongoose");
const CourseModule = require("../models/courseModules");
const Courses = require("../models/courses");
const CourseSubModule = require("../models/courseSubModule");
const CourseReview = require("../models/courseReview");
const Student = require("../models/student");

//create new module for courses controller
exports.createModule = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      fileUrl,
      videoUrl,
      trainer,
      course,
      status,
      sequence,
    } = req.body;
    const data = await new CourseModule({
      title,
      description,
      duration,
      fileUrl,
      videoUrl,
      trainer,
      status,
      course,
      sequence,
    });
    const courses = await Courses.findById(course);
    const session = await mongoose.startSession();
    session.startTransaction();
    await data.save({ session });
    courses.cmodules.push(data);
    await courses.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: "success",
      message: "module created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error in creation module",
      error,
    });
  }
};

//update module controller
exports.updateModule = async (req, res) => {
  try {
    const id = req.query.moduleId;
    const { title, description, duration, fileUrl, videoUrl, status } =
      req.body;
    const data = await CourseModule.findByIdAndUpdate(id, {
      title,
      description,
      duration,
      fileUrl,
      videoUrl,
      status,
    });
    await data.save();
    res.status(200).send({
      response: "success",
      message: "module updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error in updation module",
      error,
    });
  }
};

//retrive all modules controllers
exports.allModules = async (req, res) => {
  try {
    const data = await CourseModule.find({});
    res.status(200).send({
      response: "success",
      message: "data retrive successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "error in retriving modules",
      error,
    });
  }
};

//retrive all module from specific course controller
exports.getModulesFromCourses = async (req, res) => {
  try {
    const id = req.query.courseId;
    const data1 = await Courses.findById(id).populate({
      path: "cmodules",
      select: "-cslug -ctitle -cintro",
    });
    const data = data1.cmodules;
    res.status(200).send({
      response: "success",
      message: "data retrive successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "error in retriving course modules",
      error,
    });
  }
};

//delete module controller
exports.deleteModule = async (req, res) => {
  try {
    const id = req.query.moduleId;

    const module = await CourseModule.findById(id).populate("course");
    const cid = module.course;
    const course = await Courses.findById(cid._id);
    const session = await mongoose.startSession();
    session.startTransaction();
    course.cmodules.pull(module);
    await course.save({ session });
    await session.commitTransaction();
    const data = await CourseModule.findByIdAndDelete(id);
    res.status(200).send({
      response: "success",
      message: "data deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "error in retriving course modules",
      error,
    });
  }
};

//create sub module controller
exports.createSubModule = async (req, res) => {
  try {
    const {
      title,
      description,
      duration,
      fileUrl,
      videoUrl,
      sequence,
      trainer,
      course,
      module,
      status,
    } = req.body;

    const data = await new CourseSubModule({
      title,
      description,
      duration,
      fileUrl,
      videoUrl,
      sequence,
      trainer,
      course,
      module,
      status,
    });

    const modul = await CourseModule.findById(module);

    const session = await mongoose.startSession();
    session.startTransaction();

    await data.save({ session });
    modul.subModule.push(data);
    await modul.save({ session });
    console.log("first");
    await session.commitTransaction();
    res.status(200).send({
      response: "success",
      message: "sub module created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal server error in create sub Module",
      error,
    });
  }
};

//retrive all sub module from specific module
exports.getSubModule = async (req, res) => {
  try {
    const id = req.query.moduleId;
    const data1 = await CourseModule.findById(id).populate("subModule");
    const data = data1.subModule;
    res.status(200).send({
      response: "success",
      message: "get sub module data successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error in geting sub module",
      error,
    });
  }
};

//update sub module controller
exports.updateSubModule = async (req, res) => {
  try {
    const id = req.query.submoduleId;
    const {
      title,
      description,
      duration,
      fileUrl,
      videoUrl,
      sequence,
      status,
    } = req.body;
    const data = await CourseSubModule.findByIdAndUpdate(id, {
      title,
      description,
      duration,
      fileUrl,
      videoUrl,
      sequence,
      status,
    });
    res.status(200).send({
      response: "success",
      message: "sub module updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error",
      error,
    });
  }
};

//delete submodule controller
exports.deleteSubModule = async (req, res) => {
  try {
    const id = req.query.submoduleId;
    const submod = await CourseSubModule.findById(id).populate("module");
    const module = await CourseModule.findById(submod.module._id);
    const session = await mongoose.startSession();
    session.startTransaction();
    module.subModule.pull(submod);
    await module.save({ session });
    await session.commitTransaction();
    const data = await CourseSubModule.findById(id);
    res.status(200).send({
      response: "success",
      message: "sub module deleted successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error in deleting method",
      error,
    });
  }
};

//create course student reviews controller
exports.createCourseStudentReviews = async (req, res) => {
  try {
    const { reviewmsg, rating, course, student, status } = req.body;
    const data = await new CourseReview({
      reviewmsg,
      rating,
      course,
      student,
      status,
    });
    const std = await Student.findById(student);
    const cours = await Courses.findById(course);
    const session = await mongoose.startSession();
    session.startTransaction();
    await data.save({ session });
    std.reviewspost.push(data);
    cours.creviews.push(data);
    await std.save({ session });
    await cours.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: "success",
      message: "reviews created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error while posting reviews",
      error,
    });
  }
};

//retrive students reviews from course controller
exports.getCourseStudentReviews = async (req, res) => {
  try {
    const id = req.query.courseId;
    const data1 = await Courses.findById(id).populate({
      path: "creviews",
      populate: { path: "student", select: "" },
      select: "",
    });
    const data = data1.creviews;
    res.status(200).send({
      response: "success",
      message: "retrive data successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error while retriving",
      error,
    });
  }
};

//update student reviews controller
exports.updateCourseStudentReviews = async (req, res) => {
  try {
    const id = req.query.reviewId;
    const { reviewmsg, rating, status } = req.body;
    const data = await CourseReview.findByIdAndUpdate(id, {
      reviewmsg,
      rating,
      status,
    });
    await data.save();
    res.status(200).send({
      response: "success",
      message: "reviews updating successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error while updating reviews",
      error,
    });
  }
};

//delete course reviews controller
exports.deleteCourseStudentReviews = async (req, res) => {
  try {
    const id = req.query.reviewId;
    const rev = await CourseReview.findById(id)
      .populate("course")
      .populate("student");
    const std = await Student.findById(rev.student._id);
    const cours = await Courses.findById(rev.course._id);
    const session = await mongoose.startSession();
    session.startTransaction();
    std.reviewspost.pull(rev);
    cours.creviews.pull(rev);
    await std.save({ session });
    await cours.save({ session });
    await session.commitTransaction();
    const data = await CourseReview.findByIdAndDelete(id);
    res.status(200).send({
      response: "success",
      message: "reviews created successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      response: "failed",
      message: "internal server error while posting reviews",
      error,
    });
  }
};
