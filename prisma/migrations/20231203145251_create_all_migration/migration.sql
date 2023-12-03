-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_role` INTEGER NOT NULL,
    `first_name` VARCHAR(100) NOT NULL,
    `last_name` VARCHAR(100) NOT NULL,
    `password` VARCHAR(100) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `photo` VARCHAR(191) NULL,
    `token` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `users_email_key`(`email`),
    UNIQUE INDEX `users_photo_key`(`photo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `role_name` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `role_role_name_key`(`role_name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `favorite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_user` INTEGER NOT NULL,
    `id_resep` INTEGER NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_kategori` VARCHAR(100) NOT NULL,
    `gambar` VARCHAR(100) NULL,
    `id_jenis` INTEGER NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `kategori_nama_kategori_key`(`nama_kategori`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `jenis_kategori` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_jenis` VARCHAR(100) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `jenis_kategori_nama_jenis_key`(`nama_jenis`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `kategori_resep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_kategori` INTEGER NOT NULL,
    `id_resep` INTEGER NOT NULL,
    `nama_jenis` VARCHAR(100) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `kategori_resep_nama_jenis_key`(`nama_jenis`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `bahan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_bahan` VARCHAR(100) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,
    `gambar` VARCHAR(100) NOT NULL,
    `gizi` VARCHAR(100) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resep` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_resep` VARCHAR(100) NOT NULL,
    `deskripsi` VARCHAR(255) NOT NULL,
    `gambar` VARCHAR(100) NOT NULL,
    `bahan` VARCHAR(255) NOT NULL,
    `informasi_gizi` VARCHAR(255) NOT NULL,
    `id_kategori` INTEGER NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `step` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_resep` INTEGER NOT NULL,
    `step_no` VARCHAR(2) NOT NULL,
    `step_desc` VARCHAR(255) NOT NULL,
    `waktu` VARCHAR(100) NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `artikel` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `headline` VARCHAR(100) NOT NULL,
    `gambar` VARCHAR(100) NOT NULL,
    `isi` VARCHAR(100) NOT NULL,
    `penulis` VARCHAR(100) NOT NULL,
    `id_kategori` INTEGER NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `teknik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `description` VARCHAR(100) NOT NULL,
    `cover` VARCHAR(100) NOT NULL,
    `url` VARCHAR(100) NOT NULL,
    `sumber` VARCHAR(100) NOT NULL,
    `id_kategori` INTEGER NOT NULL,
    `createdBy` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_id_role_fkey` FOREIGN KEY (`id_role`) REFERENCES `role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_id_resep_fkey` FOREIGN KEY (`id_resep`) REFERENCES `resep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `favorite` ADD CONSTRAINT `favorite_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori` ADD CONSTRAINT `kategori_id_jenis_fkey` FOREIGN KEY (`id_jenis`) REFERENCES `jenis_kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori` ADD CONSTRAINT `kategori_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `jenis_kategori` ADD CONSTRAINT `jenis_kategori_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_resep` ADD CONSTRAINT `kategori_resep_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_resep` ADD CONSTRAINT `kategori_resep_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `kategori_resep` ADD CONSTRAINT `kategori_resep_id_resep_fkey` FOREIGN KEY (`id_resep`) REFERENCES `resep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `bahan` ADD CONSTRAINT `bahan_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resep` ADD CONSTRAINT `resep_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resep` ADD CONSTRAINT `resep_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `step` ADD CONSTRAINT `step_id_resep_fkey` FOREIGN KEY (`id_resep`) REFERENCES `resep`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `step` ADD CONSTRAINT `step_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `artikel` ADD CONSTRAINT `artikel_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teknik` ADD CONSTRAINT `teknik_id_kategori_fkey` FOREIGN KEY (`id_kategori`) REFERENCES `kategori`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `teknik` ADD CONSTRAINT `teknik_createdBy_fkey` FOREIGN KEY (`createdBy`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
