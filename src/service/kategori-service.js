import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createKategoriValidation, updateKategoriValidation, getKategoriValidation } from "../validation/kategori-validation.js"

const create = async (req) => {
    const kategori = validate(createKategoriValidation, req)

    const countKategori = await prismaClient.kategori.count({
        where: {
            nama_kategori: kategori.nama_kategori
        }
    })

    if (countKategori === 1) {
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

    return prismaClient.kategori.create({
        data: kategori,
        select: {
            nama_kategori: true,
            id_jenis: true,
            gambar: true
        }
    })
}

const update = async (req) => {
    const kategori = validate(updateKategoriValidation, req)

    const countKategori = await prismaClient.kategori.count({
        where: {
            id: kategori.id
        }
    })

    if (!countKategori) {
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

const get = async (kategoriId) => {
    kategoriId = validate(getKategoriValidation, kategoriId)

    const kategori = await prismaClient.kategori.findUnique({
        where: {
            id: kategoriId
        },
        select: {
            id: true,
            nama_kategori: true,
            id_jenis: true,
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
            id_jenis: true,
            gambar: true
        }
    })
}

const remove = async (kategoriId) => {
    kategoriId = validate(getKategoriValidation, kategoriId)

    const countKategori = await prismaClient.kategori.count({
        where: {
            id: kategoriId
        }
    })

    if (!countKategori) {
        throw new ResponseError(404, "Kategori Resep is not found")
    }

    await prismaClient.kategori.delete({
        where: {
            id: kategoriId
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