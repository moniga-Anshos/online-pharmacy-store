const pool = require('../db')


// Get Products
const getProducts = async () => {

    const result = await pool.query(
        `select
            p.product_id,
            p.category_id,
            p.product_name,
            p.description,
            p.price,
            p.stock,
            p.image_url,
            p.discount,
            c.category_name
         from products p
         left join categories c
         on p.category_id = c.category_id
         where p.isactive = true
         order by p.product_id`
    )

    return result.rows
}


// Get Single Product
const getProduct = async (product_id) => {

    const result = await pool.query(
        `select
            p.product_id,
            p.category_id,
            p.product_name,
            p.description,
            p.price,
            p.stock,
            p.image_url,
            p.discount,
            c.category_name
         from products p
         left join categories c
         on p.category_id = c.category_id
         where p.product_id = $1
         and p.isactive = true`,
        [product_id]
    )

    return result.rows[0]
}


// Search Products
const searchProducts = async (name) => {

    const result = await pool.query(
        `select
            p.product_id,
            p.category_id,
            p.product_name,
            p.description,
            p.price,
            p.stock,
            p.image_url,
            p.discount,
            c.category_name
         from products p
         left join categories c
         on p.category_id = c.category_id
         where p.product_name ilike $1
         and p.isactive = true`,
        [`%${name}%`]
    )

    return result.rows
}


// Add Product
const addProduct = async (data) => {

    const {
        category_id,
        product_name,
        description,
        price,
        stock,
        discount,
        image_url
    } = data

    const result = await pool.query(
        `insert into products
        (
            category_id,
            product_name,
            description,
            price,
            stock,
            image_url,
            discount
        )
        values
        ($1, $2, $3, $4, $5, $6, $7)
        returning *`,
        [
            category_id,
            product_name,
            description,
            price,
            stock,
            image_url,
            discount
        ]
    )

    return result.rows[0]
}


// Update Product
const updateProduct = async (product_id, data) => {

    const {
        category_id,
        product_name,
        description,
        price,
        stock,
        discount,
        image_url
    } = data


    let result

    if (image_url) {

        result = await pool.query(
            `update products
             set
                category_id = $1,
                product_name = $2,
                description = $3,
                price = $4,
                stock = $5,
                discount = $6,
                image_url = $7,
                updatedon = current_timestamp
             where product_id = $8
             and isactive = true
             returning *`,
            [
                category_id,
                product_name,
                description,
                price,
                stock,
                discount,
                image_url,
                product_id
            ]
        )

    } else {

        result = await pool.query(
            `update products
             set
                category_id = $1,
                product_name = $2,
                description = $3,
                price = $4,
                stock = $5,
                discount = $6,
                updatedon = current_timestamp
             where product_id = $7
             and isactive = true
             returning *`,
            [
                category_id,
                product_name,
                description,
                price,
                stock,
                discount,
                product_id
            ]
        )

    }

    return result.rows[0]
}


// Delete Product
const deleteProduct = async (product_id) => {

    const result = await pool.query(
        `update products
         set
            isactive = false,
            updatedon = current_timestamp
         where product_id = $1
         and isactive = true
         returning *`,
        [product_id]
    )

    return result.rows[0]
}


// Update Stock
const updateStock = async (product_id, stock) => {

    const result = await pool.query(
        `update products
         set
            stock = $1,
            updatedon = current_timestamp
         where product_id = $2
         and isactive = true
         returning *`,
        [
            stock,
            product_id
        ]
    )

    return result.rows[0]
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