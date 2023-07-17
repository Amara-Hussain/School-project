const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
const { Student} = require('../models/Student')


const StudentFees = sequelize.define("StudentFees", {
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
  student_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roll_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  month_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  monthly_fees: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  hostel_fees: {
    type: DataTypes.INTEGER,
  },
  laboratory_fees: {
    type: DataTypes.INTEGER,
  },
  computer_fees: {
    type: DataTypes.INTEGER,
  },
  exam_fees: {
    type: DataTypes.INTEGER,
  },
  student_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Student,
      key: "id",
    },
  },
});

function validateStudentFees(student) {
  const schema = Joi.object({
    admin: Joi.string().required(),
    student_name: Joi.string().required(),
    classname: Joi.string().required(),
    roll_no: Joi.string().required(),
    month_name: Joi.string().required(),
    year: Joi.string().required(),
    monthly_fees: Joi.number().integer().required(),
    hostel_fees: Joi.number().integer().allow(null),
    laboratory_fees: Joi.number().integer().allow(null),
    computer_fees: Joi.number().integer().allow(null),
    exam_fees: Joi.number().integer().allow(null),
    student_id: Joi.string().uuid().required(),
  });
  return schema.validate(student);
}

StudentFees.beforeCreate ((student)=>{
  student.id = uuidv4();
})

module.exports.StudentFees = StudentFees;
module.exports.validate = validateStudentFees;
