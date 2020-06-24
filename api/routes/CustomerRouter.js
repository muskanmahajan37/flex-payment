const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

const checkAuth = require('../middlewares/check-auth');

router.get('/', CustomerController.getAllStripeCustomers);
router.get('/:userId', CustomerController.getStripeCustomerByID);
router.post('/', CustomerController.createStripeCustomer);
router.delete('/:userId', CustomerController.deleteStripeCustomer);

module.exports = router;
