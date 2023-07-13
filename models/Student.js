const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const Student = sequelize.define("Student", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  
  student_name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  classname: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  roll_no: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  parents_name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  contact_no: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  previous_dues: {
    type: DataTypes.INTEGER,
  },
  age: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  registration_fees: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
});

function validateStudent(student) {
  const schema = Joi.object({
    student_name: Joi.string().required(),
    classname: Joi.string().required(),
    roll_no: Joi.number().integer().required(),
    address: Joi.string().required(),
    parents_name: Joi.string().required(),
    contact_no: Joi.string().required(),
    gender: Joi.string().required(),
    previous_dues: Joi.number().integer(),
    age: Joi.string().required(),
    email: Joi.string().email().required(),
    registration_fees: Joi.number().integer().required(),
  });
  return schema.validate(student);
}

Student.beforeCreate((student) => {
  student.id = uuidv4();
});

module.exports.Student = Student;
module.exports.validate = validateStudent;
