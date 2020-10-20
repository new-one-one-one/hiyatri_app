'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Master_Service', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.TINYINT
      },
      price: {
        type: Sequelize.DECIMAL
      },
      del_flag: {
        type: Sequelize.BOOLEAN
      },
      created_by: {
        type: Sequelize.INTEGER
      },
      updated_by: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.fn('now'),
        type: Sequelize.DATE
      }
    });
    return queryInterface.bulkInsert('Master_Service', [{
      name: 'WheelChair',
      type: 0,
      price: 0,
      del_flag: 0,
    },{
      name: 'Golf Cart',
      type: 0,
      price: 0,
      del_flag: 0,
    },{
      name: 'Small Bag',
      type: 0,
      price: 0,
      del_flag: 0,
    },{
      name: 'Medium Bag',
      type: 0,
      price: 0,
      del_flag: 0,
    },{
      name: 'Large Bag',
      type: 0,
      price: 0,
      del_flag: 0,
    },{
      name: 'Cab',
      type: 0,
      price: 0,
      del_flag: 0,
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Master_Service');
  }
};