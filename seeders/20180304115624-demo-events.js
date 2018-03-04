'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Events', [
      { id: 1, title: 'Going to the park', startDate: '2018-06-03 09:00:00', endDate: '2018-06-04 08:00', description: 'Walking the dogs.' },
      { id: 2, title: 'Visiting grandma', startDate: '2019-02-11 09:30:00', endDate: '2019-02-12 18:00', description: 'Watching tv with grandma.' }
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Events', null, {});
  }
};
