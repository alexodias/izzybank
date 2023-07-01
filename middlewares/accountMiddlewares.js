module.exports = (err, _req, res, _next) => {
  if (err.isJoi) return res.status(400).json({ message: err.details[0].message });

  if (err.code === 'invalidId') {
    return res.status(404).json({ message: 'Account not found' });
  }

  if (err.code === 'accountAlreadyExists') {
    return res.status(409).json({ message: 'Account Already Exists' });
  }

  if (err.code === 'invalidFields') {
    return res.status(401).json({ message: 'Invalid name or cpf' });
  }

  return res.status(500).json({ message: 'Critical Error :(' });
};
