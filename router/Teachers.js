const express = require('express');
const router = express.Router();
const { Teacher } = require('../models/Teacher');

// GET /teachers - Retrieve all teacher records
router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.findAll({attributes: { exclude: ["createdAt", "updatedAt"] },});
    res.send(teachers);
  } catch (error) {
    console.error('Error retrieving teachers:', error);
    res.status(500).send('Internal server error');
  }
});

// POST /teachers - Create a new teacher record
router.post('/', async (req, res) => {
  try {
    const teacher = await Teacher.create(req.body);
    res.status(201).send(teacher);
  } catch (error) {
    console.error('Error creating teacher:', error);
    res.status(500).send('Internal server error');
  }
});

// PUT /teachers/:id - Update a teacher record by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Teacher.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).send('Teacher not found');
    }

    res.send('Teacher updated successfully');
  } catch (error) {
    console.error('Error updating teacher:', error);
    res.status(500).send('Internal server error');
  }
});

// DELETE /teachers/:id - Delete a teacher record by ID
router.delete('/teachers/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await Teacher.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).send('Teacher not found');
    }

    res.send('Teacher deleted successfully');
  } catch (error) {
    console.error('Error deleting teacher:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
