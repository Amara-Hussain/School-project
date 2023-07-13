const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const NonTeachingStaffAttendanceItem = sequelize.define(
  "NonTeachingStaffAttendanceItem",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    staffId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    staff_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    present: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }
);

function validateStaffAttendanceItem(classobj) {
  const schema = Joi.object({
    staffId: Joi.number().integer().required(),
    staff_name: Joi.string().required(),
    present: Joi.boolean().required(),
  });
  return schema.validate(classobj);
}

NonTeachingStaffAttendanceItem.beforeCreate((attendance) => {
  attendance.id = uuidv4();
});

module.exports.NonTeachingStaffAttendanceItem = NonTeachingStaffAttendanceItem;
module.exports.validate = validateStaffAttendanceItem;
