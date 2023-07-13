const { DataTypes } = require("sequelize");
const sequelize  = require("../config/database");
const { v4: uuidv4 } = require("uuid");

const Timetable = sequelize.define('Timetable', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    unique: true,
  },
  day: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  classStartTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  classEndTime: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});

Timetable.beforeCreate((Timetable)=>{
    Timetable.id = uuidv4();
})

module.exports.Timetable = Timetable;
