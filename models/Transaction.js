module.exports = (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    date: DataTypes.STRING,
    originAccountId: DataTypes.INTEGER,
    destinyAccountId: DataTypes.INTEGER,
    originCpf: DataTypes.STRING,
    destinyCpf: DataTypes.STRING,
    quantity: DataTypes.DOUBLE,
  },
  {
    timestamps: false,
    tableName: 'Transactions',
    underscored: true,
  });

  return Transaction;
};
