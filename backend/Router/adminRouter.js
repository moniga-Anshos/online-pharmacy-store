
const express = require('express');
const adminController = require('../Controller/adminController');

const adminRouter = express.Router();

// Admin login
adminRouter.post('/login', adminController.loginAdmin);

// Category
adminRouter.post('/category', adminController.addCategory);
adminRouter.get('/category', adminController.getCategories);
adminRouter.put('/category/:category_id', adminController.updateCategory);
adminRouter.delete('/category/:category_id', adminController.deleteCategory);

// Orders
adminRouter.get('/orders', adminController.getOrders);
adminRouter.put('/orders/:order_id', adminController.updateOrder);

// Customers
adminRouter.get('/customers', adminController.getCustomers);
adminRouter.get('/customers/:user_id', adminController.getCustomerDetails);



module.exports = adminRouter;

