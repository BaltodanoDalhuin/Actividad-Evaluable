const express = require('express');
const router = express.Router();
const productosController = require('../controllers/productosControllers')


router.get('/', productosController.getAllProductos)
router.post('/', productosController.postAllProductos)
router.delete('/id:', productosController.deleteAllProductos)



module.exports=router