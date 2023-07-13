const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const Teacher = sequelize.define("Teacher", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  teacher_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  teacherId: {
    type: DataTypes.INTEGER,
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contact_no: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  previous_school: {
    type: DataTypes.STRING,
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estimated_salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subjectToTeach: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

function validateTeacher(teacher) {
  const schema = Joi.object({
    teacher_name: Joi.string().required(),
    teacherId: Joi.number().integer().allow(null),
    qualification: Joi.string().required(),
    address: Joi.string().required(),
    contact_no: Joi.string().required(),
    gender: Joi.string().required(),
    previous_school: Joi.string().allow(null),
    age: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    estimated_salary: Joi.number().integer().required(),
    subjectToTeach: Joi.string().required(),
  });
  return schema.validate(teacher);
}

Teacher.beforeCreate((teacher) => {
  teacher.id = uuidv4();
});

module.exports.Teacher = Teacher;
module.exports.validate = validateTeacher;
