const { Admin } = require("../models/Admin");
const { Student } = require("../models/Student");
const { Class } = require("../models/Class");
const { Teacher } = require("../models/Teacher");
const { TeacherSalary } = require("../models/TeacherSalary");
const { TeacherAttendance } = require("../models/TeacherAttendance");
const { StudentFees } = require("../models/StudentFees");
const { StudentAttendance } = require("../models/StudentAttendance");
const { NonTeachingStaff } = require("../models/NonTeachingStaff");
const { NonTeachingStaffSalary } = require("../models/NonTeachingStaffSalary");
const { NonTeachingStaffAttendance } = require("../models/NonTeachingStaffAttendance");

module.exports = function () {
  
  // Association between Student and StudentAttendance
  Student.hasMany(StudentAttendance, {foreignKey: "student_id",as: "studentAttendance_link_with_student" });
  StudentAttendance.belongsTo(Student, {foreignKey: "student_id",as: "student_link_with_studentAttendance"});
  
  // Association between Student and StudentFees
  Student.hasMany(StudentFees, {foreignKey: "student_id",as: "fees_link_with_student"});
  StudentFees.belongsTo(Student, {foreignKey: "student_id",as: "student_link_with_fees"});

  // Teacher associations with TeacherSalary
  Teacher.hasMany(TeacherSalary, { foreignKey: 'teacherId', as: 'salary_link_with_teacher' });
  TeacherSalary.belongsTo(Teacher, {foreignKey: "teacherId",as: "teacher_link_with_salary"});

  // Teacher associations with TeacherAttendance
  Teacher.hasMany(TeacherAttendance, { foreignKey: 'teacherId', as: 'attendance_link_with_teacher' });
  TeacherAttendance.belongsTo(Teacher, {foreignKey: "teacherId",as: "teacher_link_with_attendance"});


  

  // Admin associations
  //   Admin.hasMany(Student, { foreignKey: 'registered_by', as: 'student_link_with_admin' });
  //   Admin.hasMany(Teacher, { foreignKey: 'registered_by', as: 'teacher_link_with_admin' });
  //   Admin.hasMany(NonTeachingStaff, { foreignKey: 'registered_by', as: 'non_teaching_staff_link_with_admin' });

  // Student associations
  //   Student.belongsTo(Admin, { foreignKey: 'registered_by', as: 'admin_link_with_student' });
  //   Student.belongsTo(Class, { foreignKey: 'class_id', as: 'class_link_with_student' });
  //   Student.hasMany(StudentFees, { foreignKey: 'student_id', as: 'fees_link_with_student' });
  //   Student.hasMany(StudentAttendance, { foreignKey: 'student_id', as: 'attendance_link_with_student' });

  // Class associations
  //   Class.hasMany(Student, { foreignKey: 'class_id', as: 'students_link_with_class' });
  //   Student.belongsTo(Class, { foreignKey: 'class_id', as: 'class_link_with_students' });

  // Class and timetable association
  //   Class.hasMany(Timetable, { foreignKey: 'classId', as: 'class_link_with_timetable' });
  //   Timetable.belongsTo(Class, { foreignKey: 'classId', as: 'timetable_link_with_class' });

  // Teacher associations
  //   Teacher.belongsTo(Admin, { foreignKey: 'registered_by', as: 'admin_link_with_teacher' });

  // NonTeachingStaff associations
    NonTeachingStaff.hasMany(NonTeachingStaffSalary, { foreignKey: 'staffId', as: 'salaries_link_with_staff' });
    NonTeachingStaffSalary.belongsTo(NonTeachingStaff, { foreignKey: 'staffId', as: 'staff_link_with_salary' });
  
  
  //   NonTeachingStaff.hasMany(NonTeachingStaffAttendance, { foreignKey: 'staff_id', as: 'attendance_link_with_staffs' });
  //   NonTeachingStaff.belongsTo(Admin, { foreignKey: 'registered_by', as: 'admin_link_with_staff' });

  // NonTeachingStaffAttendance associations
  //   NonTeachingStaffAttendance.belongsTo(NonTeachingStaff, { foreignKey: 'staff_id', as: 'staff_link_with_attendances' });

  // NonTeachingStaffAttendance association
  //   NonTeachingStaff.hasMany(NonTeachingStaffAttendance, {foreignKey: "nonTeachingStaffAttendanceId",as: "attendance_link_with_staff" });
  //   NonTeachingStaffAttendance.belongsTo(NonTeachingStaff, {foreignKey: "nonTeachingStaffAttendanceId",as: "staff_link_with_attendance"});


  //  NonTeachingStaffAttendance.hasMany(Staff, {as: 'staffs_link_with_NonTeachingStaffAttendance', foreignKey: 'attendanceId'});
  //  Staff.belongsTo(NonTeachingStaffAttendance, {as: 'NonTeachingStaffAttendance_link_with_staff', foreignKey: 'attendanceId'});
  
};


