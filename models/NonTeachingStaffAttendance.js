const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const NonTeachingStaffAttendance = sequelize.define(
  "NonTeachingStaffAttendance",
  {
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
  }
);

function validateTeacherAttendance(classobj) {
  const schema = Joi.object({
    admin: Joi.string().required(),
    attendance_date: Joi.date().required(),
  });
  return schema.validate(classobj);
}

NonTeachingStaffAttendance.beforeCreate((attendance) => {
  attendance.id = uuidv4();
});

module.exports.NonTeachingStaffAttendance = NonTeachingStaffAttendance;
module.exports.validate = validateTeacherAttendance;
