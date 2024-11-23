/*
  Warnings:

  - You are about to drop the `car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `testdriverequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `car` DROP FOREIGN KEY `Car_userId_fkey`;

-- DropForeignKey
ALTER TABLE `testdriverequest` DROP FOREIGN KEY `TestDriveRequest_carId_fkey`;

-- DropForeignKey
ALTER TABLE `testdriverequest` DROP FOREIGN KEY `TestDriveRequest_userId_fkey`;

-- DropTable
DROP TABLE `car`;

-- DropTable
DROP TABLE `testdriverequest`;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `carmakes` (
    `MakeID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Name`(`Name`),
    PRIMARY KEY (`MakeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carmodels` (
    `ModelID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `MakeID` INTEGER UNSIGNED NULL,
    `Name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Name`(`Name`),
    INDEX `MakeID`(`MakeID`),
    PRIMARY KEY (`ModelID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favourites` (
    `BuyerID` INTEGER UNSIGNED NOT NULL,
    `CarID` INTEGER UNSIGNED NOT NULL,
    `CreatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `BuyerID`(`BuyerID`),
    INDEX `CarID`(`CarID`),
    PRIMARY KEY (`BuyerID`, `CarID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cars` (
    `CarID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `MakeID` INTEGER UNSIGNED NULL,
    `ModelID` INTEGER UNSIGNED NULL,
    `Year` INTEGER NOT NULL,
    `Condition` ENUM('NEW', 'USED') NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `Status` VARCHAR(20) NULL,
    `SellerID` INTEGER UNSIGNED NULL,
    `BuyerID` INTEGER UNSIGNED NULL,
    `CreatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `SoldAt` TIMESTAMP(0) NULL,

    INDEX `BuyerID`(`BuyerID`),
    INDEX `MakeID`(`MakeID`),
    INDEX `ModelID`(`ModelID`),
    INDEX `SellerID`(`SellerID`),
    PRIMARY KEY (`CarID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cartags` (
    `CarID` INTEGER UNSIGNED NOT NULL,
    `TagID` INTEGER UNSIGNED NOT NULL,

    INDEX `TagID`(`TagID`),
    PRIMARY KEY (`CarID`, `TagID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tags` (
    `TagID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Name` VARCHAR(50) NOT NULL,

    UNIQUE INDEX `Name`(`Name`),
    PRIMARY KEY (`TagID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `testdriverequests` (
    `requestId` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `buyerId` INTEGER UNSIGNED NOT NULL,
    `carId` INTEGER UNSIGNED NOT NULL,
    `status` ENUM('pending', 'processed') NOT NULL DEFAULT 'pending',
    `requestDate` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `responseDate` TIMESTAMP(0) NULL,

    INDEX `buyerId`(`buyerId`),
    INDEX `carId`(`carId`),
    PRIMARY KEY (`requestId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `UserID` INTEGER UNSIGNED NOT NULL AUTO_INCREMENT,
    `Email` VARCHAR(255) NOT NULL,
    `PasswordHash` TEXT NOT NULL,
    `Name` VARCHAR(100) NULL,
    `Role` ENUM('ADMIN', 'SELLER', 'BUYER') NOT NULL DEFAULT 'BUYER',
    `CreatedAt` TIMESTAMP(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    UNIQUE INDEX `Email`(`Email`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `carmodels` ADD CONSTRAINT `carmodels_ibfk_1` FOREIGN KEY (`MakeID`) REFERENCES `carmakes`(`MakeID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favourites` ADD CONSTRAINT `favourites_ibfk_1` FOREIGN KEY (`BuyerID`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favourites` ADD CONSTRAINT `favourites_ibfk_2` FOREIGN KEY (`CarID`) REFERENCES `cars`(`CarID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`MakeID`) REFERENCES `carmakes`(`MakeID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`ModelID`) REFERENCES `carmodels`(`ModelID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_ibfk_3` FOREIGN KEY (`SellerID`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cars` ADD CONSTRAINT `cars_ibfk_4` FOREIGN KEY (`BuyerID`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cartags` ADD CONSTRAINT `cartags_ibfk_1` FOREIGN KEY (`CarID`) REFERENCES `cars`(`CarID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cartags` ADD CONSTRAINT `cartags_ibfk_2` FOREIGN KEY (`TagID`) REFERENCES `tags`(`TagID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testdriverequests` ADD CONSTRAINT `testdriverequests_ibfk_1` FOREIGN KEY (`buyerId`) REFERENCES `users`(`UserID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `testdriverequests` ADD CONSTRAINT `testdriverequests_ibfk_2` FOREIGN KEY (`carId`) REFERENCES `cars`(`CarID`) ON DELETE CASCADE ON UPDATE CASCADE;
