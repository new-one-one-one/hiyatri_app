'use strict';
const { foreign_key } = require('inflection');
const Sequelize = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Booking_Passenger extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking_Passenger.hasMany(models.Booking_Passenger_Service_Mapping, {foreign_key: 'id'})
    }
  };
  Booking_Passenger.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    booking_id: Sequelize.STRING,
    age_group: Sequelize.TINYINT,
    gender: Sequelize.TINYINT,
    seat_number: Sequelize.STRING,
    del_flag: Sequelize.BOOLEAN,
    created_by: Sequelize.INTEGER,
    updated_by: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Booking_Passenger',
  });
  return Booking_Passenger;
};