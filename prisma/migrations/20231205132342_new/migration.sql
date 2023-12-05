/*
  Warnings:

  - A unique constraint covering the columns `[nama_bahan]` on the table `bahan` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nama_resep]` on the table `resep` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `bahan_nama_bahan_key` ON `bahan`(`nama_bahan`);

-- CreateIndex
CREATE UNIQUE INDEX `resep_nama_resep_key` ON `resep`(`nama_resep`);
