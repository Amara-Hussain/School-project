const express = require('express');
const router = express.Router();
const { TeacherAttendance } = require('../models/TeacherAttendance');

// GET /teacherAttendance - Retrieve all teacher attendance records
router.get('/teacherAttendance', async (req, res) => {
  try {
    const teacherAttendance = await TeacherAttendance.findAll({
      where: { visible: true }, // Filter out records that should not be shown
    });
    res.send(teacherAttendance);
  } catch (error) {
    console.error('Error retrieving teacher attendance:', error);
    res.status(500).send('Internal server error');
  }
});

// POST /teacherAttendance - Create a new teacher attendance record
router.post('/teacherAttendance', async (req, res) => {
  try {
    const teacherAttendance = await TeacherAttendance.create(req.body);
    res.status(201).send(teacherAttendance);
  } catch (error) {
    console.error('Error creating teacher attendance:', error);
    res.status(500).send('Internal server error');
  }
});

// PUT /teacherAttendance/:id - Update a teacher attendance record by ID
router.put('/teacherAttendance/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await TeacherAttendance.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).send('Teacher attendance not found');
    }

    res.send('Teacher attendance updated successfully');
  } catch (error) {
    console.error('Error updating teacher attendance:', error);
    res.status(500).send('Internal server error');
  }
});

// DELETE /teacherAttendance/:id - Update the visibility of a teacher attendance record by ID
router.delete('/teacherAttendance/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await TeacherAttendance.update({ visible: false }, { where: { id } });
    res.send('Teacher attendance record hidden successfully');
  } catch (error) {
    console.error('Error hiding teacher attendance record:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
