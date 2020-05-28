'use strict';
module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    customer_id: DataTypes.INTEGER,
    store_name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    split: DataTypes.INTEGER,
    is_completed: DataTypes.BOOLEAN
  }, {});
  Transaction.associate = function(models) {
    Transaction.hasMany(models.Instalment, {
      foreignKey: 'transaction_id',
      sourceKey: 'id',
      as: 'instalments',
      onDelete: 'CASCADE'
    })
  };
  return Transaction;
};