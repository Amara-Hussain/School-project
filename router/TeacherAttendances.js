const express = require("express");
const router = express.Router();
const {TeacherAttendance,validate} = require("../models/TeacherAttendance");
const { Teacher } = require("../models/Teacher");

// GET all teacher attendances
router.get("/", async (req, res) => {
  try {
    const teacherAttendances = await TeacherAttendance.findAll();
    res.send(teacherAttendances);
  } catch (error) {
    console.error("Error retrieving teacher attendances:", error);
    res.status(500).send("Internal server error");
  }
});

// GET a specific teacher attendance by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const teacherAttendance = await TeacherAttendance.findOne({
//       where: { id: req.params.id },
//     });

//     if (!teacherAttendance) {
//       return res.status(404).send("Teacher attendance not found");
//     }

//     res.send(teacherAttendance);
//   } catch (error) {
//     console.error("Error retrieving teacher attendance:", error);
//     res.status(500).send("Internal server error");
//   }
// });

// POST a new teacher attendance

router.get('/teacher-attendances', async (req, res) => {
  try {
    const teacherAttendances = await TeacherAttendance.findAll({
      include: {
        model: Teacher,
        as: 'teacher_link_with_attendance',
        attributes: ['id', 'teacher_name'], // Include only the desired attributes from the Teacher model
      },
      attributes: {
        exclude: ['createdAt', 'updatedAt','teacherId'], // Exclude the specified fields from the TeacherSalary model
      },
    });
    res.send(teacherAttendances);
  } catch (error) {
    console.error('Error retrieving teacher attendances:', error);
    res.status(500).send('Internal server error');
  }
});


router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) { res.status(400).send(error.details[0].message)}

    // Check if the teacher exists
    const teacher = await Teacher.findOne({ where: { id: req.body.teacherId } });
    if (!teacher) {
      return res.status(404).send("Teacher not found");
    }

    // Create the teacher attendance record
    const teacherAttendance = await TeacherAttendance.create({
      admin: req.body.admin,
      attendance_date: req.body.attendance_date,
      teacher_name: req.body.teacher_name,
      present: req.body.present,
      teacherId: req.body.teacherId,
    });

    res.status(201).send(teacherAttendance);
  } catch (error) {
    console.error("Error creating teacher attendance:", error);
    res.status(500).send("Internal server error");
  }
});

// PUT update a teacher attendance
router.put("/:id", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) {return res.status(400).send(error.details[0].message)}

    // Check if the teacher attendance exists
    const teacherAttendance = await TeacherAttendance.findOne({
      where: { id: req.params.id },
    });
    if (!teacherAttendance) {
      return res.status(404).send("Teacher attendance not found");
    }

    // Update the teacher attendance record
    await teacherAttendance.update({
      admin: req.body.admin,
      attendance_date: req.body.attendance_date,
      teacher_name: req.body.teacher_name,
      present: req.body.present,
      teacherId: req.body.teacherId,
    });

    res.send(teacherAttendance);
  } catch (error) {
    console.error("Error updating teacher attendance:", error);
    res.status(500).send("Internal server error");
  }
});

// DELETE a teacher attendance
router.delete("/:id", async (req, res) => {
  try {
    // Check if the teacher attendance exists
    const teacherAttendance = await TeacherAttendance.findOne({
      where: { id: req.params.id },
    });
    if (!teacherAttendance) {
      return res.status(404).send("Teacher attendance not found");
    }

    // Delete the teacher attendance record
    await teacherAttendance.destroy();

    res.send("Teacher attendance deleted successfully");
  } catch (error) {
    console.error("Error deleting teacher attendance:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
