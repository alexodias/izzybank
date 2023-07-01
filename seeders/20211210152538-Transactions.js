'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert('Transactions',
      [
        {
          date: '10/12/21',
          origin_account_id: '2',
          destiny_account_id: '4',
          origin_cpf: '31882558724',
          destiny_cpf: '45913389230',
          quantity: 100,
        },
        {
          date: '11/12/21',
          origin_account_id: '4',
          destiny_account_id: '2',
          origin_cpf: '45913389230',
          destiny_cpf: '31882558724',
          quantity: 150,
        },
      ],
      {},
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('Transactions', null, {});
  },
};
