const joi = require('joi');
const rescue = require('express-rescue');
const service = require('../services/transactionServices');

const cashTranference = rescue(async (req, res, next) => {
  const { error } = joi.object({
    originCpf: joi.string().required(),
    destinyCpf: joi.string().required(),
    quantity: joi.number(),
  }).validate(req.body);

  if (error) return next(error);
  const { originCpf, destinyCpf, quantity } = req.body;

  const transference = await service.cashTransference(originCpf, destinyCpf, quantity);
  if (transference.error) return next(transference.error);
  return res.status(200).json(transference);
});

const cashDeposit = rescue(async (req, res, next) => {
  const { error } = joi.object({
    destinyCpf: joi.string().required(),
    quantity: joi.number(),
  }).validate(req.body);

  if (error) return next(error);
  const { destinyCpf, quantity } = req.body;

  const deposit = await service.cashDeposit(destinyCpf, quantity);
  if (deposit.error) return next(deposit.error);
  res.status(200).json(deposit);
});

const getAllTransactions = rescue(async (req, res, next) => {
  const getAll = await service.getAllTransference();
  if (getAll.error) return next(getAll.error);
  return res.status(200).json(getAll);
});

module.exports = {
  cashTranference,
  cashDeposit,
  getAllTransactions,
};
