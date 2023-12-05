/*
  Warnings:

  - You are about to alter the column `step_no` on the `step` table. The data in that column could be lost. The data in that column will be cast from `VarChar(2)` to `Int`.
  - You are about to alter the column `waktu` on the `step` table. The data in that column could be lost. The data in that column will be cast from `VarChar(100)` to `Int`.

*/
-- AlterTable
ALTER TABLE `step` MODIFY `step_no` INTEGER NOT NULL,
    MODIFY `waktu` INTEGER NOT NULL;
