const bcrypt = require("bcrypt");
const Students = require("../models/student");
const AdvertiseBanner = require("../models/advertisingBanner");
const {
  PHONE_NOT_FOUND_ERR,

  PHONE_ALREADY_EXISTS_ERR,
  USER_NOT_FOUND_ERR,
  INCORRECT_OTP_ERR,
  ACCESS_DENIED_ERR,
} = require("../errors");
const { createJwtToken, jwt } = require("../utils/token.util");
const { generateOTP, fast2sms } = require("../utils/otp.util");
const { comparePassword, hashPassword } = require("../helper/comparePassword");
const Student = require("../models/student");

// Retrieve all trainers from the database.
exports.findAll = (req, res) => {
  Students.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving students.",
      });
    });
};

// send OTP
exports.sendOtp = async (req, res, next) => {
  const studentExist = await Students.findOne({
    $or: [{ semail: req.body.semail }, { smobile: req.body.smobile }],
  });
  if (studentExist) {
    // generate otp
    const otp = generateOTP(6);

    // save otp to user collection
    studentExist.phoneOtp = otp;
    studentExist.status = 0;
    await studentExist.save();

    // send otp to phone number
    await fast2sms({
      message: `Your OTP is ${otp}`,
      contactNumber: studentExist.smobile,
    });
    res.status(200).json({
      response: "success",
      message: "OTP sent successfully",
      data: {
        mobileNO: req.body.smobile,
        userId: studentExist.id,
        userotp: otp,
      },
    });
  } else {
    res.status(201).json({
      response: "failure",
      message: "Mobile No does not exists",
      data: {},
    });
  }
};

// verify OTP
exports.verifyOtp = async (req, res, next) => {
  try {
    const { otp, studentId } = req.body;
    const student = await Students.findById(studentId);

    if (!student) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    }

    if (student.phoneOtp !== otp) {
      next({ status: 400, message: INCORRECT_OTP_ERR });
      return;
    }
    const token = createJwtToken({ userId: student._id });
    student.phoneOtp = "";
    await student.save();

    res.status(201).json({
      response: "success",
      message: "OTP verified successfully",
      data: {
        token,
        userId: student._id,
      },
    });
  } catch (error) {
    next(error);
  }

  // const studentExist = await Students.findOne({ "$or": [ {semail: req.body.semail }, {smobile: req.body.smobile } ] });

  // if (studentExist)
  // {
  //      return res
  //   .status(422)
  //   .json({ error: "Email or Phone number already exists" });
  // }else{
  //   return res
  //   .status(402)
  //   .json({ error: "student does not exists" });
  // }
};

// Update Password
exports.updatePassword = async (req, res, next) => {
  try {
    const { spassword, id } = req.body;
    const student = await Students.findById(id);

    if (spassword.length < 6) {
      res.status(400);
      throw new Error("Password must be up to 6 characters.");
    }

    if (!student) {
      next({ status: 400, message: USER_NOT_FOUND_ERR });
      return;
    } else {
      // const salt = await bcrypt.genSalt(10);
      // const hashPassword = await bcrypt.hash(req.body.spassword, salt);
      const password = await hashPassword(req.body.spassword);

      Students.findByIdAndUpdate(
        { _id: id },
        { $set: { spassword: password } },
        { useFindAndModify: false }
      )
        .then((data) => {
          if (!data) {
            res.status(200).json({
              response: "failed",
              message:
                "Cannot update password with id=${id}. Maybe student was not found!",
              data: {},
            });
          } else {
            res.status(200).json({
              response: "success",
              message: "password updated successfully.",
              data: {
                userId: student._id,
                token: createJwtToken({ userId: student._id }),
              },
            });
          }
        })
        .catch((err) => {
          res.status(200).json({
            response: "failed",
            message: "Some Problem Occured",
            data: {},
          });
        });
    }
  } catch (error) {
    next(error);
  }
};

// check student login with email and password
exports.loginEmail = async (req, res, next) => {
  try {
    let { semail, spassword } = req.body;
    const student = await Students.findOne({ semail });

    if (student && (await comparePassword(spassword, student.spassword))) {
      res.status(200).json({
        response: "success",
        message: "Login successful",
        data: {
          userId: student._id,
          token: createJwtToken({ userId: student._id }),
        },
      });
    } else {
      res.status(400).json({
        response: "failed",
        message: "Invalid credentials",
        data: {},
      });
    }
  } catch (error) {
    next(error);
  }
};

// check student login with mobile and OTP
exports.loginMobile = async (req, res, next) => {
  try {
    let { smobile } = req.body;
    const student = await Students.findOne({ smobile });

    if (student) {
      // generate otp
      const otp = generateOTP(6);

      // save otp to user collection
      student.phoneOtp = otp;
      student.status = 1;
      await student.save();

      res.status(200).json({
        response: "success",
        message: "user Exists",
        data: {
          userId: student._id,
          token: createJwtToken({ userId: student._id }),
        },
      });
    } else {
      res.status(400).json({
        response: "failed",
        message: "Invalid credentials",
        data: {},
      });
    }
  } catch (error) {
    next(error);
  }
};

// Create and Save a new student
exports.create = async (req, res, next) => {
  try {
    let { smobile, sname, semail } = req.body;

    const studentExist = await Students.findOne({
      $or: [{ semail: req.body.semail }, { smobile: req.body.smobile }],
    });

    if (studentExist) {
      next({ status: 400, message: PHONE_ALREADY_EXISTS_ERR });
      return;
    }

    // create new user
    const createStudent = new Students({
      sname,
      semail,
      smobile,
    });

    // save user

    const student = await createStudent.save();

    res.status(200).json({
      response: "success",
      message: "Account created Successfully",
      data: {
        userId: student._id,
      },
    });

    // generate otp
    const otp = generateOTP(6);

    // save otp to user collection
    student.phoneOtp = otp;
    student.status = 0;
    await student.save();

    // send otp to phone number
    await fast2sms(
      {
        message: `Your OTP is ${otp}`,
        contactNumber: student.smobile,
      },
      next
    );
  } catch (error) {
    next(error);
  }
};

// Find a single student with an id
exports.findOne = (req, res) => {
  const id = req.query.studentId;

  Students.findById(id)
    .then((data) => {
      if (!data) {
        res.status(200).json({
          response: "success",
          message: "Not found student with id " + id,
          data,
        });
      } else {
        res.status(201).json({
          response: "success",
          message: "successfully",
          data,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        response: "failed",
        message: "Error retrieving student with id=" + id,
      });
    });
};

// Delete a student with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Students.deleteOne({ _id: id })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          response: "failed",
          message: `Cannot delete student with id=${id}. Maybe student was not found!`,
        });
      } else {
        res.send({
          response: "success",
          message: "student was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        response: "failed",
        message: "Could not delete student with id=" + id,
      });
    });
};

// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      response: "failed",
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Students.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          response: "failed",
          message: `Cannot update student with id=${id}. Maybe student was not found!`,
        });
      } else
        res.send({
          response: "success",
          message: "student was updated successfully.",
        });
    })
    .catch((err) => {
      res.status(500).send({
        response: "failed",
        message: "Error updating student with id=" + id,
      });
    });
};

//get All advertising banner

exports.allAdvertisingBanner = async (req, res) => {
  AdvertiseBanner.find()
    .then((data) => {
      res.status(200).json({
        response: "success",
        message: "successfully",
        data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        response: "failed",
        message:
          err.message ||
          "Some error occurred while retrieving advertising banners.",
      });
    });
};

//update student profile controller
exports.updateStudentProfile = async (req, res) => {
  try {
    const id = req.query.sId;
    const {
      sname,
      sbackgroundUrl,
      sprofilepicUrl,
      sgender,
      sdob,
      scity,
      saddress,
      levelOfeducation,
      passOutYear,
      sstate,
      scountry,
      spincode,
    } = req.body;
    const data = await Student.findByIdAndUpdate(
      id,
      {
        sname,
        sbackgroundUrl,
        sprofilepicUrl,
        sgender,
        sdob,
        scity,
        saddress,
        levelOfeducation,
        passOutYear,
        sstate,
        scountry,
        spincode,
      },
      { new: true }
    );
    await data.save();
    res.status(200).send({
      response: "success",
      message: "profile updated successfully",
      data,
    });
  } catch (error) {
    res.status(500).send({
      response: "failed",
      message: "Internal server error in updating profile",
      error,
    });
  }
};
