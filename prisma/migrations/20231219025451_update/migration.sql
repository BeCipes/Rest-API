/*
  Warnings:

  - You are about to alter the column `bahan` on the `resep` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Json`.
  - You are about to alter the column `informasi_gizi` on the `resep` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `Json`.

*/
-- AlterTable
ALTER TABLE `resep` MODIFY `bahan` JSON NOT NULL,
    MODIFY `informasi_gizi` JSON NOT NULL;
