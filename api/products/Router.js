const express = require('express')
const router = express.Router()
const { getAllProducts, addProduct } = require('./Controller')

router.get('/products', getAllProducts)

router.post('/addproduct', addProduct)


module.exports = router