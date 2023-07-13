const express = require('express');
const router = express.Router();
const { Admin } = require('../models/Admin');

// GET /admin - Retrieve all admin records
router.get('/', async (req, res) => {
  try {
    const admins = await Admin.findAll({
      where: { isAdmin: true }, 
      attributes: { exclude: ['password'] }, 
    });
    res.send(admins);
  } catch (error) {
    console.error('Error retrieving admins:', error);
    res.status(500).send('Internal server error');
  }
});

// POST /admin - Create a new admin record
router.post('/', async (req, res) => {
  try {
    const admin = await Admin.create(req.body);
    res.status(201).send(admin);
  } catch (error) {
    console.error('Error creating admin:', error);
    res.status(500).send('Internal server error');
  }
});

// PUT /admin/:id - Update an admin record by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [updatedRows] = await Admin.update(req.body, {
      where: { id },
    });

    if (updatedRows === 0) {
      return res.status(404).send('Admin not found');
    }

    res.send('Admin updated successfully');
  } catch (error) {
    console.error('Error updating admin:', error);
    res.status(500).send('Internal server error');
  }
});

// DELETE /admin/:id - Update the visibility of an admin record by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Admin.update({ isAdmin: false }, { where: { id } });
    res.send('Admin record hidden successfully');
  } catch (error) {
    console.error('Error hiding admin record:', error);
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
