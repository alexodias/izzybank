const { Transaction } = require('../models');
const servicesAccount = require('./accountServices');
const { dateGenerator } = require('../utils/validators');

const maxTransferQuantity = 2000;

const cashTransference = async (originCpf, destinyCpf, quantity) => {
  const originAccount = await servicesAccount.searchAccountByCpf(originCpf);
  const destinyAccount = await servicesAccount.searchAccountByCpf(destinyCpf);
  if (quantity > maxTransferQuantity) {
    return ({ error: { code: 'limitTransfer' } });
  }
  if (originAccount && destinyAccount) {
    const transference = await servicesAccount.cashTransference(originCpf, destinyCpf, quantity);
    if (!transference.error) {
      return Transaction.create({
        date: dateGenerator(),
        originAccountId: originAccount.id,
        destinyAccountId: destinyAccount.id,
        originCpf: originAccount.cpf,
        destinyCpf: destinyAccount.cpf,
        quantity,
      });
    } return ({ error: { code: transference.error.code } });
  } return ({ error: { code: 'invalidCpf' } });
};

const cashDeposit = async (destinyCpf, quantity) => {
  if (quantity < 0) return ({ error: { code: 'depositOnly' } });
  if (quantity > maxTransferQuantity) return ({ error: { code: 'limitTransfer' } });
  const deposit = await servicesAccount.cashDeposit(destinyCpf, quantity);
  if (!deposit.error) {
    const destinyAccount = await servicesAccount.searchAccountByCpf(destinyCpf);
    return Transaction.create({
      date: dateGenerator(),
      originAccountId: 5050,
      destinyAccountId: destinyAccount.id,
      originCpf: 'DigitalRepublicBankCNPJ',
      destinyCpf: destinyAccount.cpf,
      quantity,
    });
  } return deposit;
};

const getAllTransference = async () => Transaction.findAll();

module.exports = {
  cashTransference,
  cashDeposit,
  getAllTransference,
};
