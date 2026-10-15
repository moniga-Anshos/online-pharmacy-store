const express = require('express')
const wishlistController = require('../Controller/wishlistController')

const wishlistRouter = express.Router()

wishlistRouter.post('/add', wishlistController.addWishlist)

wishlistRouter.get('/:user_id', wishlistController.getWishlist)

wishlistRouter.delete('/remove', wishlistController.removeWishlist)

module.exports = wishlistRouter