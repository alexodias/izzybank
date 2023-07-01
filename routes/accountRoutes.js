const router = require('express').Router();
const controller = require('../controllers/accountControllers');

router.get('/account/:id', controller.searchAccountById);
router.get('/account/search-by-name/:fullName', controller.searchAccountByFullName);
router.get('/account', controller.getAllAccount);
router.post('/account', controller.accountRegister);

module.exports = router;
