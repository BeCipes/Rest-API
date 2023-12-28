/*
  Warnings:

  - You are about to alter the column `gambar` on the `artikel` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Json`.
  - You are about to alter the column `gizi` on the `bahan` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Json`.
  - A unique constraint covering the columns `[gambar]` on the table `step` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[cover]` on the table `teknik` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `artikel` MODIFY `gambar` JSON NOT NULL;

-- AlterTable
ALTER TABLE `bahan` MODIFY `gambar` VARCHAR(255) NOT NULL,
    MODIFY `gizi` JSON NOT NULL;

-- AlterTable
ALTER TABLE `step` ADD COLUMN `gambar` VARCHAR(255) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `step_gambar_key` ON `step`(`gambar`);

-- CreateIndex
CREATE UNIQUE INDEX `teknik_cover_key` ON `teknik`(`cover`);
