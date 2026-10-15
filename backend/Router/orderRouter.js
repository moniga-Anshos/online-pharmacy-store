const express = require('express')

const orderController =
    require('../Controller/orderController')

const orderRouter =
    express.Router()


orderRouter.post(
    '/address',
    orderController.addAddress
)


orderRouter.get(
    '/address/:user_id',
    orderController.getAddresses
)


orderRouter.post(
    '/',
    orderController.placeOrder
)


orderRouter.get(
    '/history/:user_id',
    orderController.getOrderHistory
)


orderRouter.get(
    '/:order_id',
    orderController.getOrderDetails
)


orderRouter.post(
    '/reorder',
    orderController.reorder
)


orderRouter.put(
    '/cancel/:order_id',
    orderController.cancelOrder
)


module.exports = orderRouter