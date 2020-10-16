'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking_Passenger_Service_Mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking_Passenger_Service_Mapping.init({
    id: DataTypes.INTEGER,
    booking_is: DataTypes.STRING,
    passenger_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    value: DataTypes.STRING,
    del_flag: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Booking_Passenger_Service_Mapping',
  });
  return Booking_Passenger_Service_Mapping;
};