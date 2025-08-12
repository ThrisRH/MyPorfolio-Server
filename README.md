# Portfolio Backend Server

Server backend cho website portfolio, xử lý việc gửi tin nhắn liên hệ và lưu trữ dữ liệu.

## Tính năng

- **Message API**: API để tạo và lấy tin nhắn liên hệ
- **Firebase Integration**: Kết nối với Firebase Realtime Database
- **Data Validation**: Sử dụng Joi để validate dữ liệu đầu vào
- **CORS Support**: Hỗ trợ Cross-Origin Resource Sharing
- **Environment Variables**: Quản lý cấu hình thông qua file .env

## Công nghệ sử dụng

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: Firebase Realtime Database
- **Validation**: Joi
- **Middleware**: CORS, dotenv
- **Authentication**: Firebase Admin SDK

## Cài đặt

1. Clone repository:

```bash
git clone <repository-url>
cd server
```

2. Cài đặt dependencies:

```bash
npm install
```

3. Tạo file .env với các biến môi trường:

```env
PORT=8080
databaseURL=https://your-project-id-default-rtdb.firebaseio.com
```

4. Thêm file `serviceAccountKey.json` từ Firebase Console

5. Chạy server:

```bash
npm run dev
```

Server sẽ chạy tại `http://localhost:8080`

## Cấu trúc thư mục

```
src/
├── controllers/         # Business logic
│   └── message.controller.js  # Xử lý message API
├── models/             # Data models
│   └── message.model.js       # Model cho Message
├── routes/             # API routes
│   └── message.route.js       # Routes cho message
└── data/               # Database configuration
    └── firebaseConfig.js      # Cấu hình Firebase
```

## API Endpoints

### Message API

- **POST** `/api/message/create` - Tạo tin nhắn mới
- **GET** `/api/message/all` - Lấy tất cả tin nhắn

### Request Body cho Create Message

```json
{
  "name": "Họ tên",
  "email": "email@example.com",
  "topic": "Chủ đề (tùy chọn)",
  "message": "Nội dung tin nhắn"
}
```

### Response Format

```json
{
  "success": true,
  "data": {
    "id": "message_id",
    "name": "Họ tên",
    "email": "email@example.com",
    "topic": "Chủ đề",
    "message": "Nội dung tin nhắn"
  },
  "message": "Message đã được gửi thành công!"
}
```

## Cấu hình Firebase

1. Tạo project trên Firebase Console
2. Bật Realtime Database
3. Tạo service account và download `serviceAccountKey.json`
4. Đặt file này vào thư mục gốc của server
5. Cập nhật `databaseURL` trong file .env

## Scripts

- `npm run dev`: Chạy server với nodemon (development)
- `npm test`: Chạy tests (chưa có)

## Environment Variables

- `PORT`: Port để chạy server (mặc định: 8080)
- `databaseURL`: URL của Firebase Realtime Database

## Bảo mật

- Sử dụng Firebase Admin SDK để xác thực
- Validate dữ liệu đầu vào với Joi
- CORS được cấu hình để chỉ cho phép frontend
- Không lưu trữ thông tin nhạy cảm

## Deployment

Để deploy lên production:

1. Cập nhật environment variables
2. Đảm bảo Firebase service account có quyền phù hợp
3. Sử dụng PM2 hoặc Docker để chạy server

## Tác giả

Trần Hữu Minh Trí - Sinh viên Công nghệ Phần mềm
