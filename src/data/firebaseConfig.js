const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

dotenv.config();

// Kiểm tra và làm sạch databaseURL từ file .env
let databaseURL = process.env.databaseURL;

if (!databaseURL) {
  console.error("❌ Thiếu databaseURL trong file .env");
  console.error(
    "Vui lòng thêm: databaseURL=https://your-project-id-default-rtdb.firebaseio.com"
  );
  process.exit(1);
}

// Loại bỏ dấu phẩy và khoảng trắng thừa ở cuối URL
databaseURL = databaseURL.trim().replace(/,$/, "");

// Kiểm tra xem URL có hợp lệ không
try {
  new URL(databaseURL);
} catch (error) {
  console.error("❌ databaseURL không hợp lệ:", databaseURL);
  console.error("Vui lòng kiểm tra lại định dạng URL");
  process.exit(1);
}

console.log("🔗 Sử dụng databaseURL:", databaseURL);

// Khởi tạo Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: databaseURL,
});

const database = admin.database();

// Test kết nối với Firebase
database
  .ref()
  .once("value")
  .then(() => {
    console.log("✅ Kết nối Firebase Realtime Database thành công!");
  })
  .catch((error) => {
    console.error("❌ Lỗi kết nối Firebase:", error.message);
  });

module.exports = { admin, database };
