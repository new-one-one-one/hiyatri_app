'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking_Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking_Passenger.init({
    id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    booking_id: DataTypes.STRING,
    age_group: DataTypes.TINYINT,
    gender: DataTypes.TINYINT,
    seat_number: DataTypes.STRING,
    del_flag: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking_Passenger',
  });
  return Booking_Passenger;
};