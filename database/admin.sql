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

//admin
create table admin (
    admin_id serial primary key,
    admin_name varchar(100) not null,
    email varchar(100) unique not null,
    password varchar(255) not null,
    isactive boolean default true,
    createdon timestamp default current_timestamp,
    updatedon timestamp default current_timestamp
);

insert into admin
(admin_name, email, password)
values
(
    'Admin',
    'admin@gmail.com',
    '$2b$10$DM0bWD9fBpLksH489dmNKuivjvjDTuLjB3PvqNscRC5g/gk99C9KC'
);

select * from admin;