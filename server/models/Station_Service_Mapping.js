'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Station_Service_Mapping extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Station_Service_Mapping.init({
    id: DataTypes.INTEGER,
    station_id: DataTypes.INTEGER,
    service_id: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    del_flag: DataTypes.BOOLEAN,
    created_by: DataTypes.INTEGER,
    updated_by: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Station_Service_Mapping',
  });
  return Station_Service_Mapping;
};