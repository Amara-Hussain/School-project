const express = require("express");
const router = express.Router();
const { NonTeachingStaff, validate } = require("../models/NonTeachingStaff");

// Get all non-teaching staff
router.get("/", async (req, res) => {
  try {
    const nonTeachingStaff = await NonTeachingStaff.findAll({attributes: { exclude: ["createdAt", "updatedAt"] },});
    res.send(nonTeachingStaff);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});

// Get a specific non-teaching staff member by ID
router.get("/:id", async (req, res) => {
    try {
      const nonTeachingStaff = await NonTeachingStaff.findOne({
        where: { id: req.params.id },
      });
      if (!nonTeachingStaff) {
        return res.status(404).send({ error: "Non-teaching staff not found" });
      }
      res.send(nonTeachingStaff);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });
  

// Create a new non-teaching staff member
router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      return res.status(400).send({ error: error.details[0].message });
    }

    const { staff_name, qualification, address, contact_no,
         gender, age, email, estimated_salary, experiance,work } = req.body;

    const nonTeachingStaff = await NonTeachingStaff.create({
      staff_name,qualification,address,contact_no,
      gender,age,email,
      estimated_salary,
      experiance,work,
    });

    res.status(201).send(nonTeachingStaff);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});


// Update a specific non-teaching staff member by ID
router.put("/:id", async (req, res) => {
    try {
      const { error } = validate(req.body);
      if (error) {
        return res.status(400).send({ error: error.details[0].message });
      }
  
      const nonTeachingStaff = await NonTeachingStaff.findOne({
        where: { id: req.params.id },
      });
      if (!nonTeachingStaff) {
        return res.status(404).send({ error: "Non-teaching staff not found" });
      }
  
      await nonTeachingStaff.update(req.body);
      res.send(nonTeachingStaff);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });
  
// Delete a specific non-teaching staff member by ID
router.delete("/:id", async (req, res) => {
    try {
      const nonTeachingStaff = await NonTeachingStaff.findOne({
        where: { id: req.params.id },
      });
      if (!nonTeachingStaff) {
        return res.status(404).send({ error: "Non-teaching staff not found" });
      }
  
      await nonTeachingStaff.destroy();
      res.send({ message: "Non-teaching staff deleted successfully" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  });
  

module.exports = router;
