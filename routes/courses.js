const express = require('express');
const router = express.Router();

// GET: ดึงข้อมูลคอร์สทั้งหมด
router.get('/', async (req, res) => {
    const { data, error } = await req.supabase.from('courses').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// GET: ดึงข้อมูลคอร์สตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await req.supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();
    
    if (error) return res.status(404).json({ error: 'Course not found' });
    res.json(data);
});

// POST: สร้างคอร์สเรียนใหม่
router.post('/', async (req, res) => {
    const { name, description, credit } = req.body;
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!name || !credit) {
        return res.status(400).json({ error: 'name and credit are required' });
    }
    
    const { data, error } = await req.supabase
        .from('courses') 
        .insert([{ name, description, credit }])
        .select();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// PUT: แก้ไขข้อมูลคอร์ส
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, credit } = req.body;
    
    const { data, error } = await req.supabase
        .from('courses')
        .update({ name, description, credit })
        .eq('id', id)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// DELETE: ลบคอร์ส
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await req.supabase
        .from('courses')
        .delete()
        .eq('id', id);
    
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Course deleted successfully' });
});

module.exports = router;