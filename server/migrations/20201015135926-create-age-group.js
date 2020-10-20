'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Age_Group', {
      id: {
        unique:true,
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
    return queryInterface.bulkInsert('Age_Group', [{
      name: '0-5',
      value: '0-5',
      del_flag: 0,
    },{
      name: '5-12',
      value: '0-5',
      del_flag: 0,
    },{
      name: '12-45',
      value: '12-45',
      del_flag: 0,
    },{
      name: '45-85',
      value: '45-85',
      del_flag: 0,
    },{
      name: '85 and above',
      value: '85 and above',
      del_flag: 0,
    },]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Age_Group');
  }
};