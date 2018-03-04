'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('Players', [
       { name: 'Arno', score: 4, createdAt: 'NOW()', updatedAt: 'NOW()' },
       { name: 'Mat', score: 5, createdAt: 'NOW()', updatedAt: 'NOW()' }
     ])
   },

  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
  }
};
