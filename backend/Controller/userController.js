const userModel = require('../Model/userModel')

const registerUser = async (req, res) => {
    try {
        const result = await userModel.registerUser(req.body)

        res.json({
            status: 'success',
            message: 'User registered successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Registration failed',
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const result = await userModel.loginUser(req.body)

        if (!result) {
            return res.status(401).json({
                status: 'failed',
                message: 'Invalid email or password'
            })
        }

        res.json({
            status: 'success',
            message: 'Login successful',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Login failed',
            error: error.message
        })
    }
}

const getProfile = async (req, res) => {
    try {
        const result = await userModel.getProfile(req.params.user_id)

        res.json({
            status: 'success',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Failed to get profile',
            error: error.message
        })
    }
}

const updateProfile = async (req, res) => {
    try {
        const result = await userModel.updateProfile(
            req.params.user_id,
            req.body
        )

        res.json({
            status: 'success',
            message: 'Profile updated successfully',
            data: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Profile update failed',
            error: error.message
        })
    }
}

const forgotPassword = async (req, res) => {
    try {
        const result = await userModel.forgotPassword(req.body)

        res.json({
            status: 'success',
            message: result
        })
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            message: 'Password reset failed',
            error: error.message
        })
    }
}

module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
    forgotPassword
}