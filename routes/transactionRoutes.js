const router = require('express').Router();
const controller = require('../controllers/transactionControllers');

router.post('/transaction', controller.cashTranference);
router.post('/transaction/deposit', controller.cashDeposit);
router.get('/transaction', controller.getAllTransactions);

module.exports = router;
