const express = require('express');
const router = express.Router();
const { StudentFees } = require('../models/StudentFees');

// GET /student-fees - Retrieve all student fees records
router.get('/student-fees', async (req, res) => {
  try {
    const studentFees = await StudentFees.findAll();
    res.send(studentFees);
  } catch (error) {
    console.error('Error retrieving student fees:', error);
    res.status(500).send('Internal server error');
  }
});

// POST /student-fees - Create a new student fees record
router.post('/student-fees', async (req, res) => {
  try {
    const studentFees = await StudentFees.create(req.body);
    res.status(201).send(studentFees);
  } catch (error) {
    console.error('Error creating student fees:', error);
    res.status(500).send('Internal server error');
  }
});

// PUT /student-fees/:id - Update a student fees record by ID
router.put('/student-fees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await StudentFees.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).send('Student fees not found');
    }

    res.send('Student fees updated successfully');
  } catch (error) {
    console.error('Error updating student fees:', error);
    res.status(500).send('Internal server error');
  }
});

// DELETE /student-fees/:id - Delete a student fees record by ID
router.delete('/student-fees/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedRows = await StudentFees.destroy({ where: { id } });

    if (deletedRows === 0) {
      return res.status(404).send('Student fees not found');
    }

    res.send('Student fees deleted successfully');
  } catch (error) {
    console.error('Error deleting student fees:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
