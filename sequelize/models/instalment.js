'use strict';
module.exports = (sequelize, DataTypes) => {
  const Instalment = sequelize.define('Instalment', {
    transaction_id: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
    is_paid: DataTypes.BOOLEAN,
    planned_date: DataTypes.DATE,
    paid_date: DataTypes.DATE
  }, {});
  Instalment.associate = function(models) {
    // associations can be defined here
  };
  return Instalment;
};