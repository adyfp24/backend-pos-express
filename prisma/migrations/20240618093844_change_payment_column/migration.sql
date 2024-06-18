/*
  Warnings:

  - You are about to drop the column `uangMasuk` on the `payments` table. All the data in the column will be lost.
  - Added the required column `uang_masuk` to the `payments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `payments` DROP COLUMN `uangMasuk`,
    ADD COLUMN `uang_masuk` DOUBLE NOT NULL;
