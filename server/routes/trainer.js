const trainer = require("../controllers/trainercontroller");

var router = require("express").Router();

// popular trainers list
router.get("/popular", trainer.popularTrainer);

// trainer details
router.get("/detail", trainer.findOne);

//trainer list according to category and sub category
router.post("/featured", trainer.featuredTrainer);

//trainer creation post
router.post("/create-trainer", trainer.createTrainer);

module.exports = router;
