'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking.init({
    id: DataTypes.INTEGER,
    booking_id: DataTypes.STRING,
    booking_name: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    assignee_id: DataTypes.INTEGER,
    PNR: DataTypes.STRING,
    status: DataTypes.STRING,
    is_arrival: DataTypes.BOOLEAN,
    secondary_mobile_number: DataTypes.INTEGER,
    del_flag: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};