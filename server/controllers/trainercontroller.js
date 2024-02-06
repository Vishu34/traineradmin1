const Trainers = require("../models/trainers");
const Course = require("../models/courses");
const slugify = require("slugify");
const Categories = require("../models/categories");
const SubCategories = require("../models/subCategories");
const { default: mongoose } = require("mongoose");

// Retrieve all trainers from the database.
exports.popularTrainer = (req, res) => {
  Trainers.find()
    .then((data) => {
      res.status(201).json({
        response: "success",
        message: "successfully",
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        response: "failed",
        message: "some problem occured",
        err,
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.query.tnrId;

  Trainers.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({
          response: "failed",
          message: "Not found Tutorial with id " + id,
        });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        response: "failed",
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};

// Find a single Tutorial with an id
exports.featuredTrainer = (req, res) => {
  const { category, subcat } = req.body;

  // Course.find({ccategory:category})
  //   .then(data => {
  //     if (!data)
  //       res.status(404).send({ message: "Not found any course with id " + category });
  //     else res.send(data);
  //   })
  //   .catch(err => {
  //     res
  //       .status(500)
  //       .send({ message: "Error retrieving course with category=" + category });
  //   });

  Course.aggregate([
    {
      $lookup: {
        from: "trainers",
        localField: "ctrainer",
        foreignField: "_id",
        as: "trainer",
      },
    },
    { $match: {} },
    { $skip: 0 },
    { $limit: 100 },
  ]).then((data) => {
    res.send(data);
  });
};

//create trainer registration
exports.createTrainer = async (req, res) => {
  try {
    const {
      tname,
      temail,
      tmobile,
      tgender,
      tdob,
      taddress,
      tcity,
      tpincode,
      tpic,
      totp,
      tfcm,
      tabout,
      tstatus,
      tcountry,
    } = req.body;
    if (!temail) {
      return res.status(500).send({
        response: "failed",
        message: "Email is required",
      });
    }
    if (!tmobile) {
      return res.status(500).send({
        response: "failed",
        message: "Phone no is required",
      });
    }
    const data = await new Trainers({
      tname,
      temail,
      tmobile,
      tgender,
      tdob,
      taddress,
      tcity,
      tpincode,
      tpic,
      totp,
      tfcm,
      tabout,
      tstatus,
      tcountry,
    });

    // const category = await Categories.findOne({ _id: categories });
    // const subCategory = await SubCategories.findOne({ _id: subCategories });

    // const session = await mongoose.startSession();
    // session.startTransaction();

    // await data.save({ session });
    // category.trainers.push(data);
    // subCategory.trainers.push(data);
    // await category.save({ session });
    // await subCategory.save({ session });
    // await session.commitTransaction();

    await data.save();

    res.status(200).send({
      response: "success",
      message: "Trainer created succesfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal server error in registration",
      error,
    });
  }
};
