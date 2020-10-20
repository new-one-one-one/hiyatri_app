'use strict';
const Sequelize = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Booking_Passenger_Service_Mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking_Passenger_Service_Mapping.belongsTo(models.Booking_Passenger)
    }
  };
  Booking_Passenger_Service_Mapping.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    booking_is: Sequelize.STRING,
    passenger_id: Sequelize.INTEGER,
    service_id: Sequelize.INTEGER,
    value: Sequelize.STRING,
    del_flag: Sequelize.BOOLEAN,
    created_by: Sequelize.INTEGER,
    updated_by: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Booking_Passenger_Service_Mapping',
  });
  return Booking_Passenger_Service_Mapping;
};