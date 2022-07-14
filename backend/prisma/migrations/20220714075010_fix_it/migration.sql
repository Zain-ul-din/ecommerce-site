/*
  Warnings:

  - Added the required column `user_id` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` MODIFY `deliveredAt` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `shippingaddress` ADD COLUMN `user_id` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(256) NOT NULL DEFAULT 'NULL';
