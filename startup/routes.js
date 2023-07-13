const admin = require("../router/Admin");
const classes = require("../router/Classes");
const timetable = require('../router/Timetables')
const student = require("../router/Students");
const studentAttendance = require("../router/StudentsAttendance");
const studentFees = require("../router/Students");
const teacher = require("../router/Teachers");
const teacherAttendance = require("../router/TeacherAttendances");
const teacherSalary = require("../router/TeacherSalarys");
const sync = require("../router/sync");

const express = require("express");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/admin", admin);
  app.use("/api/classes", classes);
  app.use('/api/timetable',timetable)
  app.use("/api/student", student);
  app.use("/api/studentAttendance", studentAttendance);
  app.use("/api/studentfees", studentFees);
  app.use("/api/teacher", teacher);
  app.use("/api/teacherAttendance", teacherAttendance);
  app.use("/api/teacherSalary", teacherSalary);
  app.use("/api/sync", sync);
};
