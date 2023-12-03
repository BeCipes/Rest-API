import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createKategoriResepValidation, updateKategoriResepValidation, getKategoriResepValidation } from "../validation/kategori-validation.js"

const create = async (req) => {
    const kategori = validate(createKategoriResepValidation, req)

    const countKategoriResep = await prismaClient.kategori.count({
        where: {
            nama_kategori: kategori.nama_kategori
        }
    })

    if (countKategoriResep === 1) {
        throw new ResponseError(400, "Kategori Resep already exists")
    }

    return prismaClient.kategori.create({
        data: kategori,
        select: {
            nama_kategori: true,
            gambar: true
        }
    })
}

const update = async (req) => {
    const kategori = validate(updateKategoriResepValidation, req)

    const countKategoriResep = await prismaClient.kategori.count({
        where: {
            id: kategori.id
        }
    })

    if (!countKategoriResep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    return prismaClient.kategori.update({
        where: {
            id: kategori.id
        },
        data: kategori,
        select: {
            id: true,
            nama_kategori: true,
            gambar: true
        }
    })
}

const get = async (kategoriResepId) => {
    kategoriResepId = validate(getKategoriResepValidation, kategoriResepId)

    const kategori = await prismaClient.kategori.findUnique({
        where: {
            id: kategoriResepId
        },
        select: {
            id: true,
            nama_kategori: true,
            gambar: true
        }
    })

    if (!kategori) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    return kategori
}

const getAll = async () => {
    return prismaClient.kategori.findMany({
        select: {
            id: true,
            nama_kategori: true,
            gambar: true
        }
    })
}

const remove = async (kategoriResepId) => {
    kategoriResepId = validate(getKategoriResepValidation, kategoriResepId)

    const countKategoriResep = await prismaClient.kategori.count({
        where: {
            id: kategoriResepId
        }
    })

    if (!countKategoriResep) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    await prismaClient.kategori.delete({
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