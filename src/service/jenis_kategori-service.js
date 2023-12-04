import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createJenisKategoriValidation, updateJenisKategoriValidation, getJenisKategoriValidation } from "../validation/jenis_kategori-validation.js"

const create = async (req) => {
    const jenisKategori = validate(createJenisKategoriValidation, req)

    const countKategori = await prismaClient.jenis_kategori.count({
        where: {
            nama_jenis: jenisKategori.nama_jenis
        }
    })

    if (countKategori === 1) {
        throw new ResponseError(400, "Jenis kategori already exists")
    }

    const countUser = await prismaClient.user.count({
        where: {
            id: req.createdBy
        }
    })

    if (countUser === 0) {
        throw new ResponseError(404, "User is not found")
    }

    return prismaClient.jenis_kategori.create({
        data: jenisKategori,
        select: {
            nama_jenis: true,
        }
    })
}

const update = async (req) => {
    const jenisKategori = validate(updateJenisKategoriValidation, req)

    const countKategori = await prismaClient.jenis_kategori.count({
        where: {
            id: jenisKategori.id
        }
    })

    if (!countKategori) {
        throw new ResponseError(404, "Jenis kategori is not found")
    }

    return prismaClient.jenis_kategori.update({
        where: {
            id: jenisKategori.id
        },
        data: jenisKategori,
        select: {
            id: true,
            nama_jenis: true,
        }
    })
}

const get = async (kategoriId) => {
    kategoriId = validate(getJenisKategoriValidation, kategoriId)

    const jenisKategori = await prismaClient.jenis_kategori.findUnique({
        where: {
            id: kategoriId
        },
        select: {
            id: true,
            nama_jenis: true,
        }
    })

    if (!jenisKategori) {
        throw new ResponseError(404, "Jenis kategori is not found")
    }

    return jenisKategori
}

const getAll = async () => {
    return prismaClient.jenis_kategori.findMany({
        select: {
            id: true,
            nama_jenis: true,
        }
    })
}

const remove = async (kategoriId) => {
    kategoriId = validate(getJenisKategoriValidation, kategoriId)

    const countKategori = await prismaClient.jenis_kategori.count({
        where: {
            id: kategoriId
        }
    })

    if (!countKategori) {
        throw new ResponseError(404, "Jenis kategori is not found")
    }

    await prismaClient.jenis_kategori.delete({
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