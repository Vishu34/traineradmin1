const { default: mongoose } = require("mongoose");
const Courses = require("../models/courses");
const TrendingCourse = require("../models/trendingCourse");

//create ternding course
exports.createTrendingCourse = async (req, res) => {
  try {
    const { title, image, sequence } = req.body;
    const data = await new TrendingCourse({ title, image, sequence });
    await data.save();
    res.status(200).send({
      response: "success",
      message: "Data posted Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal Server Error in create trending course",
      error,
    });
  }
};

//add trending courses controller
exports.addTrendingCourse = async (req, res) => {
  try {
    const id = req.params.trendId;
    const { courses } = req.body;

    const data = await TrendingCourse.findById(id);

    const cours = await Courses.findById(courses);

    const session = await mongoose.startSession();
    session.startTransaction();
    data.courses.push(cours);
    await data.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: "success",
      message: "courses added Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal Server Error in adding trending course",
      error,
    });
  }
};

//retrive tranding course
exports.allTrendingCourse = async (req, res) => {
  try {
    const data = await TrendingCourse.find({}).populate({
      path: "courses",
      select: "",
    });
    res.status(200).send({
      response: "success",
      message: "Data retrive Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal Server Error in retrive trending course",
      error,
    });
  }
};

//delete rending course
exports.deleteTrendingCourse = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await TrendingCourse.findByIdAndDelete(id);
    res.status(200).send({
      response: "success",
      message: "Data deleted Successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal Server Error in retrive trending course",
      error,
    });
  }
};
