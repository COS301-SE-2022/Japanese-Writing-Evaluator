CREATE TABLE users (
    userid int PRIMARY KEY NOT NULL,
    email varchar(50) NOT NULL,
    admin boolean NOT NULL,
    password varchar(200) NOT NULL,
    password_salt varchar(200) NOT NULL,
    username varchar(50) NOT NULL,
    forgot_password_token varchar(11)
);

INSERT INTO users VALUES (
    (1, 'sechaba@gmail.com', true, 'pass', 'salt', 'username', ''),
    (2, 'raymond@gmail.com', true, 'p@ss', 'salt', 'raymond', ''),
    (3, 'sihle@gmail.com', true, 'pa$$', 'salt', 'sihle', '')
);

CREATE TABLE image (
    id int NOT NULL,
    image_path varchar(200) NOT NULL,
    character varchar(20) NOT NULL,
    score int,
    writing_style varchar(50),
    upload_date date
);

INSERT INTO image VALUES (
    (1, '1/folder', 'A', 5, 'hiragana', 2022-07-01),
    (2, '1/folder', '', 'p@ss', 'salt', 'raymond', ''),
    (3, 'sihle@gmail.com', true, 'pa$$', 'salt', 'sihle', '')
);

CREATE TABLE models (
    id serial PRIMARY KEY NOT NULL,
    version varchar,
    style varchar,
    date varchar,
    loss varchar,
    accuracy varchar
);