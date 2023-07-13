const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const Class = sequelize.define("Class", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  grade: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    require: true,
  },
});

function validateClass(classobj) {
  const schema = Joi.object({
    name: Joi.string().required(),
    grade: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
  });
  return schema.validate(classobj);
}

Class.beforeCreate((classobj) => {
  classobj.id = uuidv4();
});

module.exports.Class = Class;
module.exports.validate = validateClass;
