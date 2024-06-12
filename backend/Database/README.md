Tabla de users opcional para futuro desarrollo

CREATE TABLE Users (
id_user INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(255) NOT NULL,
email VARCHAR(255) NOT NULL UNIQUE,
password VARCHAR(255) NOT NULL,
address VARCHAR(255),
city VARCHAR(100),
country VARCHAR(100),
phone_number VARCHAR(20),
date_of_birth DATE,
gender ENUM('Male', 'Female', 'Other'),
createdAt DATETIME DEFAULT CURRENT_TIMESTAMP NOT NULL
);
