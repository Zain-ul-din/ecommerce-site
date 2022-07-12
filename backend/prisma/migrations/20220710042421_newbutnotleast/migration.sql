/*
  Warnings:

  - A unique constraint covering the columns `[name,superCategoryName]` on the table `Category` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Category_id_superCategory_id_name_key` ON `category`;

-- AlterTable
ALTER TABLE `user` MODIFY `name` VARCHAR(256) NOT NULL DEFAULT 'NULL';

-- CreateIndex
CREATE UNIQUE INDEX `Category_name_superCategoryName_key` ON `Category`(`name`, `superCategoryName`);
