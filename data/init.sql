DROP DATABASE IF EXISTS tcc;
CREATE DATABASE tcc;
USE tcc;

CREATE TABLE IF NOT EXISTS `user` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `name` varchar(70) DEFAULT NULL,
  `username` varchar(70) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=5573 DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `state` (
  `id` int(6) NOT NULL,
  `name` varchar(70) NOT NULL,
  `sigla` varchar(2) NOT NULL,
  `center_lat` decimal(18,15) NOT NULL,
  `center_lng` decimal(18,15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`),
  UNIQUE KEY `sigla` (`sigla`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `city` (
  `id` int(6) NOT NULL,
  `name` varchar(70) NOT NULL,
  `stateID` int(6) DEFAULT NULL,
  `center_lat` decimal(18,15) DEFAULT NULL,
  `center_lng` decimal(18,15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `stateID` (`stateID`),
  CONSTRAINT `city_ibfk_1` FOREIGN KEY (`stateID`) REFERENCES `state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `equipment` (
  `deviceEUI` varchar(70) NOT NULL,
  `userID` int(6) NOT NULL,
  `lat` decimal(18,15) NOT NULL,
  `lng` decimal(18,15) NOT NULL,
  `cityID` int(6) NOT NULL,
  `stateID` int(6) NOT NULL,
  PRIMARY KEY (`deviceEUI`),
  UNIQUE KEY `deviceEUI` (`deviceEUI`),
  KEY `userID` (`userID`),
  KEY `cityID` (`cityID`),
  KEY `stateID` (`stateID`),
  CONSTRAINT `equipment_ibfk_1` FOREIGN KEY (`userID`) REFERENCES `user` (`id`),
  CONSTRAINT `equipment_ibfk_2` FOREIGN KEY (`cityID`) REFERENCES `city` (`id`),
  CONSTRAINT `equipment_ibfk_3` FOREIGN KEY (`stateID`) REFERENCES `state` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS `equipment_data` (
  `id` int(6) NOT NULL AUTO_INCREMENT,
  `deviceEUI` varchar(70) NOT NULL,
  `ph` float NOT NULL DEFAULT '0',
  `turbidity` float NOT NULL DEFAULT '0',
  `date` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `deviceEUI` (`deviceEUI`),
  CONSTRAINT `equipment_data_ibfk_1` FOREIGN KEY (`deviceEUI`) REFERENCES `equipment` (`deviceEUI`)
) ENGINE=InnoDB AUTO_INCREMENT=562575 DEFAULT CHARSET=utf8mb4;