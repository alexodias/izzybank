# Boas vindas ao IZZYBank!

IZZYBank é uma aplicação desenvolvida em Node.js, Express, MySQL e Sequelize que disponibiliza funções essênciais relacionadas ao gerenciamento de contas bancárias.

## Para executar a aplicação:

Para executar esta aplicação você precisa ter uma versão do Node.js e do MySQL instalados em sua máquina.
 * Faça o download do Node.js [aqui](https://nodejs.org/pt-br/download/)
 * Faça o download do MySQL [aqui](https://www.mysql.com/downloads/)



1. Inicie sua instâcia MySQL e configure a sua conexão com o banco de dados:
  * No linux: `sudo systemctl start mysql.service`
    * Agora edite o arquivo `config.js`, em `/config` de acordo com as especificações de sua conexão com o MySQL.
    * Utilize variáveis de ambiente para tornar sua configuração mais segura.

3. Instale as dependências e inicialize a aplicação:
  * Instale as dependências:
    * `npm install`.
  * Inicie a aplicação:
    * `npm start`.
    * A mensagem `on-line na porta 3000` será exibida em seu terminal`.

  * Iniciando a aplicação em modo desenvolvedor:
    * Execute `npm run debug` para iniciar utilizando o Nodemon.

  * Testes
    * O backend possui testes para as operações de criação de conta, depósito e transações.
    * Atenção: se necessário altere a `url` para os testes funcionarem corretamente, por padrão ela está definida como `localhost`.
      * Na raíz do projeto execute `npm test` para iniciar os testes com `jest`.
      * Para testar apenas a criação de contas execute `npm test ./tests/createAccount.test.js`.
      * Para testar apenas a função de depósito execute `npm test ./tests/deposit.test.js`.
      * Para testar apenas a função de transações execute `npm test ./tests/transactions.test.js`.

## Como usar a aplicação

Vamos começar pelas rotas disponíveis:

- [GET `/account`](#listar-contas-cadastradas)
- [GET `/transaction`](#listar-transações-realizadas)
- [GET `/account/id`](#encontrar-conta-pelo-id-(número-da-conta))
- [GET `/account/fullName`](#encontrar-conta-pelo-nome-do-cliente)
- [POST `/account`](#cadastrar-nova-conta)
- [POST `/transaction`](#realizar-uma-transferência-entre-contas)
- [POST `transaction/deposit`](#realizar-um-deposito-utilizando-um-terminal-IZZYBank)


## Listar contas cadastradas
  Para listar todas as contas cadastradas no sistema IZZYBANKk faça uma requisição do tipo `GET` para `http://localhost:3000/account`. Caso você não esteja utilizando localhost, substistua pelo seu endereço customizado. O resultado da requisição será um array de objetos contendo as contas cadastradas:

  ```json
[
  {
    "id": 1,
    "fullName": "Pernalonga Roedor",
    "cpf": "12368742697",
    "balance": 0
  },
  {
    "id": 2,
    "fullName": "Ramón Valdez",
    "cpf": "31882558724",
    "balance": 50000000
  },
  {
    "id": 3,
    "fullName": "Tarcísio Digital Republic Lover",
    "cpf": "42993689835",
    "balance": 15.65
  },
  {
    "id": 4,
    "fullName": "Maria Antonieta de las Nieves",
    "cpf": "45913389230",
    "balance": 60000000
  }
]
  ```
Caso não existam contas ativas no sistema a aplicação retornará um array vazio.

## Listar transações realizadas
  Para listar todas as transações e depositos realizados no sistema IZZYBANK faça uma requisição do tipo `GET` para `http://localhost:3000/transaction`. Caso você não esteja utilizando localhost, substistua pelo seu endereço customizado. O resultado da requisição será um array de objetos contendo as movimentações realizadas:

```json
[
  {
    "id": 1,
    "date": "2010-12-21T00:00:00.000Z",
    "originAccountId": 2,
    "destinyAccountId": 4,
    "originCpf": "31882558724",
    "destinyCpf": "45913389230",
    "quantity": 100
  },
  {
    "id": 2,
    "date": "2011-12-21T00:00:00.000Z",
    "originAccountId": 4,
    "destinyAccountId": 2,
    "originCpf": "45913389230",
    "destinyCpf": "31882558724",
    "quantity": 150
  }
]
```

Caso não existam movimentações no sistema a aplicação retornará um array vazio.

## Encontrar conta pelo id (número-da-conta)
  Para encontrar uma conta pelo seu número de identicação no sistema IZZYBANK, faça uma requisição do tipo `GET` para `http://localhost:3000/account/id`, sendo que `id` é o número da conta que deseja encontrar. Caso você não esteja utilizando localhost, substistua pelo seu endereço customizado. O resultado da requisição será um objeto contendo a conta pesquisada:

```json
{
  "id": 1,
  "fullName": "Pernalonga Roedor",
  "cpf": "12368742697",
  "balance": 0
}
```
Caso não exista uma conta com o número de identificação informado o sistema responderá da seguinte forma: 

```json
{
  "message": "Account not found"
}
```

## Encontrar conta pelo nome do cliente
  Para encontrar uma conta pelo nome do cliente cadastrado no sistema IZZYBANK, faça uma requisição do tipo `GET` para `http://localhost:3000/account/search-by-name/fullName`, sendo que `fullName` representa o nome ou parte do nome do cliente em que se deseja encontrar a conta. Caso você não esteja utilizando localhost, substistua pelo seu endereço customizado. O resultado da requisição será um array contendo um objeto referente ao cliente pesquisado:

  ```json
[
  {
    "id": 1,
    "fullName": "Pernalonga Roedor",
    "cpf": "12368742697",
    "balance": 0
  }
]
  ```
Caso não exista um cliente com o nome informado o sistema responderá com um array vazio.

## Cadastrar nova conta
  Para cadastrar uma nova conta no sistema IZZYBANK, faça uma requisição do tipo `POST` para `http://localhost:3000/account`. Caso você não esteja utilizando localhost, substistua pelo seu endereço customizado. Você precisará informar o nome completo do cliente e o seu CPF. O nome completo precisa ter mais de 8 caracteres e o CPF tem que ser válido. O `body` da requisição tem que seguir o seguinte padrão:

  ```json
{
	"fullName": "Teresinha de Jesus",
	"cpf": "01890020810"
}
  ```
Em caso de sucesso o sistema responderá da seguinte forma:

```json
{
  "id": 2,
  "fullName": "Teresinha de Jesus",
  "cpf": "01398026816",
  "balance": 0
}
```
Você pode informar uma quantidade para o campo `balance` no ato de criação da conta, caso este campo não seja informado, a conta é criada com balance igual a zero.
Caso exista um problema com o nome ou com o CPF o sistema retornará com o seguinte erro:

```json
{
  "message": "Invalid name or cpf"
}
```
Ou, caso o cliente já tenha uma conta cadastrada em seu CPF:

```json
{
  "message": "Account Already Exists"
}
```

## Realizar uma transferência entre contas
  Para fazer uma transferência entre contas, faça uma requisição do tipo `POST` para `http://localhost:3000/transaction`. Caso você não esteja utilizando localhost, substistua pelo seu endereço customizado. Você precisará informar o cpf de quem está enviando o dinheiro, o cpf de quem vai receber e o valor. O sistema permite transações com valores menores ou igual a 2000 reais e a transação só é completada caso o cliente tenha saldo disponível. O `body` da requisição tem que seguir o seguinte padrão:

  ```json
  {
    "originCpf": "42993689835",
    "destinyCpf": "12368742697",
    "quantity": 5
  }
  ```
  Em caso de sucesso o sistema responderá com o recibo, da seguinte forma:

  ```json
{
  "id": 3,
  "date": "2021-11-12T20:01:25.000Z",
  "originAccountId": 3,
  "destinyAccountId": 1,
  "originCpf": "42993689835",
  "destinyCpf": "12368742697",
  "quantity": 5
}
  ```
Caso haja um problema com o CPF de algum dos envolvidos:

```json
{
  "message": "This CPF is invalid"
}
```
Caso o valor da transferência seja superior a 2000 reais:

```json
{
  "message": "Limit of tranferences is R$: 2000"
}
```
Caso o cliente não tenha saldo suficiente para realizar a transação:

```json
{
  "message": "Cash not suficient"
}
```
Caso tente fazer uma transação com valor negativo:

```json
{
  "message": "Deposit Only!"
}
```

## Realizar um deposito utilizando um terminal do IZZYBANK
  Para fazer um deposito utilizando um terminal de auto atendimento, faça uma requisição do tipo `POST` para `http://localhost:3000/transaction/deposit`. Caso você não esteja utilizando localhost, substistua pelo seu endereço customizado. Você precisará informar o cpf de quem vai receber e o valor. O sistema permite transações com valores menores ou igual a 2000 reais. O `body` da requisição tem que seguir o seguinte padrão:

```json
{
	"destinyCpf": "12368742697",
	"quantity": 100
}
```
Em caso de sucesso o sistema responderá da seguinte forma:

```json
{
  "id": 4,
  "date": "2021-11-12T20:06:45.000Z",
  "originAccountId": 5050,
  "destinyAccountId": 1,
  "originCpf": "DigitalRepublicBankCNPJ",
  "destinyCpf": "12368742697",
  "quantity": 100
}
```
Caso haja um problema com o CPF do cliente que irá receber o deposito:

```json
{
  "message": "This CPF is invalid"
}
```
Caso o valor do deposito seja superior a 2000 reais:

```json
{
  "message": "Limit of tranferences is R$: 2000"
}
```
Caso o valor do deposito seja negativo:

```json
{
  "message": "Deposit Only!"
}
```