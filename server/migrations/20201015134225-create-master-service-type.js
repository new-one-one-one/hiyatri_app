'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Master_Service_Type', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      value: {
        type: Sequelize.STRING
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
    return queryInterface.bulkInsert('Master_Service_Type', [{
      name: 'Personal',
      value: 0,
    },{
      name: 'Cab',
      value: 0,
    },{
      name: 'Porter',
      value: 0,
    },{
      name: 'Medium Bag',
      value: 1,
    },{
      name: 'Cab',
      value: 2,   },]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Master_Service_Type');
  }
};