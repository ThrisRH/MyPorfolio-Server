const { database } = require("../data/firebaseConfig");

const MessageModel = {
  // Hàm tạo message mới trong Firebase
  create: async (data) => {
    try {
      console.log("📝 Đang tạo message mới:", data);

      // Tạo reference đến node messages trong Firebase
      const ref = database.ref("messages");
      const newRef = await ref.push(data);

      console.log("✅ Message đã được tạo với ID:", newRef.key);

      // Trả về message với ID mới
      return { id: newRef.key, ...data };
    } catch (error) {
      console.error("❌ Lỗi khi tạo message:", error);
      throw new Error(`Không thể tạo message: ${error.message}`);
    }
  },

  // Hàm lấy tất cả messages từ Firebase
  getAll: async () => {
    try {
      // Lấy snapshot của tất cả messages
      const snapshot = await database.ref("messages").once("value");
      const messages = [];

      // Chuyển đổi snapshot thành array
      snapshot.forEach((childSnapshot) => {
        messages.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });

      return messages;
    } catch (error) {
      console.error("❌ Lỗi khi lấy messages:", error);
      throw new Error(`Không thể lấy messages: ${error.message}`);
    }
  },
};

module.exports = MessageModel;
