const pool = require('../db')
const bcrypt = require('bcrypt')

const registerUser = async (data) => {
    const {
        user_name,
        email,
        phone,
        password
    } = data

    const hashedPassword = await bcrypt.hash(password, 10)

    const result = await pool.query(
        `insert into users
        (user_name, email, phone, password)
        values ($1, $2, $3, $4)
        returning user_id, user_name, email, phone`,
        [
            user_name,
            email,
            phone,
            hashedPassword
        ]
    )

    return result.rows[0]
}

const loginUser = async (data) => {
    const {
        email,
        password
    } = data

    const result = await pool.query(
        `select *
         from users
         where email = $1
         and isactive = true`,
        [email]
    )

    if (result.rows.length === 0) {
        return null
    }

    const user = result.rows[0]

    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    )

    if (!passwordMatch) {
        return null
    }

    delete user.password

    return user
}

const getProfile = async (user_id) => {
    const result = await pool.query(
        `select user_id, user_name, email, phone
         from users
         where user_id = $1
         and isactive = true`,
        [user_id]
    )

    return result.rows[0]
}

const updateProfile = async (user_id, data) => {
    const {
        user_name,
        phone
    } = data

    const result = await pool.query(
        `update users
         set user_name = $1,
             phone = $2,
             updatedon = current_timestamp
         where user_id = $3
         and isactive = true
         returning user_id, user_name, email, phone`,
        [
            user_name,
            phone,
            user_id
        ]
    )

    return result.rows[0]
}

const forgotPassword = async (data) => {
    const {
        email,
        new_password
    } = data

    const hashedPassword = await bcrypt.hash(
        new_password,
        10
    )

    const result = await pool.query(
        `update users
         set password = $1,
             updatedon = current_timestamp
         where email = $2
         and isactive = true`,
        [
            hashedPassword,
            email
        ]
    )

    if (result.rowCount === 0) {
        return 'Email not found'
    }

    return 'Password updated successfully'
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    forgotPassword
}