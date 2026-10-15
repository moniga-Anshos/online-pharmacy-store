
const adminModel =
    require('../Model/adminModel')


/* =========================
   ADMIN LOGIN
========================= */

const loginAdmin = async (req, res) => {

    try {

        const result =
            await adminModel.loginAdmin(
                req.body
            )


        if (!result) {

            return res.status(401).json({

                status: 'failed',

                message:
                    'Invalid email or password'

            })

        }


        res.json({

            status: 'success',

            message:
                'Admin login successful',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Admin login failed',

            error:
                error.message

        })

    }

}


/* =========================
   ADD CATEGORY
========================= */

const addCategory = async (req, res) => {

    try {

        const result =
            await adminModel.addCategory(
                req.body
            )


        res.json({

            status: 'success',

            message:
                'Category added successfully',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Category add failed',

            error:
                error.message

        })

    }

}


/* =========================
   GET CATEGORIES
========================= */

const getCategories = async (req, res) => {

    try {

        const result =
            await adminModel.getCategories()


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
                'Category fetch failed',

            error:
                error.message

        })

    }

}


/* =========================
   UPDATE CATEGORY
========================= */

const updateCategory = async (req, res) => {

    try {

        const result =
            await adminModel.updateCategory(
                req.params.category_id,
                req.body
            )


        res.json({

            status: 'success',

            message:
                'Category updated successfully',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Category update failed',

            error:
                error.message

        })

    }

}


/* =========================
   DELETE CATEGORY
========================= */

const deleteCategory = async (req, res) => {

    try {

        const result =
            await adminModel.deleteCategory(
                req.params.category_id
            )


        res.json({

            status: 'success',

            message:
                'Category deleted successfully',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Category delete failed',

            error:
                error.message

        })

    }

}


/* =========================
   GET ALL ORDERS
========================= */

const getOrders = async (req, res) => {

    try {

        const result =
            await adminModel.getOrders()


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
                'Failed to load orders',

            error:
                error.message

        })

    }

}


/* =========================
   UPDATE ORDER
========================= */

const updateOrder = async (req, res) => {

    try {

        const result =
            await adminModel.updateOrder(
                req.params.order_id,
                req.body
            )


        if (!result) {

            return res.status(404).json({

                status: 'failed',

                message:
                    'Order not found'

            })

        }


        res.json({

            status: 'success',

            message:
                'Order updated successfully',

            data: result

        })

    }
    catch (error) {

        console.log(error)

        res.status(500).json({

            status: 'failed',

            message:
                'Order update failed',

            error:
                error.message

        })

    }

}


/* =========================
   GET ALL CUSTOMERS
========================= */

const getCustomers = async (req, res) => {

    try {

        const result =
            await adminModel.getCustomers()


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
                'Failed to load customers',

            error:
                error.message

        })

    }

}


/* =========================
   GET CUSTOMER DETAILS
========================= */

const getCustomerDetails = async (req, res) => {

    try {

        const result =
            await adminModel.getCustomerDetails(
                req.params.user_id
            )


        if (!result) {

            return res.status(404).json({

                status: 'failed',

                message:
                    'Customer not found'

            })

        }


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
                'Failed to load customer details',

            error:
                error.message

        })

    }

}

/* =========================
   EXPORT
========================= */

module.exports = {
    loginAdmin,
    addCategory,
    getCategories,
    updateCategory,
    deleteCategory,
    getOrders,
    updateOrder,
    getCustomers,
    getCustomerDetails
   
};

