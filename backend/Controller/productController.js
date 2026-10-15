const productModel =
    require('../Model/productModel')


// Get Products
const getProducts = async (req, res) => {

    try {

        const result =
            await productModel.getProducts()

        res.json({
            status: 'success',
            data: result
        })

    } catch (error) {

        res.status(500).json({
            status: 'failed',
            message: 'Failed to get products',
            error: error.message
        })

    }

}


// Get Single Product
const getProduct = async (req, res) => {

    try {

        const result =
            await productModel.getProduct(
                req.params.product_id
            )

        res.json({
            status: 'success',
            data: result
        })

    } catch (error) {

        res.status(500).json({
            status: 'failed',
            message: 'Failed to get product',
            error: error.message
        })

    }

}


// Search Products
const searchProducts = async (req, res) => {

    try {

        const result =
            await productModel.searchProducts(
                req.query.name
            )

        res.json({
            status: 'success',
            data: result
        })

    } catch (error) {

        res.status(500).json({
            status: 'failed',
            message: 'Search failed',
            error: error.message
        })

    }

}


// Add Product
const addProduct = async (req, res) => {

    try {

        const data = {
            category_id: req.body.category_id,
            product_name: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            discount: req.body.discount,
            image_url: req.file
                ? `/uploads/${req.file.filename}`
                : null
        }

        const result =
            await productModel.addProduct(data)

        res.json({
            status: 'success',
            message: 'Product added successfully',
            data: result
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            status: 'failed',
            message: 'Product add failed',
            error: error.message
        })

    }

}


// Update Product
const updateProduct = async (req, res) => {

    try {

        const data = {
            category_id: req.body.category_id,
            product_name: req.body.product_name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
            discount: req.body.discount
        }

        if (req.file) {

            data.image_url =
                `/uploads/${req.file.filename}`

        }

        const result =
            await productModel.updateProduct(
                req.params.product_id,
                data
            )

        res.json({
            status: 'success',
            message: 'Product updated successfully',
            data: result
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            status: 'failed',
            message: 'Product update failed',
            error: error.message
        })

    }

}


// Delete Product
const deleteProduct = async (req, res) => {

    try {

        const result =
            await productModel.deleteProduct(
                req.params.product_id
            )

        res.json({
            status: 'success',
            message: 'Product deleted successfully',
            data: result
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            status: 'failed',
            message: 'Product delete failed',
            error: error.message
        })

    }

}


// Update Stock
const updateStock = async (req, res) => {

    try {

        const result =
            await productModel.updateStock(
                req.params.product_id,
                req.body.stock
            )

        res.json({
            status: 'success',
            message: 'Stock updated successfully',
            data: result
        })

    } catch (error) {

        console.log(error)

        res.status(500).json({
            status: 'failed',
            message: 'Stock update failed',
            error: error.message
        })

    }

}


module.exports = {

    getProducts,
    getProduct,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    updateStock

}