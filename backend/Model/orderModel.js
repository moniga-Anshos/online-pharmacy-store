const pool = require('../db')


/* =========================
   ADD ADDRESS
========================= */

const addAddress = async (data) => {

    const {
        user_id,
        phone,
        address,
        city,
        state,
        pincode,
        isdefault
    } = data


    const result = await pool.query(

        `insert into addresses
        (
            user_id,
            phone,
            address,
            city,
            state,
            pincode,
            isdefault
        )
        values
        ($1, $2, $3, $4, $5, $6, $7)
        returning *`,

        [
            user_id,
            phone,
            address,
            city,
            state,
            pincode,
            isdefault || false
        ]

    )


    return result.rows[0]

}


/* =========================
   GET ADDRESSES
========================= */

const getAddresses = async (user_id) => {

    const result = await pool.query(

        `select *
         from addresses
         where user_id = $1
         and isactive = true
         order by address_id desc`,

        [user_id]

    )


    return result.rows

}


/* =========================
   PLACE ORDER
========================= */

const placeOrder = async (data) => {

    const {
        user_id,
        address_id,
        payment_method,
        discount_amount
    } = data


    /* =========================
       PAYMENT VALIDATION
    ========================= */

    if (
        !payment_method ||
        payment_method.trim() === ''
    ) {

        throw new Error(
            'Please select a payment method'
        )

    }


    /* =========================
       GET CART
    ========================= */

    const cartResult = await pool.query(

        `select
            ci.product_id,
            ci.quantity,
            p.price
         from cart c
         join cart_items ci
         on c.cart_id = ci.cart_id
         join products p
         on ci.product_id = p.product_id
         where c.user_id = $1`,

        [user_id]

    )


    if (cartResult.rows.length === 0) {

        throw new Error(
            'Cart is empty'
        )

    }


    /* =========================
       CALCULATE TOTAL
    ========================= */

    let total_amount = 0


    for (const item of cartResult.rows) {

        total_amount +=
            Number(item.price) *
            Number(item.quantity)

    }


    const discount =
        Number(discount_amount || 0)


    const final_amount =
        total_amount - discount


    /* =========================
       PAYMENT STATUS
    ========================= */

    let payment_status = 'paid'

    let paidon = new Date()


    if (
        payment_method.toLowerCase() ===
        'cash on delivery'
    ) {

        payment_status = 'pending'

        paidon = null

    }


    /* =========================
       EXPECTED DELIVERY
    ========================= */

    const expected_delivery_date =
        new Date()

    expected_delivery_date.setDate(
        expected_delivery_date.getDate() + 5
    )


    /* =========================
       CREATE ORDER
    ========================= */

    const orderResult = await pool.query(

        `insert into orders
        (
            user_id,
            address_id,
            total_amount,
            discount_amount,
            final_amount,
            payment_method,
            payment_status,
            order_status,
            expected_delivery_date
        )
        values
        (
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8,
            $9
        )
        returning *`,

        [
            user_id,
            address_id,
            total_amount,
            discount,
            final_amount,
            payment_method,
            payment_status,
            'confirmed',
            expected_delivery_date
        ]

    )


    const order =
        orderResult.rows[0]


    /* =========================
       ADD ORDER ITEMS
    ========================= */

    for (const item of cartResult.rows) {

        await pool.query(

            `insert into order_items
            (
                order_id,
                product_id,
                quantity,
                price
            )
            values
            ($1, $2, $3, $4)`,

            [
                order.order_id,
                item.product_id,
                item.quantity,
                item.price
            ]

        )


        /* =========================
           UPDATE STOCK
        ========================= */

        await pool.query(

            `update products
             set
                stock = stock - $1,
                updatedon = current_timestamp
             where product_id = $2`,

            [
                item.quantity,
                item.product_id
            ]

        )

    }


    /* =========================
       ADD PAYMENT
    ========================= */

    await pool.query(

        `insert into payments
        (
            order_id,
            payment_method,
            amount,
            payment_status,
            paidon
        )
        values
        ($1, $2, $3, $4, $5)`,

        [
            order.order_id,
            payment_method,
            final_amount,
            payment_status,
            paidon
        ]

    )


    /* =========================
       CLEAR CART
    ========================= */

    await pool.query(

        `delete from cart_items
         where cart_id = (
             select cart_id
             from cart
             where user_id = $1
         )`,

        [user_id]

    )


    return order

}


/* =========================
   GET ORDER HISTORY
========================= */

const getOrderHistory = async (user_id) => {

    const result = await pool.query(

        `select
            order_id,
            total_amount,
            discount_amount,
            final_amount,
            payment_method,
            payment_status,
            order_status,
            expected_delivery_date,
            createdon
         from orders
         where user_id = $1
         order by order_id desc`,

        [user_id]

    )


    return result.rows

}


/* =========================
   GET ORDER DETAILS
========================= */

const getOrderDetails = async (order_id) => {

    const orderResult = await pool.query(

        `select *
         from orders
         where order_id = $1`,

        [order_id]

    )


    const itemsResult = await pool.query(

        `select
            oi.order_item_id,
            oi.product_id,
            p.product_name,
            oi.quantity,
            oi.price
         from order_items oi
         join products p
         on oi.product_id = p.product_id
         where oi.order_id = $1`,

        [order_id]

    )


    const paymentResult = await pool.query(

        `select *
         from payments
         where order_id = $1`,

        [order_id]

    )


    return {

        order:
            orderResult.rows[0],

        items:
            itemsResult.rows,

        payment:
            paymentResult.rows[0]

    }

}


/* =========================
   REORDER
========================= */

const reorder = async (data) => {

    const {
        user_id,
        order_id
    } = data


    const itemsResult = await pool.query(

        `select
            product_id,
            quantity
         from order_items
         where order_id = $1`,

        [order_id]

    )


    const cartIdResult = await pool.query(

        `select cart_id
         from cart
         where user_id = $1`,

        [user_id]

    )


    let cart_id


    if (cartIdResult.rows.length === 0) {

        const newCart = await pool.query(

            `insert into cart
            (user_id)
            values ($1)
            returning cart_id`,

            [user_id]

        )


        cart_id =
            newCart.rows[0].cart_id

    }
    else {

        cart_id =
            cartIdResult.rows[0].cart_id

    }


    for (const item of itemsResult.rows) {

        await pool.query(

            `insert into cart_items
            (
                cart_id,
                product_id,
                quantity
            )
            values
            ($1, $2, $3)

            on conflict
            (cart_id, product_id)

            do update set
                quantity =
                cart_items.quantity +
                excluded.quantity`,

            [
                cart_id,
                item.product_id,
                item.quantity
            ]

        )

    }


    return {

        order_id,

        message:
            'Previous order added to cart'

    }

}


/* =========================
   CANCEL ORDER
========================= */

const cancelOrder = async (order_id) => {

    const result = await pool.query(

        `update orders
         set
            order_status = 'cancelled',
            updatedon = current_timestamp
         where order_id = $1
         and order_status in
         ('pending', 'confirmed')
         returning *`,

        [order_id]

    )


    return result.rows[0]

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