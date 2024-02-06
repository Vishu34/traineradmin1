const { default: mongoose } = require("mongoose");
const Courses = require("../models/courses.js");
const Trainer = require("../models/trainers");
const slugify = require("slugify");
const Categories = require("../models/categories");
const SubCategories = require("../models/subCategories");

// Retrieve all categories from the database.
const findAll = async (req, res) => {
  try {
    const data = await Courses.find()
      .populate({ path: "ctrainer" })
      .populate({ path: "cmodules" })
      .populate({ path: "ccategory" });

    res.status(201).json({
      response: "success",
      message: "successfully",
      data,
    });
  } catch (err) {
    res.status(500).send({
      response: "failed",
      message:
        err.message || "Some error occurred while retrieving categories.",
    });
  }
};

// Find a single student with an id
const findOne = async (req, res) => {
  try {
    const id = req.query.courseId;
    const data = await Courses.findById(id)
      .populate({
        path: "cmodules",
        populate: { path: "subModule", select: "" },
        select: "",
      })
      .populate({ path: "ctrainer", select: "_id tname tintro" })
      .populate({ path: "ccategory", select: "_id title" })
      .populate({ path: "creviews", select: "" });

    if (!data) {
      res.status(404).json({
        response: "failed",
        message: "some problem occured",
        data,
      });
    } else {
      res.status(200).json({
        response: "success",
        message: "data fetched successfully",
        data,
      });
    }
  } catch (err) {
    res.status(500).send({ message: "Error retrieving student with id=" + id });
  }
};

// create course by trainer
const courseTrainers = async (req, res) => {
  try {
    const {
      ctitle,
      ccategory,
      cstatus,
      cduration,
      cdescription,
      cthumbnail,
      cdemovideo,
      ccoverimage,
      ckeywords,
      cfees,
      cofferfees,
      ctrainer,
      csubcategory,
    } = req.body;
    if (!ctitle) {
      return res.status(500).send({
        response: "failed",
        message: "title is required",
      });
    }
    const data = await new Courses({
      cslug: slugify(ctitle),
      ctitle,
      ccategory,
      cstatus,
      cduration,
      cdescription,
      cthumbnail,
      cdemovideo,
      ccoverimage,
      ckeywords,
      cfees,
      cofferfees,
      ctrainer,
      csubcategory,
    });
    // data.cdemovideo.data = fs.readFileSync(cdemovideo.path);
    // data.ccoverimage.data = fs.readFileSync(ccoverimage.path);
    // data.cthumbnail.data = fs.readFileSync(cthumbnail.path);
    // data.cdemovideo.contentType = cdemovideo.type;
    // data.ccoverimage.contentType = ccoverimage.type;
    // data.cthumbnail.contentType = cthumbnail.type;
    const trainers = await Trainer.findOne({ _id: ctrainer });
    const category = await Categories.findOne({ _id: ccategory });
    const subCategory = await SubCategories.findById(csubcategory);
    const session = await mongoose.startSession();
    session.startTransaction();
    await data.save({ session });
    trainers.courses.push(data);
    category.courses.push(data);
    subCategory.courses.push(data);
    await trainers.save({ session });
    await category.save({ session });
    await subCategory.save({ session });
    await session.commitTransaction();
    await data.save();
    res.status(200).json({
      response: "success",
      message: "data posted successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Error in posting the data of course",
      error,
    });
  }
};

module.exports = { findOne, findAll, courseTrainers };
