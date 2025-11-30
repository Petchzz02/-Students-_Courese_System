<div align="center">

# 🎓 Student Course Management System API

### ระบบจัดการนักเรียนและคอร์สเรียน

[![Project Status](https://img.shields.io/badge/status-active-success?style=for-the-badge)](https://github.com/Petchzz02/-Students-_Courese_System)
[![License](https://img.shields.io/badge/license-ISC-blue?style=for-the-badge)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-16+-green?style=for-the-badge&logo=node.js)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express-5.1-black?style=for-the-badge&logo=express)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-orange?style=for-the-badge&logo=supabase)](https://supabase.com/)

**RESTful API ที่พัฒนาด้วย Node.js, Express และ Supabase สำหรับจัดการข้อมูลนักเรียน คอร์สเรียน และการลงทะเบียนเรียน**

[🚀 Live Demo](https://students-courese-system.onrender.com) • [📖 Documentation](#-api-endpoints) • [🐛 Report Bug](https://github.com/Petchzz02/-Students-_Courese_System/issues)

</div>

---

---

## 🌟 คุณสมบัติของระบบ (Features)

<table>
<tr>
<td width="50%">

### 👨‍🎓 จัดการนักเรียน (Students)
- ✅ สร้างข้อมูลนักเรียนใหม่
- ✅ ดูรายชื่อนักเรียนทั้งหมด
- ✅ ค้นหานักเรียนตาม ID
- ✅ แก้ไขข้อมูลนักเรียน
- ✅ ลบข้อมูลนักเรียน

</td>
<td width="50%">

### 📚 จัดการคอร์สเรียน (Courses)
- ✅ สร้างคอร์สเรียนใหม่
- ✅ ดูรายการคอร์สทั้งหมด
- ✅ ค้นหาคอร์สตาม ID
- ✅ แก้ไขข้อมูลคอร์ส
- ✅ ลบคอร์สเรียน

</td>
</tr>
<tr>
<td width="50%">

### ✏️ การลงทะเบียน (Enrollments)
- ✅ ลงทะเบียนนักเรียนเข้าคอร์ส
- ✅ ดูประวัติการลงทะเบียนทั้งหมด
- ✅ ยกเลิกการลงทะเบียน
- ✅ ตรวจสอบการลงทะเบียนซ้ำ

</td>
<td width="50%">

### 🗄️ Database & Backend
- ✅ เชื่อมต่อ Supabase (PostgreSQL)
- ✅ RESTful API Design
- ✅ Error Handling
- ✅ CORS Support

</td>
</tr>
</table>

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)

<div align="center">

| Technology | Description | Version |
|:----------:|:------------|:-------:|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=node.js&logoColor=white) | JavaScript Runtime | 16+ |
| ![Express](https://img.shields.io/badge/Express-000000?style=flat&logo=express&logoColor=white) | Web Framework | 5.1.0 |
| ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white) | Database (PostgreSQL) | Latest |
| ![Nodemon](https://img.shields.io/badge/Nodemon-76D04B?style=flat&logo=nodemon&logoColor=white) | Development Tool | 3.1.11 |
| ![dotenv](https://img.shields.io/badge/.env-ECD53F?style=flat&logo=.env&logoColor=black) | Environment Variables | 17.2.3 |

</div>

---

## ⚙️ การติดตั้งและรันระบบ (Installation)

### 📋 ความต้องการของระบบ (Prerequisites)

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งโปรแกรมต่อไปนี้:

- ✅ **Node.js** (เวอร์ชัน 14.0 ขึ้นไป) - [ดาวน์โหลด](https://nodejs.org/)
- ✅ **npm** (มาพร้อมกับ Node.js)
- ✅ **Git** - [ดาวน์โหลด](https://git-scm.com/)
- ✅ **Supabase Account** - [สมัครฟรี](https://supabase.com/)

### 🚀 ขั้นตอนการติดตั้ง

#### 1️⃣ Clone Repository

```bash
git clone https://github.com/Petchzz02/-Students-_Courese_System.git
cd -Students-_Courese_System
```

#### 2️⃣ ติดตั้ง Dependencies

```bash
npm install
```

#### 3️⃣ ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์หลัก:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_key
PORT=3000
```

> 💡 **วิธีหา Supabase Credentials:**
> 1. เข้าสู่ระบบ [Supabase Dashboard](https://app.supabase.com/)
> 2. เลือกโปรเจคของคุณ
> 3. ไปที่ **Settings** → **API**
> 4. คัดลอก **URL** และ **anon/public key**

#### 4️⃣ สร้างตารางใน Supabase

รันคำสั่ง SQL นี้ใน **SQL Editor** ของ Supabase:

```sql
-- 1. ตาราง Students
CREATE TABLE students (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  fullname TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  major TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 2. ตาราง Courses
CREATE TABLE courses (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  credit INT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- 3. ตาราง Enrollments
CREATE TABLE enrollments (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  student_id BIGINT REFERENCES students(id) ON DELETE CASCADE,
  course_id BIGINT REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);
```

#### 5️⃣ รันเซิร์ฟเวอร์

```bash
# Development Mode (Auto-reload with Nodemon)
npm run dev

# Production Mode
npm start
```

✅ **Server กำลังทำงานที่:** `http://localhost:3000`

> 🌐 เปิด browser ที่ `http://localhost:3000` เพื่อดูหน้า API Documentation

---

## 🎨 Frontend Interface

ระบบมาพร้อมกับ Web Interface ที่สวยงามและใช้งานง่าย!

### ✨ คุณสมบัติของ Frontend

- **📱 Responsive Design** - รองรับทุกขนาดหน้าจอ
- **🎯 User-Friendly Interface** - ใช้งานง่าย เข้าใจได้ทันที
- **⚡ Real-time Updates** - อัพเดทข้อมูลแบบ real-time
- **🔍 Search Functionality** - ค้นหาข้อมูลได้ทุกหมวด
- **✅ Form Validation** - ตรวจสอบข้อมูลก่อนส่ง
- **🎨 Modern UI/UX** - ออกแบบสวยงาม ใช้สีสันสบายตา

### 📄 หน้าเว็บที่มี

1. **หน้าจัดการนักเรียน** - เพิ่ม แก้ไข ลบ และค้นหานักเรียน
2. **หน้าจัดการคอร์ส** - เพิ่ม แก้ไข ลบ และค้นหาคอร์สเรียน
3. **หน้าจัดการการลงทะเบียน** - ลงทะเบียนและยกเลิกการลงทะเบียน

### 🚀 วิธีเข้าใช้งาน

เมื่อ server รันแล้ว เปิด browser ที่:

```
http://localhost:3000
```

จะเห็นหน้า Web Interface พร้อมใช้งานทันที!

### 📸 Preview

- **Navigation Bar** - สลับระหว่างหน้าต่างๆ ง่ายๆ
- **Data Tables** - แสดงข้อมูลในรูปแบบตาราง
- **Modal Forms** - ฟอร์มเพิ่ม/แก้ไขข้อมูลแบบ popup
- **Toast Notifications** - แจ้งเตือนสถานะการทำงาน
---

## 📡 API Endpoints

### 🏠 Root Endpoint

```http
GET /
```

แสดงหน้า API Documentation พร้อมรายการ endpoints ทั้งหมด

---

### 1️⃣ Students (นักเรียน)

<details>
<summary>📖 คลิกเพื่อดู API สำหรับนักเรียน</summary>

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/students` | ดึงข้อมูลนักเรียนทั้งหมด | - |
| `GET` | `/api/students/:id` | ดึงข้อมูลนักเรียนตาม ID | - |
| `POST` | `/api/students` | เพิ่มนักเรียนใหม่ | `{ "fullname": "string", "email": "string", "major": "string" }` |
| `PUT` | `/api/students/:id` | แก้ไขข้อมูลนักเรียน | `{ "fullname": "string", "major": "string" }` |
| `DELETE` | `/api/students/:id` | ลบข้อมูลนักเรียน | - |

#### ตัวอย่างการใช้งาน

```javascript
// GET - ดึงนักเรียนทั้งหมด
fetch('http://localhost:3000/api/students')
  .then(res => res.json())
  .then(data => console.log(data));

// POST - เพิ่มนักเรียนใหม่
fetch('http://localhost:3000/api/students', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    fullname: "John Doe",
    email: "john@email.com",
    major: "IT"
  })
});
```

</details>

---

### 2️⃣ Courses (วิชาเรียน)

<details>
<summary>📖 คลิกเพื่อดู API สำหรับคอร์สเรียน</summary>

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/courses` | ดึงรายวิชาทั้งหมด | - |
| `GET` | `/api/courses/:id` | ดึงข้อมูลคอร์สตาม ID | - |
| `POST` | `/api/courses` | เพิ่มวิชาเรียนใหม่ | `{ "name": "string", "description": "string", "credit": number }` |
| `PUT` | `/api/courses/:id` | แก้ไขข้อมูลคอร์ส | `{ "name": "string", "description": "string", "credit": number }` |
| `DELETE` | `/api/courses/:id` | ลบคอร์สเรียน | - |

#### ตัวอย่างการใช้งาน

```javascript
// POST - เพิ่มคอร์สใหม่
fetch('http://localhost:3000/api/courses', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    name: "Basic Node.js",
    description: "Backend Development",
    credit: 3
  })
});
```

</details>

---

### 3️⃣ Enrollments (การลงทะเบียน)

<details>
<summary>📖 คลิกเพื่อดู API สำหรับการลงทะเบียน</summary>

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `GET` | `/api/enrollments` | ดูประวัติการลงทะเบียนทั้งหมด | - |
| `GET` | `/api/enrollments/:id` | ดูการลงทะเบียนตาม ID | - |
| `POST` | `/api/enrollments` | ลงทะเบียนเรียน | `{ "student_id": number, "course_id": number }` |
| `DELETE` | `/api/enrollments/:id` | ยกเลิกการลงทะเบียน | - |

#### ตัวอย่างการใช้งาน

```javascript
// POST - ลงทะเบียนเรียน
fetch('http://localhost:3000/api/enrollments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    student_id: 1,
    course_id: 1
  })
});
```

</details>---

## 🧪 System Test Cases (เอกสารทดสอบระบบ)

### 📊 สรุปผลการทดสอบ API ผ่าน Postman

<details>
<summary><b>TC-01: การจัดการข้อมูลนักเรียน (Manage Students)</b></summary>

| Test ID | Scenario | Input | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| ST-01 | ดึงข้อมูลนักเรียนทั้งหมด | `GET /api/students` | Status 200 OK + JSON Array | ✅ Pass |
| ST-02 | เพิ่มนักเรียนใหม่ (สำเร็จ) | `POST /api/students`<br>`{"fullname":"Test User","email":"test@mail.com","major":"IT"}` | Status 201 Created | ✅ Pass |
| ST-03 | เพิ่มนักเรียน (ข้อมูลไม่ครบ) | `POST /api/students`<br>`{"email":"fail@mail.com"}` | Status 400 Bad Request | ✅ Pass |
| ST-04 | แก้ไขข้อมูลนักเรียน | `PUT /api/students/1`<br>`{"fullname":"Updated Name","major":"CS"}` | Status 200 OK + Updated Data | ✅ Pass |
| ST-05 | ลบนักเรียน | `DELETE /api/students/1` | Status 200 OK + Delete Message | ✅ Pass |

</details>

<details>
<summary><b>TC-02: การจัดการวิชาเรียน (Manage Courses)</b></summary>

| Test ID | Scenario | Input | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| CS-01 | ดึงรายวิชาทั้งหมด | `GET /api/courses` | Status 200 OK + JSON Array | ✅ Pass |
| CS-02 | เพิ่มวิชาเรียนใหม่ | `POST /api/courses`<br>`{"name":"Basic Node.js","description":"Intro to Backend","credit":3}` | Status 201 Created | ✅ Pass |

</details>

<details>
<summary><b>TC-03: การลงทะเบียนเรียน (Enrollments)</b></summary>

| Test ID | Scenario | Input | Expected Result | Status |
|---------|----------|-------|-----------------|--------|
| EN-01 | ลงทะเบียนเรียน (สำเร็จ) | `POST /api/enrollments`<br>`{"student_id":1,"course_id":1}` | Status 201 Created | ✅ Pass |
| EN-02 | ลงทะเบียน (รหัสนักเรียนผิด) | `POST /api/enrollments`<br>`{"student_id":9999,"course_id":1}` | Status 400 Bad Request | ✅ Pass |

</details>---

## 🚀 Deployment

<div align="center">

### 🌐 Live Demo

ระบบนี้ได้ Deploy บน **Render** แล้ว

[![Deploy Status](https://img.shields.io/badge/Deploy-Success-brightgreen?style=for-the-badge&logo=render)](https://students-courese-system.onrender.com)

**🔗 Live URL:** [https://students-courese-system.onrender.com](https://students-courese-system.onrender.com)

</div>

---

## 📂 โครงสร้างโปรเจค (Project Structure)

```
📦 -Students-_Courese_System
┣ 📂 public/                # Frontend files
┃ ┣ 📜 index.html          # Main HTML page
┃ ┣ 📜 style.css           # Styles
┃ ┗ 📜 script.js           # JavaScript logic
┣ 📂 routes/
┃ ┣ 📜 students.js         # Routes สำหรับจัดการนักเรียน
┃ ┣ 📜 courses.js          # Routes สำหรับจัดการคอร์ส
┃ ┗ 📜 enrollments.js      # Routes สำหรับจัดการการลงทะเบียน
┣ 📜 .env                  # Environment variables (ไม่ commit)
┣ 📜 .gitignore            # ไฟล์ที่ไม่ต้องการ track
┣ 📜 package.json          # Dependencies และ scripts
┣ 📜 server.js             # Entry point ของแอปพลิเคชัน
┗ 📜 README.md             # เอกสารนี้
```

---

## 🔧 การแก้ไขปัญหา (Troubleshooting)

<details>
<summary><b>❌ Cannot find module</b></summary>

**สาเหตุ:** Dependencies ยังไม่ได้ติดตั้ง

**วิธีแก้:**
```bash
npm install
```

</details>

<details>
<summary><b>❌ Port already in use</b></summary>

**สาเหตุ:** Port 3000 ถูกใช้งานอยู่

**วิธีแก้:**
1. เปลี่ยน PORT ในไฟล์ `.env`
```env
PORT=3001
```
2. หรือปิดโปรแกรมที่ใช้ port 3000

</details>

<details>
<summary><b>❌ Supabase connection error</b></summary>

**สาเหตุ:** การเชื่อมต่อ Supabase ผิดพลาด

**วิธีแก้:**
- ตรวจสอบ `SUPABASE_URL` และ `SUPABASE_KEY` ในไฟล์ `.env`
- ตรวจสอบว่าได้สร้างตารางในฐานข้อมูลแล้ว
- ตรวจสอบ Internet connection

</details>

---

## 🤝 การมีส่วนร่วม (Contributing)

เรายินดีรับ contributions จากทุกคน! 

1. 🍴 Fork โปรเจค
2. 🌿 สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. 💾 Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. 📤 Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. 🔃 เปิด Pull Request

---

## 📜 License

This project is licensed under the **ISC License**

---

<div align="center">

## 👨‍💻 ผู้พัฒนา (Developer)

**Petchzz02**

[![GitHub](https://img.shields.io/badge/GitHub-Petchzz02-181717?style=for-the-badge&logo=github)](https://github.com/Petchzz02)
[![Repository](https://img.shields.io/badge/Repository-Students__Course__System-blue?style=for-the-badge&logo=github)](https://github.com/Petchzz02/-Students-_Courese_System)

---

### 📞 ติดต่อ (Contact)

หากมีคำถามหรือพบปัญหา กรุณา:

[![Issues](https://img.shields.io/badge/Report-Issue-red?style=for-the-badge&logo=github)](https://github.com/Petchzz02/-Students-_Courese_System/issues)

---

**Made with ❤️ by Petchzz02**

⭐ ถ้าชอบโปรเจคนี้ กด Star ให้หน่อยนะครับ!

</div>