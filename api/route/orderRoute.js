const express = require('express');
const router = express.Router();
const orderService = require('../service/orderService')
const authCheck = require('../authentication/auth');

router.get('/', authCheck, orderService.get_all_order);

router.post('/', authCheck, orderService.create_order);

router.get('/:orderId', authCheck, orderService.get_order_by_id);

router.patch('/:orderId', authCheck, orderService.update_order);

router.delete('/:orderId', authCheck, orderService.delete_order);

module.exports = router;