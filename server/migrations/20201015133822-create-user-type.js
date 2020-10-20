'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('User_Type', {
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
    return queryInterface.bulkInsert('User_Type', [{
      name: 'Admin',
      value: 'admin',
      del_flag: 0,
    },{
      name: 'Customer',
      value: 'customer',
      del_flag: 0,
    },{
      name: 'Agent',
      value: 'agent',
      del_flag: 0,
    }]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('User_Type');
  }
};