const orderModel = require('../Model/orderModel')


/* =========================
   ADD ADDRESS
========================= */

const addAddress = async (req, res) => {

    try {

        const result =
            await orderModel.addAddress(
                req.body
            )


        res.json({

            status: 'success',

            message:
                'Address added successfully',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Failed to add address',

            error:
                error.message

        })

    }

}


/* =========================
   GET ADDRESSES
========================= */

const getAddresses = async (req, res) => {

    try {

        const result =
            await orderModel.getAddresses(
                req.params.user_id
            )


        res.json({

            status: 'success',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Failed to get addresses',

            error:
                error.message

        })

    }

}


/* =========================
   PLACE ORDER
========================= */

const placeOrder = async (req, res) => {

    try {

        const result =
            await orderModel.placeOrder(
                req.body
            )


        res.json({

            status: 'success',

            message:
                'Order placed successfully',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Failed to place order',

            error:
                error.message

        })

    }

}


/* =========================
   GET ORDER HISTORY
========================= */

const getOrderHistory = async (req, res) => {

    try {

        const result =
            await orderModel.getOrderHistory(
                req.params.user_id
            )


        res.json({

            status: 'success',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Failed to get order history',

            error:
                error.message

        })

    }

}


/* =========================
   GET ORDER DETAILS
========================= */

const getOrderDetails = async (req, res) => {

    try {

        const result =
            await orderModel.getOrderDetails(
                req.params.order_id
            )


        res.json({

            status: 'success',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Failed to get order details',

            error:
                error.message

        })

    }

}


/* =========================
   REORDER
========================= */

const reorder = async (req, res) => {

    try {

        const result =
            await orderModel.reorder(
                req.body
            )


        res.json({

            status: 'success',

            message:
                'Previous order added to cart',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Reorder failed',

            error:
                error.message

        })

    }

}


/* =========================
   CANCEL ORDER
========================= */

const cancelOrder = async (req, res) => {

    try {

        const result =
            await orderModel.cancelOrder(
                req.params.order_id
            )


        if (!result) {

            return res.status(404).json({

                status: 'failed',

                message:
                    'Order cannot be cancelled'

            })

        }


        res.json({

            status: 'success',

            message:
                'Order cancelled',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Order cancellation failed',

            error:
                error.message

        })

    }

}


/* =========================
   EXPORT
========================= */

module.exports = {

    addAddress,
    getAddresses,
    placeOrder,
    getOrderHistory,
    getOrderDetails,
    reorder,
    cancelOrder

}