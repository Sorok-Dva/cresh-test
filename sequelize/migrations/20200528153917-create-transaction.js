'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Customers',
          key: 'id'
        }
      },
      store_name: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.INTEGER
      },
      split: {
        type: Sequelize.INTEGER
      },
      is_completed: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Transactions');
  }
};