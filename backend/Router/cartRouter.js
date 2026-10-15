const express = require('express')
const cartController = require('../Controller/cartController')

const cartRouter = express.Router()

cartRouter.post('/add', cartController.addToCart)

cartRouter.get('/:user_id', cartController.getCart)

cartRouter.put('/update', cartController.updateCart)

cartRouter.delete('/remove', cartController.removeFromCart)

cartRouter.post('/wishlist-to-cart', cartController.wishlistToCart)

module.exports = cartRouter