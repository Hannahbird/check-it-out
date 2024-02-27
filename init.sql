CREATE DATABASE IF NOT EXISTS store;
USE store;

CREATE TABLE IF NOT EXISTS test (
  id INT PRIMARY KEY,
  name VARCHAR(255),
  description TEXT
);

CREATE TABLE IF NOT EXISTS store_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_path VARCHAR(255) NOT NULL,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS cart (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  item_id INT,
  quantity INT,
  client_identifier VARCHAR(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (item_id) REFERENCES store_items(id),
  createdAt timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO store_items (name, price, image_path) VALUES
('Fearless (Taylors Version)', 19.89, 'https://checkitout-store.s3.amazonaws.com/fearless.png'),
('Speak Now (Taylors Version)', 19.89, 'https://checkitout-store.s3.amazonaws.com/speak-now.png'),
('Red (Taylors Version)', 19.89, 'https://checkitout-store.s3.amazonaws.com/red.png'),
('1989 (Taylors Version)', 19.89, 'https://checkitout-store.s3.amazonaws.com/1989.png'),
('Reputation', 19.89, 'https://checkitout-store.s3.amazonaws.com/reputation.png'),
('Lover', 19.89, 'https://checkitout-store.s3.amazonaws.com/lover.png'),
('Folklore', 19.89, 'https://checkitout-store.s3.amazonaws.com/folklore.png'),
('Evermore', 19.89, 'https://checkitout-store.s3.amazonaws.com/evermore.png'),
('Midnights', 19.89, 'https://checkitout-store.s3.amazonaws.com/midnights.png');

ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'Pass@123';

-- DROP TABLE USERS;