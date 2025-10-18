# 🧩 User Management API dengan PostgreSQL & Cloudinary

Proyek ini adalah implementasi RESTful API dengan autentikasi JWT, CRUD data user, upload foto profil ke Cloudinary, serta keamanan server menggunakan CORS dan Helmet.

- **Nama:** Refa Setyagama Abdillah
- **Program:** Backend API Development
- **Mentor:** Imam Fadhilah

---

## Deskripsi Proyek

API ini dikembangkan untuk mengelola data **User** dengan fitur:
- Register & Login (JWT Authentication)
- CRUD data user (Create, Read, Update, Delete)
- Upload foto profil (Cloudinary)
- Keamanan server menggunakan CORS dan Helmet
- Validasi input dan penanganan error

---

## Teknologi yang Digunakan

- Node.js & Express.js  
- PostgreSQL  
- JWT (jsonwebtoken)  
- bcryptjs (hash password)  
- Cloudinary & Multer  
- CORS & Helmet  
- dotenv untuk konfigurasi environment

---

## Persiapan dan Instalasi

1. **Clone Repository**
   ```bash
   git clone https://github.com/gamastronger/user_management_api.git
   cd user_management_api
2. **Install Dependencies**
   ```bash
   npm install
3. **Buat Database**
   Jalankan query berikut di PostgreSQL:
   ```bash
   CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   username VARCHAR(100) UNIQUE NOT NULL,
   email VARCHAR(100) UNIQUE NOT NULL,
   password VARCHAR(255) NOT NULL,
   role VARCHAR(50) DEFAULT 'user',
   avatar_url TEXT,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
4. **Buat .env**
   ```bash
   PORT=5000
   DATABASE_URL=postgres://postgres:password@localhost:5432/user_management
   JWT_SECRET=your_secret_key
   CLOUDINARY_NAME=your_cloud_name
   CLOUDINARY_KEY=your_api_key
   CLOUDINARY_SECRET=your_api_secret

5. **Jalankan Server**
   Jalankan Server
   ```bash
   npm run dev

## 🖼️ Preview Screenshot

### 1️⃣ Register API
![Register API](./src/assets/RegisterAPI.png)

### 2️⃣ Login API
![Login API](./src/assets/LoginAPI.png)

### 3️⃣ Get All Users
![Get All Users](./src/assets/GetAllUsersAPI.png)

### 4️⃣ Update Data Users
![Update Data Users](./src/assets/UpdateDataUsers.png)

### 5️⃣ Delete Data User by ID
![Delete Data User By ID](./src/assets/DeleteDataUserByID.png)

### 6️⃣ Upload Avatar ke Cloudinary
![Upload Avatar Cloudinary](./src/assets/UploadAvatarCloudinary.png)

### 7️⃣ Image Link dari Cloudinary
![Image Link Cloudinary](./src/assets/imagelinkcloudinary.png)

### 8️⃣ Tabel Users di Database Server
![Tabel Users DB Server](./src/assets/TabelUsersDBServer.png)

### 9️⃣ Tabel Users Setelah Update
![Tabel Users DB After Update](./src/assets/TabelUsersDBAfterUpdate.png)

### 🔟 Cloudinary Media Library
![Cloudinary Media Library](./src/assets/CloudinaryMediaLibrary.png)

### 11️⃣ Error Handling
![Error Handling](./src/assets/ErrorHandling.png)
