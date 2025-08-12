const MessageModel = require("../models/message.model");
const Joi = require("joi");

// Schema validation cho message
const messageSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  topic: Joi.string().max(50).allow(""),
  message: Joi.string().max(250).required(),
});

const messageController = {
  // Hàm tạo message mới
  create: async (req, res) => {
    console.log("📨 Nhận request tạo message:", req.body);

    try {
      // Validate dữ liệu đầu vào
      const { error, value } = messageSchema.validate(req.body);
      if (error) {
        console.log("❌ Validation error:", error.details[0].message);
        return res.status(400).json({
          success: false,
          message: error.details[0].message,
        });
      }

      // Tạo message mới trong database
      const newMessage = await MessageModel.create(value);
      console.log("✅ Message đã được tạo thành công:", newMessage.id);

      return res.status(201).json({
        success: true,
        data: newMessage,
        message: "Message đã được gửi thành công!",
      });
    } catch (error) {
      console.error("❌ Lỗi server:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message,
      });
    }
  },

  // Hàm lấy tất cả messages
  getAll: async (req, res) => {
    try {
      console.log("📋 Đang lấy tất cả messages...");

      // Lấy tất cả messages từ database
      const messages = await MessageModel.getAll();
      console.log(`✅ Đã lấy được ${messages.length} messages`);

      return res.status(200).json({
        success: true,
        data: messages,
        count: messages.length,
      });
    } catch (error) {
      console.error("❌ Lỗi khi lấy messages:", error);
      return res.status(500).json({
        success: false,
        message: "Lỗi server: " + error.message,
      });
    }
  },
};

module.exports = messageController;
