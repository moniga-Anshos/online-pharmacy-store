const pool = require('../db')

const getOrCreateCart = async (user_id) => {
    let result = await pool.query(
        `select cart_id
         from cart
         where user_id = $1`,
        [user_id]
    )

    if (result.rows.length > 0) {
        return result.rows[0].cart_id
    }

    result = await pool.query(
        `insert into cart (user_id)
         values ($1)
         returning cart_id`,
        [user_id]
    )

    return result.rows[0].cart_id
}

const addToCart = async (data) => {
    const {
        user_id,
        product_id,
        quantity
    } = data

    const cart_id = await getOrCreateCart(user_id)

    const result = await pool.query(
        `insert into cart_items
        (cart_id, product_id, quantity)
        values ($1, $2, $3)
        on conflict (cart_id, product_id)
        do update set quantity = cart_items.quantity + excluded.quantity
        returning *`,
        [
            cart_id,
            product_id,
            quantity || 1
        ]
    )

    return result.rows[0]
}

const getCart = async (user_id) => {
    const result = await pool.query(
        `select
            ci.cart_item_id,
            p.product_id,
            p.product_name,
            p.price,
            p.discount,
            p.image_url,
            ci.quantity,
            (p.price * ci.quantity) as total
         from cart c
         join cart_items ci
         on c.cart_id = ci.cart_id
         join products p
         on ci.product_id = p.product_id
         where c.user_id = $1
         and p.isactive = true
         order by ci.cart_item_id`,
        [user_id]
    )

    return result.rows
}

const updateCart = async (data) => {
    const {
        cart_item_id,
        quantity
    } = data

    const result = await pool.query(
        `update cart_items
         set quantity = $1,
             updatedon = current_timestamp
         where cart_item_id = $2
         returning *`,
        [
            quantity,
            cart_item_id
        ]
    )

    return result.rows[0]
}

const removeFromCart = async (data) => {
    const {
        cart_item_id
    } = data

    const result = await pool.query(
        `delete from cart_items
         where cart_item_id = $1
         returning *`,
        [cart_item_id]
    )

    return result.rows[0]
}

const wishlistToCart = async (data) => {
    const {
        user_id,
        product_id
    } = data

    return await addToCart({
        user_id,
        product_id,
        quantity: 1
    })
}

module.exports = {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    wishlistToCart
}