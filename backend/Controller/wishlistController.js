const wishlistModel = require('../Model/wishlistModel')

const addWishlist = async (req, res) => {
    try {
        const result = await wishlistModel.addWishlist(req.body)

        res.json({
            status: 'success',
            message: 'Product added to wishlist',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to add wishlist',
            error: error.message
        })
    }
}

const getWishlist = async (req, res) => {
    try {
        const result = await wishlistModel.getWishlist(
            req.params.user_id
        )

        res.json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to get wishlist',
            error: error.message
        })
    }
}

const removeWishlist = async (req, res) => {
    try {
        const result = await wishlistModel.removeWishlist(req.body)

        res.json({
            status: 'success',
            message: 'Product removed from wishlist',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to remove wishlist',
            error: error.message
        })
    }
}

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
}