const express = require('express');
const router = express.Router();

// GET: ดึงข้อมูลคอร์สทั้งหมด
router.get('/', async (req, res) => {
    const { data, error } = await req.supabase.from('courses').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// POST: สร้างคอร์สเรียนใหม่
router.post('/', async (req, res) => {
    const { name, description, credit } = req.body;
    
    // แก้ตรงนี้ให้เป็น 'courses'
    const { data, error } = await req.supabase
        .from('courses') 
        .insert([{ name, description, credit }])
        .select();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

module.exports = router;