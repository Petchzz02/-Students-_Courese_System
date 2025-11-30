const express = require('express');
const router = express.Router();

// GET: ดึงข้อมูลนักเรียนทั้งหมด
router.get('/', async (req, res) => {
    const { data, error } = await req.supabase.from('students').select('*');
    if (error) return res.status(500).json({ error: error.message });
    res.json(data);
});

// GET: ดึงตาม ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const { data, error } = await req.supabase.from('students').select('*').eq('id', id).single();
    if (error) return res.status(404).json({ error: 'Student not found' });
    res.json(data);
});

// POST: เพิ่มนักเรียน
router.post('/', async (req, res) => {
    const { fullname, email, major } = req.body;
    const { data, error } = await req.supabase
        .from('students')
        .insert([{ fullname, email, major }])
        .select();
    
    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(data);
});

// PUT: แก้ไขข้อมูล
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { fullname, major } = req.body;
    const { data, error } = await req.supabase
        .from('students')
        .update({ fullname, major })
        .eq('id', id)
        .select();

    if (error) return res.status(400).json({ error: error.message });
    res.json(data);
});

// DELETE: ลบข้อมูล
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const { error } = await req.supabase.from('students').delete().eq('id', id);
    if (error) return res.status(400).json({ error: error.message });
    res.json({ message: 'Deleted successfully' });
});

module.exports = router;