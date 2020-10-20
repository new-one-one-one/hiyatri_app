'use strict';
const Sequelize = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Booking_Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Booking_Status.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    value: Sequelize.STRING,
    del_flag: Sequelize.BOOLEAN,
    created_by: Sequelize.INTEGER,
    updated_by: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Booking_Status',
  });
  return Booking_Status;
};