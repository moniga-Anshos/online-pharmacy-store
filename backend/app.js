
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const userRouter = require('./Router/userRouter');
const productRouter = require('./Router/productRouter');
const wishlistRouter = require('./Router/wishlistRouter');
const cartRouter = require('./Router/cartRouter');
const orderRouter = require('./Router/orderRouter');
const adminRouter = require('./Router/adminRouter');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Project paths
const backendPath = __dirname;
const parentPath = path.join(backendPath, '..');
const frontendPath = path.join(parentPath, 'frontend');

const userPath = path.join(frontendPath, 'user');
const adminPath = path.join(frontendPath, 'admin');

// Check frontend folders
console.log('Backend path:', backendPath);
console.log('Frontend path:', frontendPath);
console.log('Frontend exists:', fs.existsSync(frontendPath));
console.log('User folder exists:', fs.existsSync(userPath));
console.log('Admin folder exists:', fs.existsSync(adminPath));

// Serve frontend files
if (fs.existsSync(frontendPath)) {
    app.use(express.static(frontendPath));
}

if (fs.existsSync(userPath)) {
    app.use('/user', express.static(userPath));
}

if (fs.existsSync(adminPath)) {
    app.use('/admin', express.static(adminPath));
}

// Uploaded files
app.use(
    '/uploads',
    express.static(path.join(backendPath, 'uploads'))
);

// Backend routes
app.use('/user', userRouter);
app.use('/product', productRouter);
app.use('/wishlist', wishlistRouter);
app.use('/cart', cartRouter);
app.use('/order', orderRouter);
app.use('/admin', adminRouter);

// Home
app.get('/', (req, res) => {
    res.send('Online Pharmacy Store Backend Running');
});

// Handle unknown routes
app.use((req, res) => {
    res.status(404).send(`Cannot find: ${req.method} ${req.originalUrl}`);
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

