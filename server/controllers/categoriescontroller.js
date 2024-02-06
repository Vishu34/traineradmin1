const { default: mongoose } = require("mongoose");
const Categories = require("../models/categories");
const SubCategories = require("../models/subCategories");
const Courses = require("../models/courses");

// Retrieve all categories from the database.
exports.findAll = (req, res) => {
  Categories.find({ cstatus: "1" })
    .select("-courses -trainers -category -createdAt -updatedAt -subCategory")
    .then((data) => {
      res.status(201).json({
        type: "success",
        message: "successfully",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving categories.",
      });
    });
};

//Retrieve all Populer category from database
exports.popularCategory = (req, res) => {
  Categories.find({})
    .select("-courses  -category -createdAt -updatedAt -subCategory")
    .then((data) => {
      res.status(200).json({
        response: "success",
        message: "successfully",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while retrieving popular categories.",
      });
    });
};

// Retrieve all sub categories from the categories.
exports.findSubCat = async (req, res) => {
  try {
    const subCat = req.query.catg;

    const data1 = await Categories.findById(subCat).populate({
      path: "subCategory",
      select: "-courses  -category -createdAt -updatedAt",
    });
    const data = data1.subCategory;
    res.status(200).json({
      response: "success",
      message: "successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving sub categories.",
    });
  }
};

//create subcategory
exports.createSubCategories = async (req, res) => {
  try {
    const { title, imageUrl, category, status } = req.body;
    if (!title || !imageUrl || !category) {
      return res.status(401).send({
        response: "failed",
        message: "All fields are required",
      });
    }
    const data = await new SubCategories({
      title,
      imageUrl,
      category,
      sequence,
      status,
    });
    const categories = await Categories.findById(category);
    const session = await mongoose.startSession();
    session.startTransaction();
    await data.save({ session });
    categories.subCategory.push(data);
    await categories.save({ session });
    await session.commitTransaction();
    res.status(200).send({
      response: "success",
      message: "Sub Categories created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal Server Error",
      error,
    });
  }
};

// update sub categories
exports.updateSubCategories = async (req, res) => {
  try {
    const id = req.query.subcatId;
    const { title, imageUrl, sequence, status } = req.body;
    const data = await SubCategories.findByIdAndUpdate(id, {
      title,
      imageUrl,
      sequence,
      status,
    });
    await data.save();
    res.status(200).send({
      response: "success",
      message: "sub categories updeted successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal server error in updating sub categories",
      error,
    });
  }
};

//create categories
exports.createCategories = async (req, res) => {
  try {
    const { title, imageUrl, sequence, status } = req.body;
    if (!title || !imageUrl) {
      return res.status(400).send({
        response: "failed",
        message: "All fields are required",
      });
    }
    const data = await new Categories({ title, imageUrl, sequence, status });
    await data.save();
    res.status(200).send({
      response: "success",
      message: "categories created successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error in create categories",
      error,
    });
  }
};

//update categories
exports.updateCategories = async (req, res) => {
  try {
    const id = req.query.catId;
    const { title, imageUrl, status, sequence } = req.body;
    const data = await new Categories.findByIdAndUpdate(id, {
      title,
      imageUrl,
      status,
      sequence,
    });
    await data.save();
    res.status(200).send({
      response: "success",
      message: "categories updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "internal server error in create categories",
      error,
    });
  }
};

//sub categories wise course and trainer controller
exports.subCategoryCourse = async (req, res) => {
  try {
    const id = req.query.subcatId;
    const data = await SubCategories.findById(id).populate({
      path: "courses",
      populate: { path: "ctrainer" },
      select: "",
    });
    if (!data) {
      res.status(500).send({
        response: "failed",
        message: "Sub category does not found",
      });
    }
    res.status(200).send({
      response: "success",
      message: "Data find Succesfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "success",
      message: "Internal server error in getting courses",
      error,
    });
  }
};
