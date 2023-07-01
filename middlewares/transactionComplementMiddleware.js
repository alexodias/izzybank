module.exports = (err, _req, res, _next) => {
  if (err.code === 'depositOnly') {
    return res.status(401).json({ message: 'Deposit Only!' });
  }
  
  return res.status(500).json({ message: 'Critical Error :(' });
};
