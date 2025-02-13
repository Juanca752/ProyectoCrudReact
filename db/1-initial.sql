CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    type BOOLEAN DEFAULT FALSE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


INSERT INTO `users`(`name`,`email`,`type`,`password`)
VALUES('carlos','email@gmail.com',1,'$2a$10$cACiV3uaNsVvsEAMngbeWOnygwmFpl6ICaRxECWkuYmrk2u4ibxtu');
/*
initial pass "1234"
just replace the name and email
*/
