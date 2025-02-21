'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert("Orders", [{
      userId: 1,
      inventoryId: 3,//jane smith's product of keyboard
      price: 50.0,
      status: "pending",
      quantity: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      inventoryId: 1,//john doe's product of laptop
      price: 1209.10,
      status: "accepted",
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      userId: 2,
      inventoryId: 2,//john doe's product of Monitor
      price: 300.5,
      status: "accepted",
      quantity: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }])


  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Orders", null, {})
  }
};
