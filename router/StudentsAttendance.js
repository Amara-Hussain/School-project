const express = require('express');
const router = express.Router();
const { StudentAttendance } = require('../models/StudentAttendance');

// Create a new student attendance record
router.post('/student-attendance', async (req, res) => {
  try {
    const { class_teacher, classname, students } = req.body;

    // Create the main student attendance record
    const studentAttendance = await StudentAttendance.create({
      class_teacher,
      classname,
    });

    // Create the student attendance details (students)
    const studentAttendanceStudents = await StudentAttendanceStudent.bulkCreate(students.map(student => ({
      student_name: student.student_name,
      classname: student.classname,
      roll_no: student.roll_no,
      present: student.present,
      StudentAttendanceId: studentAttendance.id, // Associate with the main student attendance record
    })));

    // Associate the student attendance details with the main student attendance record
    await studentAttendance.addStudentAttendanceStudents(studentAttendanceStudents);

    res.status(201).send(studentAttendance);
  } catch (error) {
    console.error('Error creating student attendance:', error);
    res.status(500).send('Internal server error');
  }
});

// Get all student attendance records
router.get('/student-attendance', async (req, res) => {
  try {
    const studentAttendances = await StudentAttendance.findAll({
      include: [{ model: StudentAttendanceStudent }],
    });

    res.send(studentAttendances);
  } catch (error) {
    console.error('Error retrieving student attendance:', error);
    res.status(500).send('Internal server error');
  }
});

// Get a specific student attendance record by ID
router.get('/student-attendance/:id', async (req, res) => {
  try {
    const studentAttendance = await StudentAttendance.findOne({
      where: { id: req.params.id },
      include: [{ model: StudentAttendanceStudent }],
    });

    if (!studentAttendance) {
      return res.status(404).send('Student attendance not found');
    }

    res.send(studentAttendance);
  } catch (error) {
    console.error('Error retrieving student attendance:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
