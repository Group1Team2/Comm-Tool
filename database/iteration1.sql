



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'ChatRoom'
-- 
-- ---

DROP TABLE IF EXISTS `ChatRoom`;
    
CREATE TABLE `ChatRoom` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `private` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'ChatMessage'
-- 
-- ---

DROP TABLE IF EXISTS `ChatMessage`;
    
CREATE TABLE `ChatMessage` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `message` VARCHAR(2000) NULL DEFAULT NULL,
  `time` DATETIME NULL DEFAULT NULL,
  `room_id` INTEGER NULL DEFAULT NULL,
  `user_id` INTEGER NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'ChatUser'
-- 
-- ---

DROP TABLE IF EXISTS `ChatUser`;
    
CREATE TABLE `ChatUser` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(100) NULL DEFAULT NULL,
  `online` TINYINT(1) NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'UserRooms'
-- 
-- ---

DROP TABLE IF EXISTS `UserRooms`;
    
CREATE TABLE `UserRooms` (
  `user_id` INTEGER NULL DEFAULT NULL,
  `room_id` INTEGER NULL DEFAULT NULL,
  `last_seen` DATETIME NULL DEFAULT NULL,
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `ChatMessage` ADD FOREIGN KEY (room_id) REFERENCES `ChatRoom` (`id`);
ALTER TABLE `ChatMessage` ADD FOREIGN KEY (user_id) REFERENCES `ChatUser` (`id`);
ALTER TABLE `UserRooms` ADD FOREIGN KEY (user_id) REFERENCES `ChatUser` (`id`);
ALTER TABLE `UserRooms` ADD FOREIGN KEY (room_id) REFERENCES `ChatRoom` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `ChatRoom` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ChatMessage` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `ChatUser` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `UserRooms` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `ChatRoom` (`id`,`name`,`description`,`private`) VALUES
-- ('','','','');
-- INSERT INTO `ChatMessage` (`id`,`message`,`time`,`room_id`,`user_id`) VALUES
-- ('','','','','');
-- INSERT INTO `ChatUser` (`id`,`name`,`online`) VALUES
-- ('','','');
-- INSERT INTO `UserRooms` (`user_id`,`room_id`,`last_seen`,`id`) VALUES
-- ('','','','');

