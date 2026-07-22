const express = require("express");

const router = express.Router();

const upload = require("../middleware/upload.middleware")

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} = require("../controllers/product.controller");

const { protect, authorize } = require("../middleware/auth.middleware");

router
  .route("/")
  .get(getProducts)
  .post(createProduct);

router
  .route("/:id")
  .get(getProductById)
  .put(updateProduct)
  .delete(deleteProduct);

router.put("/:id/image", upload.single("image"), uploadProductImage)  

module.exports = router;
