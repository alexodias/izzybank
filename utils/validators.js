const validCpf = require('validar-cpf');

const isValidCpf = (cpf) => validCpf(cpf);

const isValidName = (name) => {
  const minCharacters = 8;
  if (name.length >= minCharacters) return true;
  return false;
};

const dateGenerator = () => {
  const date = new Date();
  const day = (date.getDate()).toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear();
  const hour = date.getHours();
  const min = date.getMinutes();
  const seg = date.getSeconds();
  return `${day}-${month}-${year} ${hour}:${min}:${seg}`;
};

module.exports = {
  isValidCpf,
  isValidName,
  dateGenerator,
};
