const { DataTypes } = require("sequelize");
const  sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const NonTeachingStaff = sequelize.define("NonTeachingStaff", {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
    unique: true,
  },
  staff_name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  qualification: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  address: {
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
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  estimated_salary: {
    type: DataTypes.INTEGER,
    allowNull: false,
    require: true,
  },
  experiance: {
    type: DataTypes.STRING,
    allowNull: true,
    require: true,
  },
  work: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

function validateNonTeachingStaff(staff) {
  const schema = Joi.object({
    staff_name: Joi.string().required(),
    qualification: Joi.string().required(),
    address: Joi.string().required(),
    contact_no: Joi.string().required(),
    gender: Joi.string().required(),
    age: Joi.number().integer().required(),
    email: Joi.string().email().required(),
    estimated_salary: Joi.number().integer().required(),
    experiance: Joi.string().required(),
    work: Joi.string().required(),
  });
  return schema.validate(staff);
}

NonTeachingStaff.beforeCreate((teachingStaff) => {
  teachingStaff.id = uuidv4();
});

module.exports.NonTeachingStaff = NonTeachingStaff;
module.exports.validate = validateNonTeachingStaff;

