DROP DATABASE IF EXISTS tcc;
CREATE DATABASE tcc;
USE tcc;

CREATE TABLE user (
	id INT(6) AUTO_INCREMENT PRIMARY KEY,
	username VARCHAR(70) UNIQUE NOT NULL,
	password VARCHAR(60) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE state (
	id INT(6) PRIMARY KEY,
	name VARCHAR(70) UNIQUE NOT NULL,
	sigla VARCHAR(2) UNIQUE NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE city (
	id INT(6) PRIMARY KEY,
	name VARCHAR(70) NOT NULL,
	stateID INT(6),
	FOREIGN KEY (stateID) REFERENCES state(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE equipment (
	deviceEUI VARCHAR(70) UNIQUE PRIMARY KEY,
	userID INT(6) NOT NULL,
	lat DECIMAL(18,15) NOT NULL, 
    lng DECIMAL(18,15) NOT NULL,
	cityID INT(6) NOT NULL,
	stateID INT(6) NOT NULL,
	FOREIGN KEY (userID) REFERENCES user(id),
	FOREIGN KEY (cityID) REFERENCES city(id),
	FOREIGN KEY (stateID) REFERENCES state(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE equipment_data (
	id INT(6) AUTO_INCREMENT PRIMARY KEY,
	deviceEUI VARCHAR(70) NOT NULL,
	ph INT(3) NOT NULL,
    turbidity INT(3) NOT NULL,
	date DATETIME DEFAULT CURRENT_TIMESTAMP, 
	FOREIGN KEY (deviceEUI) REFERENCES equipment(deviceEUI)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;