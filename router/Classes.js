const express = require("express");
const router = express.Router();
const { Class } = require("../models/Class");
const { Student } = require("../models/Student");

router.get("/", async (req, res) => {
  try {
    const classes = await Class.findAll({
      where: { isActive: true }, // Filter out deleted records
    });
    res.send(classes);
  } catch (error) {
    console.error("Error getting classes:", error);
    res.status(500).send("Internal server error");
  }
});

// GET /api/classes/class9
router.get("/class9", async (req, res) => {
  try {
    const class9Records = await Class.findAll({
      where: {
        grade: "Class 9",
      },
    });
    res.send(class9Records);
  } catch (error) {
    res
      .status(500)
      .send({ error: "An error occurred while retrieving Class 9 records." });
  }
});

// get with the id
router.get("/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    const classObj = await Class.findOne({
      where: { id: classId, isActive: false }, // Filter out deleted record
    });

    if (!classObj) {
      return res.status(404).send("Class not found");
    }

    res.send(classObj);
  } catch (error) {
    console.error("Error getting class:", error);
    res.status(500).send("Internal server error");
  }
});

router.post("/", async (req, res) => {
  try {
    const classData = req.body;
    const newClass = await Class.create(classData);

    res.status(201).send(newClass);
  } catch (error) {
    console.error("Error creating class:", error);
    res.status(500).send("Internal server error");
  }
});

// Add a student to a class
router.post("/:classId/add-student", async (req, res) => {
  try {
    const classId = req.params.classId;
    const studentData = req.body;

    // Find the class
    const classObj = await Class.findAll(classId);
    if (!classObj) {
      return res.status(404).send("Class not found");
    }

    // Create a new student
    const student = await Student.create(studentData);

    // Add the student to the class
    await classObj.addStudent(student);

    res.status(201).send(student);
  } catch (error) {
    console.error("Error adding student to class:", error);
    res.status(500).send("Internal server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const classId = req.params.id;
    const classData = req.body;

    const classObj = await Class.findOne({
      where: { id: classId, isActive: true }, // Filter out deleted record
    });
    if (!classObj) {
      return res.status(404).send("Class not found");
    }

    await classObj.update(classData);

    res.send(classObj);
  } catch (error) {
    console.error("Error updating class:", error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const classId = req.params.id;

    const classObj = await Class.findOne({
      where: { id: classId, isDeleted: false }, // Filter out deleted record
    });
    if (!classObj) {
      return res.status(404).send("Class not found");
    }

    // Soft delete by setting isDeleted to true
    await classObj.update({ isDeleted: true });

    res.send("Class deleted successfully");
  } catch (error) {
    console.error("Error deleting class:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
