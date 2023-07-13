const { Admin } = require('../models/Admin');
const { Student } = require('../models/Student');
const { Class } = require('../models/Class');
const { Teacher } = require('../models/Teacher');
const { TeacherSalary } = require('../models/TeacherSalary');
const { TeacherAttendance } = require('../models/TeacherAttendance');
const { StudentFees } = require('../models/StudentFees');
const { StudentAttendance } = require('../models/StudentAttendance');
const { NonTeachingStaff } = require('../models/NonTeachingStaff');
const { NonTeachingStaffSalary } = require('../models/NonTeachingStaffSalary');
const { NonTeachingStaffAttendance } = require("../models/NonTeachingStaffAttendance");

module.exports = function () {
  // NonTeachingStaffAttendance association
//   NonTeachingStaff.hasMany(NonTeachingStaffAttendance, {foreignKey: "nonTeachingStaffAttendanceId",as: "attendance_link_with_staff" });
//   NonTeachingStaffAttendance.belongsTo(NonTeachingStaff, {foreignKey: "nonTeachingStaffAttendanceId",as: "staff_link_with_attendance"});
  
//   // Admin associations
//   Admin.hasMany(Student, { foreignKey: 'registered_by', as: 'student_link_with_admin' });
//   Admin.hasMany(Teacher, { foreignKey: 'registered_by', as: 'teacher_link_with_admin' });
//   Admin.hasMany(NonTeachingStaff, { foreignKey: 'registered_by', as: 'non_teaching_staff_link_with_admin' });

// // Student associations
// Student.belongsTo(Admin, { foreignKey: 'registered_by', as: 'admin_link_with_student' });
// Student.belongsTo(Class, { foreignKey: 'class_id', as: 'class_link_with_student' });
// Student.hasMany(StudentFees, { foreignKey: 'student_id', as: 'fees_link_with_student' });
// Student.hasMany(StudentAttendance, { foreignKey: 'student_id', as: 'attendance_link_with_student' });

//   // Class associations
//   Class.hasMany(Student, { foreignKey: 'class_id', as: 'students_link_with_class' });
//   Student.belongsTo(Class, { foreignKey: 'class_id', as: 'class_link_with_students' });

//   // Teacher associations
//   Teacher.hasMany(TeacherSalary, { foreignKey: 'teacher_id', as: 'salaries_link_with_teacher' });
//   Teacher.hasMany(TeacherAttendance, { foreignKey: 'teacher_id', as: 'attendance_link_with_teacher' });
//   Teacher.belongsTo(Admin, { foreignKey: 'registered_by', as: 'admin_link_with_teacher' });

//   // TeacherSalary associations
//   TeacherSalary.belongsTo(Teacher, { foreignKey: 'teacher_id', as: 'teacher_link_with_salary' });

//   // TeacherAttendance associations
//   TeacherAttendance.belongsTo(Teacher, { foreignKey: 'teacher_id', as: 'teacher_link_with_attendance' });

//   // StudentFees associations
//   StudentFees.belongsTo(Student, { foreignKey: 'student_id', as: 'student_link_with_fees' });

//   // StudentAttendance associations
//   StudentAttendance.belongsTo(Student, { foreignKey: 'student_id', as: 'student_link_with_attendance' });

//   // NonTeachingStaff associations
//   NonTeachingStaff.hasMany(NonTeachingStaffSalary, { foreignKey: 'staff_id', as: 'salaries_link_with_staff' });
//   NonTeachingStaff.hasMany(NonTeachingStaffAttendance, { foreignKey: 'staff_id', as: 'attendance_link_with_staffs' });
//   NonTeachingStaff.belongsTo(Admin, { foreignKey: 'registered_by', as: 'admin_link_with_staff' });

//   // NonTeachingStaffSalary associations
//   NonTeachingStaffSalary.belongsTo(NonTeachingStaff, { foreignKey: 'staff_id', as: 'staff_link_with_salary' });

//   // NonTeachingStaffAttendance associations
 // NonTeachingStaffAttendance.belongsTo(NonTeachingStaff, { foreignKey: 'staff_id', as: 'staff_link_with_attendances' });
};
