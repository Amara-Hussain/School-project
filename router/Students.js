const express = require('express');
const router = express.Router();
const { Student } = require('../models/Student');

// Create a new student
router.post('/students', async (req, res) => {
  try {
    const student = await Student.create(req.body);
    res.status(201).send(student);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).send('Internal server error');
  }
});

// Get all students (without deleted records)
router.get('/students', async (req, res) => {
  try {
    const students = await Student.findAll({
      where: { isDeleted: false }, // Filter out deleted records
    });
    res.send(students);
  } catch (error) {
    console.error('Error retrieving students:', error);
    res.status(500).send('Internal server error');
  }
});

// Get a specific student by ID (without deleted records)
router.get('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id, isDeleted: false }, // Filter out deleted records
    });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.send(student);
  } catch (error) {
    console.error('Error retrieving student:', error);
    res.status(500).send('Internal server error');
  }
});

// Update a student by ID
router.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id, isDeleted: false }, // Filter out deleted records
    });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    await student.update(req.body);
    res.send(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).send('Internal server error');
  }
});

// Delete a student by ID (soft delete)
router.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOne({
      where: { id: req.params.id, isDeleted: false }, // Filter out deleted records
    });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    // Instead of deleting the record, update the "isDeleted" flag
    await student.update({ isDeleted: true });
    res.send('Student marked as deleted');
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
