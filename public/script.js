// API Base URL - ตรวจสอบว่ารันที่ไหน
const API_URL = window.location.hostname === 'localhost' 
    ? 'http://localhost:3000/api'
    : 'https://students-courese-system.onrender.com/api';

// Global state
let students = [];
let courses = [];
let enrollments = [];
let currentEditId = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadStudents();
    setupSearch();
});

// Mobile menu toggle
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    nav.classList.toggle('active');
}

// Switch section helper for footer links
function switchToSection(sectionName) {
    switchSection(sectionName);
    
    // Close mobile menu if open
    const nav = document.querySelector('.nav');
    nav.classList.remove('active');
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Load data
    if (sectionName === 'students') loadStudents();
    else if (sectionName === 'courses') loadCourses();
    else if (sectionName === 'enrollments') loadEnrollments();
}

// Navigation
function setupNavigation() {
    const navBtns = document.querySelectorAll('.nav-btn');
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const section = btn.dataset.section;
            switchSection(section);
            
            // Close mobile menu
            const nav = document.querySelector('.nav');
            nav.classList.remove('active');
            
            // Load data when switching
            if (section === 'students') loadStudents();
            else if (section === 'courses') loadCourses();
            else if (section === 'enrollments') loadEnrollments();
        });
    });
}

function switchSection(sectionName) {
    // Update active nav button
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
    
    // Update active section
    document.querySelectorAll('.section').forEach(section => section.classList.remove('active'));
    document.getElementById(sectionName).classList.add('active');
}

// Search functionality
function setupSearch() {
    document.getElementById('searchStudent').addEventListener('input', (e) => {
        filterTable('students', e.target.value);
    });
    
    document.getElementById('searchCourse').addEventListener('input', (e) => {
        filterTable('courses', e.target.value);
    });
    
    document.getElementById('searchEnrollment').addEventListener('input', (e) => {
        filterTable('enrollments', e.target.value);
    });
}

function filterTable(type, query) {
    const rows = document.querySelectorAll(`#${type}TableBody tr`);
    rows.forEach(row => {
        const text = row.textContent.toLowerCase();
        row.style.display = text.includes(query.toLowerCase()) ? '' : 'none';
    });
}

// Students CRUD
async function loadStudents() {
    try {
        const response = await fetch(`${API_URL}/students`);
        students = await response.json();
        renderStudents();
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการโหลดข้อมูลนักเรียน', 'error');
        console.error(error);
    }
}

function renderStudents() {
    const tbody = document.getElementById('studentsTableBody');
    
    if (students.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>ยังไม่มีข้อมูลนักเรียน</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = students.map(student => `
        <tr>
            <td data-label="ID">${student.id}</td>
            <td data-label="ชื่อ-นามสกุล">${student.fullname || student.name || '-'}</td>
            <td data-label="อีเมล">${student.email}</td>
            <td data-label="สาขา">${student.major || '-'}</td>
            <td data-label="วันที่สร้าง">${formatDate(student.created_at)}</td>
            <td data-label="จัดการ">
                <div class="action-buttons">
                    <button class="btn btn-success" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i> แก้ไข
                    </button>
                    <button class="btn btn-danger" onclick="deleteStudent(${student.id})">
                        <i class="fas fa-trash"></i> ลบ
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openStudentModal(id = null) {
    const modal = document.getElementById('studentModal');
    const form = document.getElementById('studentForm');
    const title = document.getElementById('studentModalTitle');
    
    form.reset();
    currentEditId = id;
    
    if (id) {
        title.textContent = 'แก้ไขข้อมูลนักเรียน';
        const student = students.find(s => s.id === id);
        if (student) {
            document.getElementById('studentId').value = student.id;
            document.getElementById('fullname').value = student.fullname || student.name;
            document.getElementById('email').value = student.email;
            document.getElementById('major').value = student.major || '';
        }
    } else {
        title.textContent = 'เพิ่มนักเรียนใหม่';
    }
    
    modal.classList.add('show');
}

function closeStudentModal() {
    document.getElementById('studentModal').classList.remove('show');
    currentEditId = null;
}

async function handleStudentSubmit(event) {
    event.preventDefault();
    
    const data = {
        fullname: document.getElementById('fullname').value,
        email: document.getElementById('email').value,
        major: document.getElementById('major').value
    };
    
    try {
        let response;
        if (currentEditId) {
            response = await fetch(`${API_URL}/students/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            response = await fetch(`${API_URL}/students`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        if (response.ok) {
            showToast(currentEditId ? 'แก้ไขข้อมูลสำเร็จ' : 'เพิ่มนักเรียนสำเร็จ', 'success');
            closeStudentModal();
            loadStudents();
        } else {
            showToast('เกิดข้อผิดพลาด', 'error');
        }
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
        console.error(error);
    }
}

function editStudent(id) {
    openStudentModal(id);
}

async function deleteStudent(id) {
    if (!confirm('คุณต้องการลบนักเรียนคนนี้หรือไม่?')) return;
    
    try {
        const response = await fetch(`${API_URL}/students/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('ลบนักเรียนสำเร็จ', 'success');
            loadStudents();
        } else {
            showToast('เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        }
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        console.error(error);
    }
}

// Courses CRUD
async function loadCourses() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        courses = await response.json();
        renderCourses();
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการโหลดข้อมูลคอร์ส', 'error');
        console.error(error);
    }
}

function renderCourses() {
    const tbody = document.getElementById('coursesTableBody');
    
    if (courses.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>ยังไม่มีข้อมูลคอร์สเรียน</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = courses.map(course => `
        <tr>
            <td data-label="ID">${course.id}</td>
            <td data-label="ชื่อวิชา">${course.name || course.title || '-'}</td>
            <td data-label="รายละเอียด">${course.description || '-'}</td>
            <td data-label="หน่วยกิต">${course.credit || '-'}</td>
            <td data-label="วันที่สร้าง">${formatDate(course.created_at)}</td>
            <td data-label="จัดการ">
                <div class="action-buttons">
                    <button class="btn btn-success" onclick="editCourse(${course.id})">
                        <i class="fas fa-edit"></i> แก้ไข
                    </button>
                    <button class="btn btn-danger" onclick="deleteCourse(${course.id})">
                        <i class="fas fa-trash"></i> ลบ
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function openCourseModal(id = null) {
    const modal = document.getElementById('courseModal');
    const form = document.getElementById('courseForm');
    const title = document.getElementById('courseModalTitle');
    
    form.reset();
    currentEditId = id;
    
    if (id) {
        title.textContent = 'แก้ไขข้อมูลคอร์ส';
        const course = courses.find(c => c.id === id);
        if (course) {
            document.getElementById('courseId').value = course.id;
            document.getElementById('courseName').value = course.name || course.title;
            document.getElementById('courseDescription').value = course.description || '';
            document.getElementById('credit').value = course.credit || '';
        }
    } else {
        title.textContent = 'เพิ่มคอร์สใหม่';
    }
    
    modal.classList.add('show');
}

function closeCourseModal() {
    document.getElementById('courseModal').classList.remove('show');
    currentEditId = null;
}

async function handleCourseSubmit(event) {
    event.preventDefault();
    
    const data = {
        name: document.getElementById('courseName').value,
        title: document.getElementById('courseName').value,
        description: document.getElementById('courseDescription').value,
        credit: parseInt(document.getElementById('credit').value)
    };
    
    try {
        let response;
        if (currentEditId) {
            response = await fetch(`${API_URL}/courses/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } else {
            response = await fetch(`${API_URL}/courses`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        }
        
        if (response.ok) {
            showToast(currentEditId ? 'แก้ไขข้อมูลสำเร็จ' : 'เพิ่มคอร์สสำเร็จ', 'success');
            closeCourseModal();
            loadCourses();
        } else {
            showToast('เกิดข้อผิดพลาด', 'error');
        }
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการบันทึกข้อมูล', 'error');
        console.error(error);
    }
}

function editCourse(id) {
    openCourseModal(id);
}

async function deleteCourse(id) {
    if (!confirm('คุณต้องการลบคอร์สนี้หรือไม่?')) return;
    
    try {
        const response = await fetch(`${API_URL}/courses/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('ลบคอร์สสำเร็จ', 'success');
            loadCourses();
        } else {
            showToast('เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        }
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการลบข้อมูล', 'error');
        console.error(error);
    }
}

// Enrollments CRUD
async function loadEnrollments() {
    try {
        const response = await fetch(`${API_URL}/enrollments`);
        enrollments = await response.json();
        
        // Load students and courses for dropdown
        await Promise.all([loadStudentsForDropdown(), loadCoursesForDropdown()]);
        
        renderEnrollments();
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการโหลดข้อมูลการลงทะเบียน', 'error');
        console.error(error);
    }
}

async function loadStudentsForDropdown() {
    try {
        const response = await fetch(`${API_URL}/students`);
        const data = await response.json();
        students = data;
    } catch (error) {
        console.error(error);
    }
}

async function loadCoursesForDropdown() {
    try {
        const response = await fetch(`${API_URL}/courses`);
        const data = await response.json();
        courses = data;
    } catch (error) {
        console.error(error);
    }
}

function renderEnrollments() {
    const tbody = document.getElementById('enrollmentsTableBody');
    
    if (enrollments.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="5" class="empty-state">
                    <i class="fas fa-inbox"></i>
                    <p>ยังไม่มีข้อมูลการลงทะเบียน</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tbody.innerHTML = enrollments.map(enrollment => {
        const student = students.find(s => s.id === enrollment.student_id);
        const course = courses.find(c => c.id === enrollment.course_id);
        
        return `
            <tr>
                <td data-label="ID">${enrollment.id}</td>
                <td data-label="ชื่อนักเรียน">${student ? (student.fullname || student.name) : 'ไม่ระบุ'}</td>
                <td data-label="ชื่อวิชา">${course ? (course.name || course.title) : 'ไม่ระบุ'}</td>
                <td data-label="วันที่ลงทะเบียน">${formatDate(enrollment.enrollment_date || enrollment.enrolled_at)}</td>
                <td data-label="จัดการ">
                    <button class="btn btn-danger" onclick="deleteEnrollment(${enrollment.id})">
                        <i class="fas fa-trash"></i> ยกเลิก
                    </button>
                </td>
            </tr>
        `;
    }).join('');
}

async function openEnrollmentModal() {
    const modal = document.getElementById('enrollmentModal');
    const studentSelect = document.getElementById('studentSelect');
    const courseSelect = document.getElementById('courseSelect');
    
    // Load data if not loaded
    if (students.length === 0) await loadStudentsForDropdown();
    if (courses.length === 0) await loadCoursesForDropdown();
    
    // Populate student select
    studentSelect.innerHTML = '<option value="">-- เลือกนักเรียน --</option>' +
        students.map(s => `<option value="${s.id}">${s.fullname || s.name} (${s.email})</option>`).join('');
    
    // Populate course select
    courseSelect.innerHTML = '<option value="">-- เลือกวิชา --</option>' +
        courses.map(c => `<option value="${c.id}">${c.name || c.title} (${c.credit} หน่วยกิต)</option>`).join('');
    
    modal.classList.add('show');
}

function closeEnrollmentModal() {
    document.getElementById('enrollmentModal').classList.remove('show');
}

async function handleEnrollmentSubmit(event) {
    event.preventDefault();
    
    const data = {
        student_id: parseInt(document.getElementById('studentSelect').value),
        course_id: parseInt(document.getElementById('courseSelect').value)
    };
    
    try {
        const response = await fetch(`${API_URL}/enrollments`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            showToast('ลงทะเบียนสำเร็จ', 'success');
            closeEnrollmentModal();
            loadEnrollments();
        } else {
            const error = await response.json();
            showToast(error.message || 'เกิดข้อผิดพลาด', 'error');
        }
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการลงทะเบียน', 'error');
        console.error(error);
    }
}

async function deleteEnrollment(id) {
    if (!confirm('คุณต้องการยกเลิกการลงทะเบียนนี้หรือไม่?')) return;
    
    try {
        const response = await fetch(`${API_URL}/enrollments/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            showToast('ยกเลิกการลงทะเบียนสำเร็จ', 'success');
            loadEnrollments();
        } else {
            showToast('เกิดข้อผิดพลาดในการยกเลิกการลงทะเบียน', 'error');
        }
    } catch (error) {
        showToast('เกิดข้อผิดพลาดในการยกเลิกการลงทะเบียน', 'error');
        console.error(error);
    }
}

// Utility functions
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const icon = type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle';
    
    toast.innerHTML = `<i class="fas ${icon}"></i> ${message}`;
    toast.className = `toast ${type} show`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Close modals when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.classList.remove('show');
    }
}
