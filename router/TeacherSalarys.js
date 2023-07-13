const express = require('express');
const router = express.Router();
const { TeacherSalary } = require('../models/TeacherSalary');

// GET /teacherSalary - Retrieve all teacher salary records
router.get('/teacherSalary', async (req, res) => {
  try {
    const teacherSalaries = await TeacherSalary.findAll({
      where: { visible: true }, // Filter out records that should not be shown
    });
    res.send(teacherSalaries);
  } catch (error) {
    console.error('Error retrieving teacher salaries:', error);
    res.status(500).send('Internal server error');
  }
});

// POST /teacherSalary - Create a new teacher salary record
router.post('/teacherSalary', async (req, res) => {
  try {
    const teacherSalary = await TeacherSalary.create(req.body);
    res.status(201).send(teacherSalary);
  } catch (error) {
    console.error('Error creating teacher salary:', error);
    res.status(500).send('Internal server error');
  }
});

// PUT /teacherSalary/:id - Update a teacher salary record by ID
router.put('/teacherSalary/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await TeacherSalary.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).send('Teacher salary not found');
    }

    res.send('Teacher salary updated successfully');
  } catch (error) {
    console.error('Error updating teacher salary:', error);
    res.status(500).send('Internal server error');
  }
});

// DELETE /teacherSalary/:id - Update the visibility of a teacher salary record by ID
router.delete('/teacherSalary/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await TeacherSalary.update({ visible: false }, { where: { id } });
    res.send('Teacher salary record hidden successfully');
  } catch (error) {
    console.error('Error hiding teacher salary record:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
