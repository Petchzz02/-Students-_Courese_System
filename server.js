// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());

// เชื่อมต่อ Supabase
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

// ส่ง supabase client ไปใช้ใน routes ผ่าน request object (หรือจะแยกไฟล์ config ก็ได้)
app.use((req, res, next) => {
    req.supabase = supabase;
    next();
});

// API Documentation endpoint
app.get('/api', (req, res) => {
    res.json({
        success: true,
        message: '🎓 ยินดีต้อนรับสู่ Students Course System API',
        version: '1.0.0',
        description: 'ระบบจัดการนักเรียนและคอร์สเรียน',
        developer: 'Petchzz02',
        endpoints: {
            students: {
                description: '📚 จัดการข้อมูลนักเรียน',
                routes: [
                    { method: 'GET', path: '/api/students', description: 'ดึงข้อมูลนักเรียนทั้งหมด' },
                    { method: 'GET', path: '/api/students/:id', description: 'ดึงข้อมูลนักเรียนตาม ID' },
                    { method: 'POST', path: '/api/students', description: 'สร้างนักเรียนใหม่', body: { name: 'string', email: 'string' } },
                    { method: 'PUT', path: '/api/students/:id', description: 'อัพเดทข้อมูลนักเรียน', body: { name: 'string', email: 'string' } },
                    { method: 'DELETE', path: '/api/students/:id', description: 'ลบนักเรียน' }
                ]
            },
            courses: {
                description: '📖 จัดการข้อมูลคอร์สเรียน',
                routes: [
                    { method: 'GET', path: '/api/courses', description: 'ดึงข้อมูลคอร์สทั้งหมด' },
                    { method: 'GET', path: '/api/courses/:id', description: 'ดึงข้อมูลคอร์สตาม ID' },
                    { method: 'POST', path: '/api/courses', description: 'สร้างคอร์สใหม่', body: { title: 'string', description: 'string' } },
                    { method: 'PUT', path: '/api/courses/:id', description: 'อัพเดทข้อมูลคอร์ส', body: { title: 'string', description: 'string' } },
                    { method: 'DELETE', path: '/api/courses/:id', description: 'ลบคอร์ส' }
                ]
            },
            enrollments: {
                description: '✏️ จัดการการลงทะเบียนเรียน',
                routes: [
                    { method: 'GET', path: '/api/enrollments', description: 'ดึงข้อมูลการลงทะเบียนทั้งหมด' },
                    { method: 'GET', path: '/api/enrollments/:id', description: 'ดึงข้อมูลการลงทะเบียนตาม ID' },
                    { method: 'POST', path: '/api/enrollments', description: 'สร้างการลงทะเบียนใหม่', body: { student_id: 'integer', course_id: 'integer' } },
                    { method: 'DELETE', path: '/api/enrollments/:id', description: 'ลบการลงทะเบียน' }
                ]
            }
        },
        documentation: 'https://github.com/Petchzz02/-Students-_Courese_System',
        status: 'API is running successfully! 🚀'
    });
});

// Import Routes
const studentRoutes = require('./routes/students');
const courseRoutes = require('./routes/courses');
const enrollmentRoutes = require('./routes/enrollments');

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/enrollments', enrollmentRoutes);

// Serve static files from public folder (after API routes)
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\n🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend: http://localhost:${PORT}`);
    console.log(`🔌 API Docs: http://localhost:${PORT}/api\n`);
});