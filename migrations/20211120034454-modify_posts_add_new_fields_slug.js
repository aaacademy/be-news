"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn(
      "Posts", // table name
      "slug", // new field name
      {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Posts', 'slug')
  },
};
