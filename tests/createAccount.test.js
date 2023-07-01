const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000';
const userName = 'Pernalonga Roedor';

describe('1 - A aplicação deve ter o endpoint POST `/account`', function () {
  beforeEach(function () {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
  });

  it('É possível cadastrar uma nova conta com sucesso', async function () {
    await frisby
      .post(`${url}/account`,
        {
          fullName: userName,
          cpf: '12368742697',
        })
      .expect('status', 201)
      .then((response) => {
        const { json } = response;
        expect(json.fullName).toBe(userName);
        expect(json.cpf).toBe('12368742697');
        expect(json.balance).toBe(0);
        expect(json.id).toBe(1);
      });
  });

  it('Não é possível cadastrar uma conta com o campo `fullName` menor que 8 caracteres',
   async function () {
    await frisby
      .post(`${url}/account`,
        {
          fullName: 'Perna',
          cpf: '12368742697',
        })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Invalid name or cpf');
      });
  });

  it('Não é possível cadastrar uma conta com o `cpf` inválido', async function () {
    await frisby
      .post(`${url}/account`,
        {
          fullName: 'Perna',
          cpf: '12345698745',
        })
      .expect('status', 401)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Invalid name or cpf');
      });
  });

  it('O campo `fullName` é obrigatório', async function () {
    await frisby
      .post(`${url}/account`,
        {
          cpf: '12368742697',
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"fullName" is required');
      });
  });

  it('O campo `cpf` é obrigatório', async function () {
    await frisby
      .post(`${url}/account`,
        {
          fullName: userName,
        })
      .expect('status', 400)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('"cpf" is required');
      });
  });

  it('Não é possível cadastrar uma conta já existente', async function () {
    await frisby
      .post(`${url}/account`,
        {
          fullName: userName,
          cpf: '12368742697',
        })
      .expect('status', 201);

    await frisby
      .post(`${url}/account`,
        {
          fullName: userName,
          cpf: '12368742697',
        })
      .expect('status', 409)
      .then((response) => {
        const { json } = response;
        expect(json.message).toBe('Account Already Exists');
      });
  });
});
