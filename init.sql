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
  artist VARCHAR(255) NOT NULL,
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

INSERT INTO store_items (name, artist, price, image_path) VALUES
('Debut', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311266/debut_ryoglb.jpg'),
('Fearless (Taylors Version)', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308899/fearless_i05xj6.png'),
('Speak Now (Taylors Version)', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308900/speak-now_tyrdhk.png'),
('Red (Taylors Version)', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308900/red_jkzupi.png'),
('1989 (Taylors Version)', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308902/1989_iawajp.png'),
('Reputation', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308902/reputation_zzqwbm.png'),
('Lover', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308903/lover_u1xbgk.png'),
('Folklore', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308904/folklore_pmit24.png'),
('Evermore', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308900/evermore_o7q3yf.png'),
('Midnights', 'Taylor Swift', 19.89, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758308900/midnights_bkevpm.png'),
('Hurt Somebody', 'Noah Kahan', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311267/nkhs_thkvrp.jpg'),
('Busyhead', 'Noah Kahan', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311267/nkbh_xz7a0c.jpg'),
('I Was/I Am', 'Noah Kahan', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311267/nkiwia_pqqe67.jpg'),
('Stick Season', 'Noah Kahan', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311268/nkss_bc1rr4.jpg'),
('Forever', 'Noah Kahan', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311266/4ever_hkbyrk.png'),
('How To Be Human', 'Chelsea Cutler', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311266/cchtbh_cncwen.jpg'),
('Stellaria', 'Chelsea Cutler', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311266/ccs_nfvzb9.jpg'),
('The Good Witch', 'Maisie Peters', 25.00, 'https://res.cloudinary.com/dsxkgilnb/image/upload/v1758311266/mape_qj5jmq.jpg');



ALTER USER 'root'@'localhost' IDENTIFIED WITH caching_sha2_password BY 'Pass@123';

-- DROP TABLE USERS;