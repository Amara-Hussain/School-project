const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const StudentAttendance = sequelize.define("StudentAttendance", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  class_teacher: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attendance_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  student_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roll_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  present: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false,
  },
});

function validateAttendance(student) {
  const schema = Joi.object({
    class_teacher: Joi.string().required(),
    attendance_date: Joi.date().default(Date.now),
    student_name: Joi.string().required(),
    classname: Joi.string().required(),
    roll_no: Joi.number().integer().required(),
    present: Joi.boolean().required(),
  });
  return schema.validate(student);
}

StudentAttendance.beforeCreate((student) => {
  student.id = uuidv4();
});

module.exports.StudentAttendance = StudentAttendance;
module.exports.validate = validateAttendance;
