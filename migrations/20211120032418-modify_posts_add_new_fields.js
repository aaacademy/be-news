"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Posts", // table name
      "author", // new field name
      {
        type: Sequelize.INTEGER,
        allowNull: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'author')
  },
};
