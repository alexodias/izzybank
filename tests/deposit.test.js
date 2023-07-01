const frisby = require('frisby');
const shell = require('shelljs');

const url = 'http://localhost:3000/transaction';
const accoutUrl = 'http://localhost:3000/account';
const destinyCpf = '12368742697';
const userName = 'Pernalonga Roedor';

describe('1 - A aplicação deve ter o endpoint POST `/transaction/deposit`', function () {
  beforeEach(function () {
    shell.exec('npx sequelize-cli db:drop');
    shell.exec('npx sequelize-cli db:create && npx sequelize-cli db:migrate');
    shell.exec('npx sequelize-cli db:seed:all');
  });

  it('É possível fazer um depósito com sucesso', async function () {
    await frisby
      .post(`${url}/deposit`,
        {
          destinyCpf,
          quantity: 10,
        })
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.date).not.toBeNull();
        expect(json.originAccountId).toBe(5050);
        expect(json.destinyAccountId).toBe(1);
        expect(json.originCpf).toBe('DigitalRepublicBankCNPJ');
        expect(json.destinyCpf).toBe(destinyCpf);
        expect(json.quantity).toBe(10);
        expect(json.id).toBe(3);
      });

      await frisby
      .get(`${accoutUrl}/1`)
      .expect('status', 200)
      .then((response) => {
        const { json } = response;
        expect(json.fullName).toBe(userName);
        expect(json.cpf).toBe(destinyCpf);
        expect(json.balance).toBe(10);
        expect(json.id).toBe(1);
      });
  });

  it('Não é possível fazer um depósito com valor negativo', async function () {
    await frisby
    .post(`${url}/deposit`,
      {
        destinyCpf,
        quantity: -10,
      })
    .expect('status', 401)
    .then((response) => {
      const { json } = response;
      expect(json.message).toBe('Deposit Only!');
    });
  });

  it('Não é possível fazer um depósito com valor acima de 2000', async function () {
    await frisby
    .post(`${url}/deposit`,
      {
        destinyCpf,
        quantity: 2001,
      })
    .expect('status', 401)
    .then((response) => {
      const { json } = response;
      expect(json.message).toBe('Limit of tranferences is R$: 2000');
    });
  });
});
