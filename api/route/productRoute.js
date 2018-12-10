const express = require('express');
const router = express.Router();
const authCheck = require('../authentication/auth');
const productService = require('../service/productService');

router.get('/', authCheck, productService.get_all_product);

router.post('/', authCheck, productService.create_product);

router.get('/:productId', authCheck, productService.get_product_by_id);

router.put('/:productId', authCheck, productService.update_product);

router.delete('/:productId', authCheck, productService.delete_product);

module.exports = router;