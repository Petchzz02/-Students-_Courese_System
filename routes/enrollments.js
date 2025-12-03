const express = require('express');
const router = express.Router();

// GET: ดึงข้อมูลการลงทะเบียนทั้งหมด
router.get('/', async (req, res) => {
    const { data, error } = await req.supabase.from('enrollments').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// GET: ดึงข้อมูลการลงทะเบียนตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await req.supabase
        .from('enrollments')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) return res.status(404).json({ error: 'Enrollment not found' });
    res.json(data);
});

// POST: ลงทะเบียนเรียน
router.post('/', async (req, res) => {
    const { student_id, course_id } = req.body;
    
    // ตรวจสอบว่ามีข้อมูลครบหรือไม่
    if (!student_id || !course_id) {
        return res.status(400).json({ error: 'student_id and course_id are required' });
    }
    
    // บันทึกลงตาราง 'enrollments'
    const { data, error } = await req.supabase
        .from('enrollments')
        .insert([{ student_id, course_id }])
        .select();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// DELETE: ยกเลิกการลงทะเบียน
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await req.supabase
        .from('enrollments')
        .delete()
        .eq('id', id);
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Enrollment deleted successfully' });
});

module.exports = router;