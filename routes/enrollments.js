const express = require('express');
const router = express.Router();

// POST: ลงทะเบียนเรียน
router.post('/', async (req, res) => {
    const { student_id, course_id } = req.body; // รับค่า ID
    
    // บันทึกลงตาราง 'enrollments' (ไม่ใช่ students)
    const { data, error } = await req.supabase
        .from('enrollments')  // <--- เช็คบรรทัดนี้ดีๆ
        .insert([{ student_id, course_id }])
        .select();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

module.exports = router;