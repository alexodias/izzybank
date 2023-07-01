const joi = require('joi');
const rescue = require('express-rescue');
const service = require('../services/accountServices');

const searchAccountById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const account = await service.searchAccountById(id);
  if (account.error) return next(account.error);
  return res.status(200).json(account);
});

const accountRegister = rescue(async (req, res, next) => {
  const { error } = joi.object({
    fullName: joi.string().required(),
    cpf: joi.string().required(),
    balance: joi.number(),
  }).validate(req.body);

  if (error) return next(error);

  const { fullName, cpf, balance } = req.body;

  const register = await service.accountRegister(fullName, cpf, balance || 0);
  if (register.error) return next(register.error);
  res.status(201).json(register);
});

const searchAccountByFullName = rescue(async (req, res, next) => {
  const { fullName } = req.params;
  const search = await service.searchAccountByFullName(fullName);
  if (search.error) return next(search.error);
  return res.status(200).json(search);
});

const getAllAccount = rescue(async (req, res, next) => {
  const getAll = await service.getAllAccount();
  if (getAll.error) return next(getAll.error);
  return res.status(200).json(getAll);
});

module.exports = {
  searchAccountById,
  accountRegister,
  searchAccountByFullName,
  getAllAccount,
};
