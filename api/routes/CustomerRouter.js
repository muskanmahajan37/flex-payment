const express = require('express');
const router = express.Router();

const CustomerController = require('../controllers/CustomerController');

const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, CustomerController.getAllStripeCustomers);
router.get('/:userId', checkAuth, CustomerController.getStripeCustomerByID);
router.post('/', checkAuth, CustomerController.createStripeCustomer);
router.delete('/:userId', checkAuth, CustomerController.deleteStripeCustomer);

module.exports = router;
