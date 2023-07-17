const express = require("express");
const router = express.Router();
const { Student } = require("../models/Student");
const { StudentAttendance, validate } = require("../models/StudentAttendance");

// Get all student attendance records
router.get("/", async (req, res) => {
  try {
    const studentAttendances = await StudentAttendance.findAll({
      include: {
        model: Student,
        as: "student_link_with_studentAttendance",
        attributes: ["id", "student_name", "roll_no"], // Include only the desired attributes from the Student model
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "student_name"], // Exclude the specified fields from the StudentAttendance model
      },
    });
    res.send(studentAttendances);
  } catch (error) {
    console.error("Error retrieving student attendance records:", error);
    res.status(500).send("Internal server error");
  }
});

// router.post("/", async (req, res) => {
//   try {
//     const { date } = req.query; // Get the date from the query parameter

//     // Validate the date format if needed

//     const attendanceRecords = await StudentAttendance.findAll({
//       where: {
//         attendance_date: date, // Filter by the specified date
//       },
//     });

//     res.send(attendanceRecords);
//   } catch (error) {
//     console.error("Error retrieving attendance records:", error);
//     res.status(500).send("Internal server error");
//   }
// });

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const student = await Student.findOne({
      where: { id: req.body.student_id },
    });
    if (!student) return res.status(404).send("Student not found");

    const studentAttendance = await StudentAttendance.create({
      attendance_date: req.body.attendance_date,
      student_name: req.body.student_name,
      classname: req.body.classname,
      roll_no: req.body.roll_no,
      present: req.body.present,
      student_id: req.body.student_id,
    });

    res.status(201).send(studentAttendance);
  } catch (error) {
    console.error("Error creating student attendance record:", error);
    res.status(500).send("Internal server error");
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const studentAttendance = await StudentAttendance.update(req.body, {
      where: { id: req.params.id },
    });

    if (studentAttendance[0] === 0) {
      return res.status(404).send("Student attendance not found");
    }

    res.send("Student attendance updated successfully");
  } catch (error) {
    console.error("Error updating student attendance:", error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const studentAttendance = await StudentAttendance.destroy({
      where: { id: req.params.id },
    });

    if (studentAttendance === 0) {
      return res.status(404).send("Student attendance not found");
    }

    res.send("Student attendance deleted successfully");
  } catch (error) {
    console.error("Error deleting student attendance:", error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
