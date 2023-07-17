const { Admin } = require("../models/Admin");
const { Class } = require("../models/Class");
const { Student } = require("../models/Student");
const { StudentAttendance } = require("../models/StudentAttendance");
const { StudentFees } = require("../models/StudentFees");
const { Teacher } = require("../models/Teacher");
const { TeacherAttendance } = require("../models/TeacherAttendance");
const { TeacherSalary } = require("../models/TeacherSalary");
const { NonTeachingStaff } = require("../models/NonTeachingStaff");
const { NonTeachingStaffAttendance } = require("../models/NonTeachingStaffAttendance");
const { NonTeachingStaffSalary } = require("../models/NonTeachingStaffSalary");
const { StaffAttendance } = require("../models/StaffAttendance");
const {Timetable} = require("../models/Timetable")
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  //syncronize model with database
  try {
    await Admin.sync({ alert: true });
    await Class.sync({ alert: true });
    await Timetable.sync({alert:true});
    await Student.sync({ alert: true });
    await StudentFees.sync({ alert: true });
    await StudentAttendance.sync({ alert: true });
    await Teacher.sync({ alert: true });
    await TeacherSalary.sync({ alert: true });
    await TeacherAttendance.sync({ alert: true });
    await NonTeachingStaff.sync({ alert: true });
    await NonTeachingStaffSalary.sync({ alert: true });
    await NonTeachingStaffAttendance.sync({ alert: true });
    await StaffAttendance.sync({ alert: true });

    res.send("Succesfully create table in database");
  } catch (error) {
    console.error("Something Failed.....", error);
    res.status(500).send("Internal Server error:");
  }
});

module.exports = router;
