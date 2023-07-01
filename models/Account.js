module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fullName: DataTypes.STRING,
    cpf: DataTypes.STRING,
    balance: DataTypes.DOUBLE,
  },
  {
    timestamps: false,
    tableName: 'Accounts',
    underscored: true,
  });

  return Account;
};
