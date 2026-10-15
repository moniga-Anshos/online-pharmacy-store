//users
create table users (
    user_id serial primary key,
    user_name varchar(100) not null,
    email varchar(100) unique not null,
    phone varchar(15),
    password varchar(255) not null,
    isactive boolean default true,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);

//categories
create table categories (
    category_id serial primary key,
    category_name varchar(100) unique not null,
    description varchar(255),
    isactive boolean default true,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);

//products
create table products (
    product_id serial primary key,
    category_id int references categories(category_id),
    product_name varchar(150) not null,
    description text,
    price numeric(10,2) not null,
    stock int default 0,
    image_url varchar(255),
    discount numeric(5,2) default 0,
    isactive boolean default true,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);

//wishlist
create table wishlist (
    wishlist_id serial primary key,
    user_id int references users(user_id),
    product_id int references products(product_id),
    createdon timestamp default current_timestamp,
    unique(user_id, product_id)
);

//Cart
create table cart (
    cart_id serial primary key,
    user_id int unique references users(user_id),
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);

//cart_items
create table cart_items (
    cart_item_id serial primary key,
    cart_id int references cart(cart_id),
    product_id int references products(product_id),
    quantity int default 1,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp,
    unique(cart_id, product_id)
);

//addresses
create table addresses (
    address_id serial primary key,
    user_id int references users(user_id),
    address_line1 varchar(255) not null,
    address_line2 varchar(255),
    city varchar(100) not null,
    state varchar(100) not null,
    pincode varchar(10) not null,
    isdefault boolean default false,
    isactive boolean default true,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);
alter table addresses
drop column address_line1;

alter table addresses
drop column address_line2;

alter table addresses
add column phone varchar(15);

alter table addresses
add column address varchar(255);
alter table addresses
add column payment_method varchar(30);

//order
create table orders (
    order_id serial primary key,
    user_id int references users(user_id),
    address_id int references addresses(address_id),
    total_amount numeric(10,2) not null,
    discount_amount numeric(10,2) default 0,
    final_amount numeric(10,2) not null,
    payment_status varchar(30) default 'pending',
    order_status varchar(30) default 'pending',
    expected_delivery_date date,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);
alter table orders
add column payment_method varchar(30);


//order_items
create table order_items (
    order_item_id serial primary key,
    order_id int references orders(order_id),
    product_id int references products(product_id),
    quantity int not null,
    price numeric(10,2) not null,
    createdon timestamp default current_timestamp
);

//payments
create table payments (
    payment_id serial primary key,
    order_id int unique references orders(order_id),
    payment_method varchar(30) not null,
    transaction_id varchar(100),
    amount numeric(10,2) not null,
    payment_status varchar(30) default 'pending',
    paidon timestamp,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);

//discounts
create table discounts (
    discount_id serial primary key,
    discount_code varchar(50) unique not null,
    discount_type varchar(20) not null,
    discount_value numeric(10,2) not null,
    minimum_amount numeric(10,2) default 0,
    start_date date,
    end_date date,
    isactive boolean default true,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);