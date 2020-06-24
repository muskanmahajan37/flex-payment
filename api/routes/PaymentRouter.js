const express = require('express');
const router = express.Router();

const PaymentController = require('../controllers/PaymentController');

const checkAuth = require('../middlewares/check-auth');

router.get('/', checkAuth, PaymentController.getAllPayments);
router.get('/:paymentId', checkAuth, PaymentController.getPaymentsByID);
router.post('/', checkAuth, PaymentController.makePayment);
router.delete('/:paymentId', checkAuth, PaymentController.deletePayment);

module.exports = router;
