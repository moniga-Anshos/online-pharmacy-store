const cartModel = require('../Model/cartModel')

const addToCart = async (req, res) => {
    try {
        const result = await cartModel.addToCart(req.body)

        res.json({
            status: 'success',
            message: 'Product added to cart',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to add product to cart',
            error: error.message
        })
    }
}

const getCart = async (req, res) => {
    try {
        const result = await cartModel.getCart(
            req.params.user_id
        )

        res.json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to get cart',
            error: error.message
        })
    }
}

const updateCart = async (req, res) => {
    try {
        const result = await cartModel.updateCart(req.body)

        res.json({
            status: 'success',
            message: 'Cart updated',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to update cart',
            error: error.message
        })
    }
}

const removeFromCart = async (req, res) => {
    try {
        const result = await cartModel.removeFromCart(req.body)

        res.json({
            status: 'success',
            message: 'Product removed from cart',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to remove product',
            error: error.message
        })
    }
}

const wishlistToCart = async (req, res) => {
    try {
        const result = await cartModel.wishlistToCart(req.body)

        res.json({
            status: 'success',
            message: 'Wishlist product added to cart',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to add wishlist product to cart',
            error: error.message
        })
    }
}

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    wishlistToCart
}