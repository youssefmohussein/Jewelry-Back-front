// cartRoutes.js
const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/", cartController.getCart); // still for API (expects userId in query)

// New route to render EJS cart page
router.get("/view", cartController.renderCartPage);

router.post("/", cartController.addToCart);
router.put("/:id", cartController.updateCartItem);
router.delete("/:id", cartController.removeFromCart);

module.exports = router;
