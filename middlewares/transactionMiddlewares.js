module.exports = (err, _req, res, next) => {
  if (err.isJoi) return res.status(400).json({ message: err.details[0].message });

  if (err.code === 'insuficientCash') {
    return res.status(401).json({ message: 'Cash not suficient' });
  }

  if (err.code === 'invalidCpf') {
    return res.status(401).json({ message: 'This CPF is invalid' });
  }

  if (err.code === 'limitTransfer') {
    return res.status(401).json({ message: 'Limit of tranferences is R$: 2000' });
  }
  
  return next(err);
};
