const express = require("express");
const router = express.Router();
const {
  NonTeachingStaffAttendance,
  validate,
} = require("../models/NonTeachingStaffAttendance");

// Get all non-teaching staff attendances
router.get("/", async (req, res) => {
  try {
    const attendances = await NonTeachingStaffAttendance.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] },
    });
    res.json(attendances);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get a specific non-teaching staff attendance by ID
router.get("/:id", async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const attendance = await NonTeachingStaffAttendance.findOne(attendanceId);
    if (!attendance) {
      res.status(404).json({ error: "Attendance not found" });
    } else {
      res.json(attendance);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create a new non-teaching staff attendance
router.post("/", async (req, res) => {
  // Validate the request body
  try {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    }

    const { admin, attendance_date } = req.body;
    const newAttendance = await NonTeachingStaffAttendance.create({
      admin,
      attendance_date,
    });
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update a specific non-teaching staff attendance
router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
    }

    const { admin, attendance_date } = req.body;
    const [rowsUpdated] = await NonTeachingStaffAttendance.update(
      { admin, attendance_date },
      {
        where: { id: attendanceId },
        returning: true,
      }
    );
    if (rowsUpdated === 0) {
      res.status(404).json({ error: "Attendance not found" });
    } else {
      const updatedAttendance = await NonTeachingStaffAttendance.findByPk(
        attendanceId
      );
      res.json(updatedAttendance);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Delete a specific non-teaching staff attendance
router.delete("/:id", async (req, res) => {
  try {
    const attendanceId = req.params.id;
    const rowsDeleted = await NonTeachingStaffAttendance.destroy({
      where: { id: attendanceId },
    });
    if (rowsDeleted === 0) {
      res.status(404).json({ error: "Attendance not found" });
    } else {
      res.json({ message: "Attendance deleted successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
