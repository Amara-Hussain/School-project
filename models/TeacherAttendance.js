const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require('joi')
const { Teacher } = require("../models/Teacher");

const TeacherAttendance = sequelize.define("TeacherAttendance", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  admin: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attendance_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  teacher_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  present: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Teacher,
      key: "id",
    },
  },
});

function validateTeacherAttendance(teacher) {
  const schema = Joi.object({
    admin: Joi.string().required(),
    attendance_date: Joi.date().default(Date.now),
    teacher_name: Joi.string().required(),
    present: Joi.boolean().required(),
    teacherId: Joi.string().uuid().required()
  });
  return schema.validate(teacher);
}

TeacherAttendance.beforeCreate((teacherAttendance) => {
  teacherAttendance.id = uuidv4();
});

module.exports.TeacherAttendance = TeacherAttendance;
module.exports.validate = validateTeacherAttendance;
