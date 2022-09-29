CREATE TABLE users (
    userid int PRIMARY KEY NOT NULL,
    email varchar(50) NOT NULL,
    admin boolean NOT NULL,
    password varchar(200) NOT NULL,
    password_salt varchar(200) NOT NULL,
    username varchar(50) NOT NULL,
    avarage_score INT NOT NULL,
    forgot_password_token varchar(11),
    super_admin boolean NOT NULL
);

INSERT INTO users VALUES 
    (1, 'sechaba@gmail.com', true, 'pass', 'salt', 'username', 55, '', false),
    (2, 'raymond@gmail.com', false, 'p@ss', 'salt', 'raymond', 0, '', false),
    (3, 'sihle@gmail.com', false, 'pa$$', 'salt', 'sihle', 0, '', True);

CREATE TABLE image (
    id int NOT NULL,
    image_path varchar(200) NOT NULL,
    character varchar(20) NOT NULL,
    score int,
    writing_style varchar(50)
);

INSERT INTO image VALUES 
    (1, '/users/82/A.png', 'A', 5, 'hiragana'),
    (2, '/users/82/A.png', 'A', 43, 'hiragana');

CREATE TABLE models (
    id serial PRIMARY KEY NOT NULL,
    version varchar,
    style varchar,
    date varchar,
    loss varchar,
    accuracy varchar
);

INSERT INTO models VALUES
    (1, 'beta_model', 'hiragana', '2022-02-18', '23,35%', '95,34%'),
    (2, 'beta_model', 'kanji', '2022-02-19', '33,35%', '85,34%'),
    (3, 'beta_model', 'katakana', '2022-02-20', '13,35%', '93,34%');