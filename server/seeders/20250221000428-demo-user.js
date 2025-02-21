'use strict';



const bcrypt = require("bcryptjs")
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
    return queryInterface.bulkInsert("Users", [{

      username: "john_doe",
      email: "john@example.com",
      hashedPassword: await bcrypt.hash("password123", 10),
      firstName: "John",
      lastName: "Doe",
      createdAt: new Date(),
      updatedAt: new Date(),

    }, {
      username: "jane_smith",
      email: "jane@example.com",
      hashedPassword: await bcrypt.hash("password123", 10),
      firstName: "Jane",
      lastName: "Smith",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    ])

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    return queryInterface.bulkDelete("Users", null, {})
  }
};
