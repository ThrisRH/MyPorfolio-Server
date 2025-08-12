const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { database } = require("./src/data/firebaseConfig");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 8080;

// Kiểm tra kết nối Firebase
database.ref(".info/connected").on("value", (snap) => {
  console.log("Firebase connected:", snap.val());
});

// Route test đơn giản
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Sử dụng route cho message
const messageRoute = require("./src/routes/message.route");
app.use("/api/message", messageRoute);

// Khởi động server
app.listen(port, () => console.log(`Server running on port ${port}`));
