const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { NonTeachingStaff} = require('../models/NonTeachingStaff')
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const NonTeachingStaffSalary = sequelize.define("NonTeachingStaffSalary", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  admin: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  staff_name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  salaryForTheYear: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  salaryForTheMonth: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  salaryAmount: {
    type: DataTypes.FLOAT,
    allowNull: false,
    require: true,
  },
  staffId: {
    type: DataTypes.UUID,
    allowNull: false,
    require: true,
    references: {
      model: NonTeachingStaff,
      key: 'id',
    },
  },
});

function validateNonTeachingStaffSalary(salary) {
  const schema = Joi.object({
    admin: Joi.string().required(),
    staff_name: Joi.string().required(),
    salaryForTheYear: Joi.string().required(),
    salaryForTheMonth: Joi.string().required(),
    salaryAmount: Joi.number().required(),
    staffId: Joi.string().required(),
  });
  return schema.validate(salary);
}

NonTeachingStaffSalary.beforeCreate((salary) => {
  salary.id = uuidv4();
});

module.exports.NonTeachingStaffSalary = NonTeachingStaffSalary;
module.exports.validate = validateNonTeachingStaffSalary;
