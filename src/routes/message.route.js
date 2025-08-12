const router = require("express").Router();
const messageController = require("../controllers/message.controller");

// Route để tạo message mới
router.post("/create", messageController.create);

// Route để lấy tất cả messages
router.get("/all", messageController.getAll);

module.exports = router;
