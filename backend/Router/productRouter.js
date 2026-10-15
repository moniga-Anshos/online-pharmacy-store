const express = require('express')
const multer = require('multer')

const productController =
    require('../Controller/productController')

const productRouter =
    express.Router()


const storage = multer.diskStorage({

    destination: (req, file, cb) => {

        cb(null, 'uploads/')

    },

    filename: (req, file, cb) => {

        cb(
            null,
            Date.now() + '-' + file.originalname
        )

    }

})


const upload = multer({
    storage: storage
})


productRouter.get(
    '/',
    productController.getProducts
)


productRouter.get(
    '/search',
    productController.searchProducts
)


productRouter.get(
    '/:product_id',
    productController.getProduct
)


productRouter.post(
    '/admin',
    upload.single('image'),
    productController.addProduct
)


productRouter.put(
    '/admin/:product_id',
    upload.single('image'),
    productController.updateProduct
)


productRouter.delete(
    '/admin/:product_id',
    productController.deleteProduct
)


productRouter.put(
    '/admin/:product_id/stock',
    productController.updateStock
)


module.exports = productRouter