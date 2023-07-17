const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const TeacherSalary = sequelize.define("TeacherSalary", {
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
  teacher_name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  teacherId: {
    type: DataTypes.UUID,
    allowNull: false,
    require: true,
    references: {
      model: 'Teacher', // Assuming you have a Teacher model defined
      key: 'id',
    },
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
    type: DataTypes.INTEGER, 
    allowNull: false,
    require: true,
  },
});

function validateTeacherSalary(teacher) {
  const schema = Joi.object({
    admin: Joi.string().required(),
    attendance_date: Joi.date().default(Date.now),
    teacher_name: Joi.string().required(),
    present: Joi.boolean().required(),
    teacherId: Joi.string().uuid().required()
  });
  return schema.validate(teacher);
}

TeacherSalary.beforeCreate((salary) => {
  salary.id = uuidv4();
});

module.exports.TeacherSalary = TeacherSalary;
module.exports.validate = validateTeacherSalary;
