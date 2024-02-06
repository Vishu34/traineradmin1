const trending = require("../controllers/trendingCourseController");

var router = require("express").Router();

//create tranding course
router.post("/create-trend", trending.createTrendingCourse);

//add trending courses
router.post("/add-courses/:trendId", trending.addTrendingCourse);

//retrive trending course
router.get("/trending-course", trending.allTrendingCourse);

// remove courses form trending course

//delete trending course
router.delete("/del-trend-course/:id", trending.deleteTrendingCourse);
module.exports = router;
