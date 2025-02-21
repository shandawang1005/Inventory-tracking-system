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
    return queryInterface.bulkInsert("Inventory", [{
      name: "Laptop",
      quantity: 10,
      price: 1209.10,
      userId: 1,  // John Doe
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Monitor",
      quantity: 5,
      price: 300.5,
      userId: 1,  // John Doe
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: "KeyBoard",
      quantity: 20,
      price: 50.0,
      userId: 2,  // Jane Smith
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
    return queryInterface.bulkDelete("Inventory", null, {})
  }
};
