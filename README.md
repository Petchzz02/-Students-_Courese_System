# Students Course System

ระบบจัดการนักเรียนและคอร์สเรียน (Students Course Management System) เป็น RESTful API ที่พัฒนาด้วย Node.js, Express และ Supabase สำหรับจัดการข้อมูลนักเรียน คอร์สเรียน และการลงทะเบียนเรียน

## คุณสมบัติ

- 📚 จัดการข้อมูลคอร์สเรียน (Courses)
- 👨‍🎓 จัดการข้อมูลนักเรียน (Students)
- 📝 จัดการการลงทะเบียนเรียน (Enrollments)
- 🔄 RESTful API
- 🗄️ เชื่อมต่อกับ Supabase Database

## เทคโนโลยีที่ใช้

- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **Supabase** - Backend as a Service (Database)
- **dotenv** - Environment variables management
- **cors** - Cross-Origin Resource Sharing
- **body-parser** - Request body parsing

## ความต้องการของระบบ

ก่อนเริ่มต้น ตรวจสอบให้แน่ใจว่าคุณได้ติดตั้งโปรแกรมต่อไปนี้:

- Node.js (เวอร์ชัน 14.0 ขึ้นไป) - [ดาวน์โหลด](https://nodejs.org/)
- npm (มาพร้อมกับ Node.js)
- Git - [ดาวน์โหลด](https://git-scm.com/)
- บัญชี Supabase - [สมัคร](https://supabase.com/)

## วิธีติดตั้ง

### 1. Clone Repository

```bash
git clone https://github.com/Petchzz02/-Students-_Courese_System.git
cd -Students-_Courese_System
```

### 2. ติดตั้ง Dependencies

```bash
npm install
```

### 3. ตั้งค่า Environment Variables

สร้างไฟล์ `.env` ในโฟลเดอร์หลักของโปรเจค:

```bash
# สำหรับ Windows PowerShell
New-Item .env

# หรือใช้ notepad
notepad .env
```

จากนั้นเพิ่มข้อมูลต่อไปนี้ในไฟล์ `.env`:

```env
SUPABASE_URL=your_supabase_url_here
SUPABASE_KEY=your_supabase_anon_key_here
PORT=3000
```

**วิธีหา Supabase URL และ Key:**
1. เข้าสู่ระบบ [Supabase Dashboard](https://app.supabase.com/)
2. เลือกโปรเจคของคุณ
3. ไปที่ Settings → API
4. คัดลอก `URL` และ `anon/public key`

### 4. ตั้งค่า Database บน Supabase

สร้างตารางในฐานข้อมูล Supabase ของคุณ:

#### ตาราง students
```sql
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### ตาราง courses
```sql
CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);
```

#### ตาราง enrollments
```sql
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    student_id INTEGER REFERENCES students(id) ON DELETE CASCADE,
    course_id INTEGER REFERENCES courses(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(student_id, course_id)
);
```

## วิธีรันระบบ

### รันแบบปกติ

```bash
node server.js
```

### รันแบบ Development (Auto-reload)

```bash
npx nodemon server.js
```

หรือเพิ่ม script ใน `package.json`:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

จากนั้นรันด้วย:

```bash
npm run dev
```

Server จะเริ่มทำงานที่ `http://localhost:3000`

## API Endpoints

### Students

- `GET /api/students` - ดึงข้อมูลนักเรียนทั้งหมด
- `GET /api/students/:id` - ดึงข้อมูลนักเรียนตาม ID
- `POST /api/students` - สร้างนักเรียนใหม่
- `PUT /api/students/:id` - อัพเดทข้อมูลนักเรียน
- `DELETE /api/students/:id` - ลบนักเรียน

### Courses

- `GET /api/courses` - ดึงข้อมูลคอร์สทั้งหมด
- `GET /api/courses/:id` - ดึงข้อมูลคอร์สตาม ID
- `POST /api/courses` - สร้างคอร์สใหม่
- `PUT /api/courses/:id` - อัพเดทข้อมูลคอร์ส
- `DELETE /api/courses/:id` - ลบคอร์ส

### Enrollments

- `GET /api/enrollments` - ดึงข้อมูลการลงทะเบียนทั้งหมด
- `GET /api/enrollments/:id` - ดึงข้อมูลการลงทะเบียนตาม ID
- `POST /api/enrollments` - สร้างการลงทะเบียนใหม่
- `DELETE /api/enrollments/:id` - ลบการลงทะเบียน

## ตัวอย่างการใช้งาน API

### สร้างนักเรียนใหม่

```bash
curl -X POST http://localhost:3000/api/students \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### สร้างคอร์สใหม่

```bash
curl -X POST http://localhost:3000/api/courses \
  -H "Content-Type: application/json" \
  -d '{"title":"Web Development","description":"Learn HTML, CSS, JavaScript"}'
```

### ลงทะเบียนเรียน

```bash
curl -X POST http://localhost:3000/api/enrollments \
  -H "Content-Type: application/json" \
  -d '{"student_id":1,"course_id":1}'
```

## โครงสร้างโปรเจค

```
-Students-_Courese_System/
│
├── routes/
│   ├── students.js      # Routes สำหรับจัดการนักเรียน
│   ├── courses.js       # Routes สำหรับจัดการคอร์ส
│   └── enrollments.js   # Routes สำหรับจัดการการลงทะเบียน
│
├── .env                 # Environment variables (ไม่ commit ลง Git)
├── .gitignore          # ไฟล์ที่ไม่ต้องการ track ใน Git
├── package.json        # Dependencies และ scripts
├── server.js           # Entry point ของแอปพลิเคชัน
└── README.md          # เอกสารนี้
```

## การแก้ไขปัญหา

### ปัญหา: Cannot find module

**แก้ไข:** ตรวจสอบว่าได้รัน `npm install` แล้ว

### ปัญหา: Port already in use

**แก้ไข:** เปลี่ยน PORT ในไฟล์ `.env` เป็นเลขอื่น หรือปิดโปรแกรมที่ใช้ port นั้นอยู่

### ปัญหา: Supabase connection error

**แก้ไข:** 
- ตรวจสอบว่า `SUPABASE_URL` และ `SUPABASE_KEY` ในไฟล์ `.env` ถูกต้อง
- ตรวจสอบว่าได้สร้างตารางในฐานข้อมูลแล้ว

## Git Workflow

### 1. เริ่มต้นใช้งาน Git

```bash
# ตรวจสอบสถานะ
git status

# ตรวจสอบ branch ปัจจุบัน
git branch
```

### 2. สร้าง Branch ใหม่สำหรับ Feature

```bash
# สร้างและเปลี่ยนไปยัง branch ใหม่
git checkout -b feature/new-feature-name

# หรือใช้คำสั่งใหม่
git switch -c feature/new-feature-name
```

### 3. ทำการแก้ไขและ Commit

```bash
# เพิ่มไฟล์ที่ต้องการ commit
git add .

# หรือเพิ่มเฉพาะไฟล์ที่ต้องการ
git add server.js routes/students.js

# Commit พร้อมข้อความ
git commit -m "Add new feature: description of changes"
```

### 4. Push ขึ้น Remote Repository

```bash
# Push branch ไปยัง GitHub
git push origin feature/new-feature-name

# หรือ push branch ปัจจุบัน
git push -u origin HEAD
```

### 5. Pull Request และ Merge

1. ไปที่ GitHub repository
2. สร้าง Pull Request จาก branch ของคุณไปยัง `main`
3. รอการ review และ approve
4. Merge Pull Request

### 6. Update Local Main Branch

```bash
# เปลี่ยนกลับไปยัง main branch
git checkout main

# Pull การเปลี่ยนแปลงล่าสุด
git pull origin main

# ลบ branch ที่ merge แล้ว (ถ้าต้องการ)
git branch -d feature/new-feature-name
```

### คำสั่ง Git ที่ใช้บ่อย

```bash
# ตรวจสอบสถานะไฟล์
git status

# ดูประวัติ commit
git log --oneline

# ดูความแตกต่างของไฟล์
git diff

# ยกเลิกการแก้ไขที่ยังไม่ได้ stage
git checkout -- <file>

# ยกเลิกการ add (unstage)
git reset HEAD <file>

# ดึงข้อมูลล่าสุดจาก remote
git fetch origin

# ดู branch ทั้งหมด
git branch -a
```

## การมีส่วนร่วม (Contributing)

1. Fork โปรเจค
2. สร้าง Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'Add some AmazingFeature'`)
4. Push ไปยัง Branch (`git push origin feature/AmazingFeature`)
5. เปิด Pull Request

## License

ISC

## ผู้พัฒนา

- Petchzz02 - [GitHub Profile](https://github.com/Petchzz02)

## ติดต่อ

หากมีคำถามหรือพบปัญหา กรุณาเปิด [Issue](https://github.com/Petchzz02/-Students-_Courese_System/issues) บน GitHub
