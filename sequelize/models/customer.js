'use strict';
module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define('Customer', {
    name: DataTypes.STRING
  }, {});
  Customer.associate = function (models) {
    Customer.hasMany(models.Transaction, {
      foreignKey: 'customer_id',
      sourceKey: 'id',
      as: 'transactions',
      onDelete: 'CASCADE'
    })
  };
  return Customer;
};