
const pool = require('../db')

const bcrypt = require('bcrypt')


/* =========================
   ADMIN LOGIN
========================= */

const loginAdmin = async (data) => {

    const {
        email,
        password
    } = data


    const result =
        await pool.query(

            `select *
             from admin
             where email = $1
             and isactive = true`,

            [email]

        )


    if (result.rows.length === 0) {

        return null

    }


    const admin =
        result.rows[0]


    const passwordMatch =
        await bcrypt.compare(
            password,
            admin.password
        )


    if (!passwordMatch) {

        return null

    }


    delete admin.password


    return admin

}


/* =========================
   ADD CATEGORY
========================= */

const addCategory = async (data) => {

    const {
        category_name,
        description
    } = data


    const result =
        await pool.query(

            `insert into categories
            (
                category_name,
                description
            )
            values
            ($1, $2)
            returning *`,

            [
                category_name,
                description
            ]

        )


    return result.rows[0]

}


/* =========================
   GET CATEGORIES
========================= */

const getCategories = async () => {

    const result =
        await pool.query(

            `select *
             from categories
             where isactive = true
             order by category_id`

        )


    return result.rows

}


/* =========================
   UPDATE CATEGORY
========================= */

const updateCategory =
    async (category_id, data) => {

        const {
            category_name,
            description
        } = data


        const result =
            await pool.query(

                `update categories
                 set
                    category_name = $1,
                    description = $2,
                    updatedon = current_timestamp
                 where category_id = $3
                 and isactive = true
                 returning *`,

                [
                    category_name,
                    description,
                    category_id
                ]

            )


        return result.rows[0]

    }


/* =========================
   DELETE CATEGORY
========================= */

const deleteCategory =
    async (category_id) => {

        const result =
            await pool.query(

                `update categories
                 set
                    isactive = false,
                    updatedon = current_timestamp
                 where category_id = $1
                 returning *`,

                [category_id]

            )


        return result.rows[0]

    }


/* =========================
   GET ALL ORDERS
========================= */

const getOrders = async () => {

    const result =
        await pool.query(

            `select
                order_id,
                user_id,
                address_id,
                total_amount,
                discount_amount,
                final_amount,
                payment_method,
                payment_status,
                order_status,
                expected_delivery_date,
                createdon,
                updatedon
             from orders
             order by order_id desc`

        )


    return result.rows

}


/* =========================
   UPDATE ORDER
========================= */

const updateOrder =
    async (order_id, data) => {

        const {
            order_status,
            expected_delivery_date
        } = data


        const result =
            await pool.query(

                `update orders
                 set
                    order_status = $1,
                    expected_delivery_date = $2,
                    updatedon = current_timestamp
                 where order_id = $3
                 returning *`,

                [
                    order_status,
                    expected_delivery_date,
                    order_id
                ]

            )


        return result.rows[0]

    }


/* =========================
   GET ALL CUSTOMERS
========================= */

const getCustomers = async () => {

    const result =
        await pool.query(

            `select
                user_id,
                user_name,
                email,
                phone,
                isactive,
                createdon
             from users
             order by user_id desc`

        )


    return result.rows

}


/* =========================
   GET CUSTOMER DETAILS
========================= */

const getCustomerDetails =
    async (user_id) => {


        /* =========================
           CUSTOMER
        ========================= */

        const customerResult =
            await pool.query(

                `select
                    user_id,
                    user_name,
                    email,
                    phone,
                    isactive,
                    createdon,
                    updatedon
                 from users
                 where user_id = $1`,

                [user_id]

            )


        if (
            customerResult.rows.length === 0
        ) {

            return null

        }


        /* =========================
           ADDRESSES
        ========================= */

        const addressResult =
            await pool.query(

                `select
                    address_id,
                    user_id,
                    phone,
                    address,
                    city,
                    state,
                    pincode,
                    isdefault,
                    isactive,
                    createdon,
                    updatedon
                 from addresses
                 where user_id = $1
                 and isactive = true
                 order by address_id desc`,

                [user_id]

            )


        /* =========================
           ORDERS
        ========================= */

        const orderResult =
            await pool.query(

                `select
                    order_id,
                    user_id,
                    address_id,
                    total_amount,
                    discount_amount,
                    final_amount,
                    payment_method,
                    payment_status,
                    order_status,
                    expected_delivery_date,
                    createdon,
                    updatedon
                 from orders
                 where user_id = $1
                 order by order_id desc`,

                [user_id]

            )


        /* =========================
           RETURN ALL DATA
        ========================= */

        return {

            customer:
                customerResult.rows[0],

            addresses:
                addressResult.rows,

            orders:
                orderResult.rows

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

    
}