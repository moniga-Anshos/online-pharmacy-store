const pool = require('../db')

const addWishlist = async (data) => {
    const {
        user_id,
        product_id
    } = data

    const result = await pool.query(
        `insert into wishlist
        (user_id, product_id)
        values ($1, $2)
        returning *`,
        [
            user_id,
            product_id
        ]
    )

    return result.rows[0]
}

const getWishlist = async (user_id) => {
    const result = await pool.query(
        `select
            w.wishlist_id,
            p.product_id,
            p.product_name,
            p.price,
            p.image_url,
            p.discount
         from wishlist w
         join products p
         on w.product_id = p.product_id
         where w.user_id = $1
         and p.isactive = true
         order by w.wishlist_id desc`,
        [user_id]
    )

    return result.rows
}

const removeWishlist = async (data) => {
    const {
        user_id,
        product_id
    } = data

    const result = await pool.query(
        `delete from wishlist
         where user_id = $1
         and product_id = $2
         returning *`,
        [
            user_id,
            product_id
        ]
    )

    return result.rows[0]
}

module.exports = {
    addWishlist,
    getWishlist,
    removeWishlist
}