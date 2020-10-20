'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gender', {
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
    return queryInterface.bulkInsert('Gender', [{
      name: 'Male',
      value: 'male',
    },{
      name: 'Female',
      value: 'female',
    },{
      name: 'Other',
      value: 'other',
    },]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Gender');
  }
};