const categories = require("../controllers/categoriescontroller");

var router = require("express").Router();

// Retrieve all parent categories
router.get("/list", categories.findAll);

//create categories
router.post("/create-cat", categories.createCategories);

//update categories
router.put("/update-cat", categories.updateCategories);

//create subCategory
router.post("/sub-cat", categories.createSubCategories);

//update subCategories
router.put("/update-subcat", categories.updateSubCategories);

// Retrieve all sub categories
router.get("/sub-cat", categories.findSubCat);

// Retrieve All Popular categories
router.get("/popular-cat", categories.popularCategory);

//sub categories wise course
router.get("/subcat-course", categories.subCategoryCourse);
module.exports = router;
