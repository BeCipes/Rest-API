import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createKategoriResepValidation, updateKategoriResepValidation, getKategoriResepValidation } from "../validation/kategori_resep-validation.js"

const create = async (req) => {
    const kategoriResep = validate(createKategoriResepValidation, req)

    const countKategoriResep = await prismaClient.kategori_resep.count({
        where: {
            id_kategori: kategoriResep.id_kategori,
            id_resep: kategoriResep.id_resep
        }
    })

    if (countKategoriResep === 1) {
        throw new ResponseError(400, "Kategori Resep already exists")
    }

    const countUser = await prismaClient.user.count({
        where: {
            id: req.createdBy
        }
    })

    if (countUser === 0) {
        throw new ResponseError(404, "User is not found")
    }

    return prismaClient.kategori_resep.create({
        data: kategoriResep,
        select: {
            kategori: {
                select: {
                    id: true,
                    nama_kategori: true,
                    gambar: true
                }
            },
            resep: {
                select: {
                    id: true,
                    nama_resep: true,
                    deskripsi: true,
                    gambar: true,
                    bahan: true,
                    informasi_gizi: true
                }
            }
        }
    })
}

const update = async (req) => {
    const kategoriResep = validate(updateKategoriResepValidation, req)

    const countKategoriResep = await prismaClient.kategori_resep.count({
        where: {
            id: kategoriResep.id
        }
    })

    if (!countKategoriResep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    return prismaClient.kategori_resep.update({
        where: {
            id: kategoriResep.id
        },
        data: kategoriResep,
        select: {
            id: true,
            kategori: {
                select: {
                    id: true,
                    nama_kategori: true,
                    gambar: true
                }
            },
            resep: {
                select: {
                    id: true,
                    nama_resep: true,
                    deskripsi: true,
                    gambar: true,
                    bahan: true,
                    informasi_gizi: true
                }
            }
        }
    })
}

const get = async (kategoriResepId) => {
    kategoriResepId = validate(getKategoriResepValidation, kategoriResepId)

    const kategoriResep = await prismaClient.kategori_resep.findUnique({
        where: {
            id: kategoriResepId
        },
        select: {
            id: true,
            kategori: {
                select: {
                    id: true,
                    nama_kategori: true,
                    gambar: true
                }
            },
            resep: {
                select: {
                    id: true,
                    nama_resep: true,
                    deskripsi: true,
                    gambar: true,
                    bahan: true,
                    informasi_gizi: true
                }
            }
        }
    })

    if (!kategoriResep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    return kategoriResep
}

const getAll = async () => {
    return prismaClient.kategori_resep.findMany({
        select: {
            id: true,
            kategori: {
                select: {
                    id: true,
                    nama_kategori: true,
                    gambar: true
                }
            },
            resep: {
                select: {
                    id: true,
                    nama_resep: true,
                    deskripsi: true,
                    gambar: true,
                    bahan: true,
                    informasi_gizi: true
                }
            }
        }
    })
}

const remove = async (kategoriResepId) => {
    kategoriResepId = validate(getKategoriResepValidation, kategoriResepId)

    const countKategoriResep = await prismaClient.kategori_resep.count({
        where: {
            id: kategoriResepId
        }
    })

    if (!countKategoriResep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    await prismaClient.kategori_resep.delete({
        where: {
            id: kategoriResepId
        }
    })

    return 
}

export default {
    create,
    update,
    get,
    getAll,
    remove
}