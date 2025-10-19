# User Management API dengan PostgreSQL & Cloudinary

Proyek ini adalah implementasi RESTful API dengan autentikasi JWT, CRUD data user, upload foto profil ke Cloudinary, serta keamanan server menggunakan CORS dan Helmet.

- **Nama:** Refa Setyagama Abdillah
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

## Preview Screenshot

### Register API
POST, http://localhost:5000/api/auth/register <br>
Daftar dulu sebelum mencoba test login.
![Register API](./src/assets/RegisterAPI.png)

### Login API
POST, http://localhost:5000/api/auth/login <br>
login sesuai email dan password yang sudah didaftarkan untuk mendapatkan token
![Login API](./src/assets/LoginAPI.png)

### Get All Users
GET, http://localhost:5000/api/users <br>
diawal kita harus setting Authorization pada header dan memasukan token yang didapat dari login user, settingan header akan tetap sama sampai proses testing api selesai. setelah semuanya sudah terseting, ketika klik send maka langsung muncul semua user yang sudah terdaftar  
![Get All Users](./src/assets/GetAllUsersAPI.png)

### Tabel Users di Database Server
ini adalah tampilan tabel yang sudah dibuat menggunaakn Query yang awal tadi beserta isi users yang sudah mendaftar
![Tabel Users DB Server](./src/assets/TabelUsersDBeaver.png)

### Update Data Users
PUT, http://localhost:5000/api/users/2 <br>
mengupdate data user yang sudah mendaftar
![Update Data Users](./src/assets/UpdateDataUsers.png)

### Tabel Users Setelah Update
ini adalah tampilan dari table user yang ada di DBeaver setelah testing postman update
![Tabel Users DB After Update](./src/assets/TabelUsersDBeaverAfterUpdate.png)

### Upload Avatar ke Cloudinary
pada langkah ini, perlu setting body > from-data, pada key dan type pilih 'file', dan pada value upload gambarnya. jika sudah langsung klik send. maka akan muncul respons link cloudinary 
![Upload Avatar Cloudinary](./src/assets/UploadAvatarCloudinary.png)

### Image Link dari Cloudinary
ini adalah tampilan dari link cloudinary yang sudah sukses melewati tahap upload.
![Image Link Cloudinary](./src/assets/imagelinkcloudinary.png)

### Cloudinary Media Library
ini adalah tampilan penyimpanan Media Library Website Cloudinary, menampilkan seluruh file yang sudah diunggah oleh user
![Cloudinary Media Library](./src/assets/CloudinaryMediaLibrary.png)

### Delete Data User by ID
DELETE, http://localhost:5000/api/users/2 <br>
menghapus data user berdasarkan ID user
![Delete Data User By ID](./src/assets/DeleteDataUserID.png)

### API Swagger Documentation
Tampilan dari Dokumentasi API Swegger
![Delete Data User By ID](./src/assets/api-swg-doc.png)

### API Swagger Register
Response Testing Register Swegger
![Delete Data User By ID](./src/assets/regis-swg.png)

### API Swagger Login
Response Testing Login Swegger
![Delete Data User By ID](./src/assets/login-swg.png)

### Error Handling
Mekanisme API untuk memberikan pesan kesalahan ("Username, email, password, dan role wajib diisi") kepada pengguna ketika permintaan POST yang dikirim tidak memiliki semua data wajib.
![Error Handling](./src/assets/ErrorHandling.png)
