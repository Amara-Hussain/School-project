const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const Admin = sequelize.define("Admin", {
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
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    require: true,
  },
});

function validateAdmin(admin) {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    isAdmin: Joi.boolean().required(),
  });
  return schema.validate(admin);
}

Admin.beforeCreate((admin) => {
  admin.id = uuidv4();
});

module.exports.Admin = Admin;
module.exports.validate = validateAdmin;
