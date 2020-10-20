'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Booking_Passenger_Service_Mapping', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id: {
        type: Sequelize.INTEGER
      },
      booking_is: {
        type: Sequelize.STRING
      },
      passenger_id: {
        type: Sequelize.INTEGER
      },
      service_id: {
        type: Sequelize.INTEGER
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
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Booking_Passenger_Service_Mapping');
  }
};