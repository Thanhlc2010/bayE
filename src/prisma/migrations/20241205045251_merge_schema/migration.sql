/*
  Warnings:

  - You are about to drop the `Car` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TestDriveRequest` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Car` DROP FOREIGN KEY `Car_userId_fkey`;

-- DropForeignKey
ALTER TABLE `TestDriveRequest` DROP FOREIGN KEY `TestDriveRequest_carId_fkey`;

-- DropForeignKey
ALTER TABLE `TestDriveRequest` DROP FOREIGN KEY `TestDriveRequest_userId_fkey`;

-- DropTable
DROP TABLE `Car`;

-- DropTable
DROP TABLE `TestDriveRequest`;

-- DropTable
DROP TABLE `User`;

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
    `Gearbox` VARCHAR(20) NOT NULL,
    `FuelType` VARCHAR(20) NOT NULL,
    `Description` TEXT NOT NULL,
    `FactoryYear` INTEGER UNSIGNED NOT NULL,
    `KilometersCount` INTEGER UNSIGNED NOT NULL,
    `NumberOwners` INTEGER UNSIGNED NOT NULL,
    `LicensePlate` VARCHAR(11) NOT NULL,
    `RegistrationStatus` ENUM('remaining', 'expired') NOT NULL,
    `MadeIn` ENUM('Vietnam', 'India', 'SouthKorea', 'Thailand', 'Japan', 'China', 'USA', 'Germany', 'Taiwan') NOT NULL,
    `EngineCapacity` DECIMAL(10, 1) NOT NULL,
    `SeatNumber` INTEGER UNSIGNED NOT NULL,
    `DoorNumber` INTEGER UNSIGNED NOT NULL,
    `Weight` DECIMAL(10, 2) NOT NULL,
    `InstallmentLengthMin` INTEGER UNSIGNED NOT NULL,
    `InstallmentLengthMax` INTEGER UNSIGNED NOT NULL,
    `InterestRateMin` INTEGER UNSIGNED NOT NULL,
    `InterestRateMax` INTEGER UNSIGNED NOT NULL,
    `MonthlyInstallmentMin` INTEGER UNSIGNED NOT NULL,
    `MonthlyInstallmentMax` INTEGER UNSIGNED NOT NULL,
    `Title` TEXT NOT NULL,
    `Status` ENUM('sold', 'selling') NOT NULL DEFAULT 'selling',
    `Condition` ENUM('NEW', 'USED') NOT NULL,
    `Price` DECIMAL(20, 2) NOT NULL,
    `SellerID` INTEGER UNSIGNED NULL,
    `BuyerID` INTEGER UNSIGNED NULL,
    `CreatedAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `SoldAt` TIMESTAMP(0) NULL,
    `images` JSON NOT NULL,

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
    `address` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `name` VARCHAR(191) NULL,
    `surname` VARCHAR(191) NULL,

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
    `Phone` VARCHAR(13) NULL,
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
