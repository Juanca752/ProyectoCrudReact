-- -----------------------------------------------------
-- Crear base de datos (si no existe) y usarla
-- -----------------------------------------------------
CREATE DATABASE IF NOT EXISTS insurance_system;
USE insurance_system;

-- -----------------------------------------------------
-- Tabla: users
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

INSERT INTO `users`(`name`,`email`,`password`)
VALUES('carlos','email@gmail.com','$2a$10$cACiV3uaNsVvsEAMngbeWOnygwmFpl6ICaRxECWkuYmrk2u4ibxtu');
/*
initial pass "1234"
just replace the name and email
*/
-- -----------------------------------------------------
-- Tabla: clients
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS clients (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    rfc VARCHAR(13) NOT NULL,
    phone VARCHAR(20),
    email VARCHAR(100) NOT NULL,
    birth_date DATE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Tabla: insurers
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS insurers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Tabla: policy_types
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS policy_types (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Tabla: policies
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS policies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    policy_number VARCHAR(50) NOT NULL,
    insurer_id INT NOT NULL,
    client_id INT NOT NULL,
    policy_type_id INT NOT NULL,
    payment_frequency VARCHAR(50) NOT NULL,   -- e.g. monthly, quarterly, yearly
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    start_date DATE NOT NULL,
    end_date DATE,
    comments TEXT,
    file_path VARCHAR(255),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_policies_insurer
        FOREIGN KEY (insurer_id) REFERENCES insurers(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    CONSTRAINT fk_policies_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    CONSTRAINT fk_policies_policy_type
        FOREIGN KEY (policy_type_id) REFERENCES policy_types(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------
-- Tabla: invoices
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS invoices (
    id INT AUTO_INCREMENT PRIMARY KEY,
    policy_id INT NOT NULL,
    user_id INT NOT NULL,
    client_id INT NOT NULL,
    total DECIMAL(10,2) NOT NULL DEFAULT 0,
    issue_date DATE NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    CONSTRAINT fk_invoices_policy
        FOREIGN KEY (policy_id) REFERENCES policies(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    CONSTRAINT fk_invoices_user
        FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE ON UPDATE CASCADE,
        
    CONSTRAINT fk_invoices_client
        FOREIGN KEY (client_id) REFERENCES clients(id)
        ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;
