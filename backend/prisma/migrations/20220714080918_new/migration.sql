/*
  Warnings:

  - You are about to drop the column `order_id` on the `shippingaddress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `ShippingAddress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `orderId` to the `ShippingAddress` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `shippingaddress` DROP FOREIGN KEY `ShippingAddress_order_id_fkey`;

-- AlterTable
ALTER TABLE `order` MODIFY `deliveredAt` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `shippingaddress` DROP COLUMN `order_id`,
    ADD COLUMN `orderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(256) NOT NULL DEFAULT 'NULL';

-- CreateIndex
CREATE UNIQUE INDEX `ShippingAddress_orderId_key` ON `ShippingAddress`(`orderId`);

-- AddForeignKey
ALTER TABLE `ShippingAddress` ADD CONSTRAINT `ShippingAddress_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
