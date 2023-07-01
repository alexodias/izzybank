'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      date: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      originAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'origin_account_id',
      },
      destinyAccountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        field: 'destiny_account_id',
      },
      originCpf: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'origin_cpf',
      },
      destinyCpf: {
        allowNull: false,
        type: Sequelize.STRING,
        field: 'destiny_cpf',
      },
      quantity: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
    });
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('Transactions')
  }
};
