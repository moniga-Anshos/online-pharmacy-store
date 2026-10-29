const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pool = require('./db'); // Ungaloda db.js pool-a inga import panrom

const userRouter = require('./Router/userRouter');
const productRouter = require('./Router/productRouter');
const wishlistRouter = require('./Router/wishlistRouter');
const cartRouter = require('./Router/cartRouter');
const orderRouter = require('./Router/orderRouter');
const adminRouter = require('./Router/adminRouter');

const app = express();
const PORT = process.env.PORT || 3000;

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

// 🛠️ Server start agum pothu Admin Table-aiyum User-aiyum Automatic-ah Create panra Function
const initializeDatabase = async () => {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS public.admin
            (
                admin_id serial NOT NULL,
                admin_name character varying(100) COLLATE pg_catalog."default" NOT NULL,
                email character varying(100) COLLATE pg_catalog."default" NOT NULL,
                password character varying(255) COLLATE pg_catalog."default" NOT NULL,
                isactive boolean DEFAULT true,
                createdon timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                updatedon timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT admin_pkey PRIMARY KEY (admin_id),
                CONSTRAINT admin_email_key UNIQUE (email)
            );
        `);

        // Admin User-a insert panrom (password: admin123-oda hashed version)
        await pool.query(`
            INSERT INTO public.admin (admin_name, email, password) 
            VALUES (
                'Admin', 
                'admin@gmail.com', 
                '$2b$10$wqM0/VBMzBW9V0cF4wOGMuJJrnBQno9b4vaoQCPPJ1t0PGUPlVZgi'
            )
            ON CONFLICT (email) DO UPDATE 
            SET password = '$2b$10$wqM0/VBMzBW9V0cF4wOGMuJJrnBQno9b4vaoQCPPJ1t0PGUPlVZgi';
        `);

        console.log('✅ Admin table and default admin user checked/created successfully.');
    } catch (err) {
        console.error('❌ Error initializing database:', err);
    }
};

// Start server and initialize DB
app.listen(PORT, async () => {
    console.log(`Server running on port ${PORT}`);
    await initializeDatabase();
});