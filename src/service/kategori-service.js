import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createKategoriResepValidation, updateKategoriResepValidation, getKategoriResepValidation } from "../validation/kategori-validation.js"

const create = async (req) => {
    const kategori_resep = validate(createKategoriResepValidation, req)

    const countKategoriResep = await prismaClient.kategori_Resep.count({
        where: {
            nama_kategori: kategori_resep.nama_kategori
        }
    })

    if (countKategoriResep === 1) {
        throw new ResponseError(400, "Kategori Resep already exists")
    }

    return prismaClient.kategori_Resep.create({
        data: kategori_resep,
        select: {
            nama_kategori: true,
            gambar: true
        }
    })
}

const update = async (req) => {
    const kategori_resep = validate(updateKategoriResepValidation, req)

    const countKategoriResep = await prismaClient.kategori_Resep.count({
        where: {
            id_kategori_resep: kategori_resep.id_kategori_resep
        }
    })

    if (!countKategoriResep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    return prismaClient.kategori_Resep.update({
        where: {
            id_kategori_resep: kategori_resep.id_kategori_resep
        },
        data: kategori_resep,
        select: {
            id_kategori_resep: true,
            nama_kategori: true,
            gambar: true
        }
    })
}

const get = async (kategoriResepId) => {
    kategoriResepId = validate(getKategoriResepValidation, kategoriResepId)

    const kategori_resep = await prismaClient.kategori_Resep.findUnique({
        where: {
            id_kategori_resep: kategoriResepId
        },
        select: {
            id_kategori_resep: true,
            nama_kategori: true,
            gambar: true
        }
    })

    if (!kategori_resep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    return kategori_resep
}

const getAll = async () => {
    return prismaClient.kategori_Resep.findMany({
        select: {
            id_kategori_resep: true,
            nama_kategori: true,
            gambar: true
        }
    })
}

const remove = async (kategoriResepId) => {
    kategoriResepId = validate(getKategoriResepValidation, kategoriResepId)

    const countKategoriResep = await prismaClient.kategori_Resep.count({
        where: {
            id_kategori_resep: kategoriResepId
        }
    })

    if (!countKategoriResep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    await prismaClient.kategori_Resep.delete({
        where: {
            id_kategori_resep: kategoriResepId
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