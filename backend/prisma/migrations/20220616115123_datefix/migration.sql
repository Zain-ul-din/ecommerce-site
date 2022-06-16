/*
  Warnings:

  - You are about to drop the column `product_id` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `category` DROP COLUMN `product_id`;

-- AlterTable
ALTER TABLE `product` MODIFY `createdAt` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `reply` MODIFY `createdAt` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `review` MODIFY `createdAt` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `createdAt` VARCHAR(191) NOT NULL,
    MODIFY `updatedAt` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';
