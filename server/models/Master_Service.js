'use strict';
const Sequelize = require('sequelize')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Master_Service extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Master_Service.init({
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: Sequelize.STRING,
    type: Sequelize.TINYINT,
    price: Sequelize.DECIMAL,
    del_flag: Sequelize.BOOLEAN,
    created_by: Sequelize.INTEGER,
    updated_by: Sequelize.INTEGER
  }, {
    sequelize,
    modelName: 'Master_Service',
  });
  return Master_Service;
};