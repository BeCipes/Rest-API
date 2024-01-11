import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createResepValidation, updateResepValidation, getResepValidation } from "../validation/resep-validation.js"
import { getImageLink } from "../helper/image-helper.js"

const create = async (req) => {
    const resep = validate(createResepValidation, req)

    const countResep = await prismaClient.resep.count({
        where: {
            nama_resep: resep.nama_resep
        }
    })

    if (countResep === 1) {
        throw new ResponseError(400, "Resep already exists")
    }

    const countUser = await prismaClient.user.count({
        where: {
            id: req.createdBy
        }
    })

    if (countUser === 0) {
        throw new ResponseError(404, "User is not found")
    }

    return prismaClient.resep.create({
        data: resep,
        select: {
            nama_resep: true,
            deskripsi: true,
            gambar: true,
            bahan: true,
            informasi_gizi: true
        }
    })
}

const update = async (req) => {
    const resep = validate(updateResepValidation, req)

    const countResep = await prismaClient.resep.count({
        where: {
            id: resep.id
        }
    })

    if (!countResep) {
        throw new ResponseError(404, "Resep is not found")
    }

    return prismaClient.resep.update({
        where: {
            id: resep.id
        },
        data: resep,
        select: {
            id: true,
            nama_resep: true,
            deskripsi: true,
            gambar: true,
            bahan: true,
            informasi_gizi: true
        }
    })
}

const get = async (resepId) => {
    resepId = validate(getResepValidation, resepId)

    const resep = await prismaClient.resep.findUnique({
        where: {
            id: resepId
        },
        select: {
            id: true,
            nama_resep: true,
            deskripsi: true,
            gambar: true,
            bahan: true,
            informasi_gizi: true
        }
    })

    if (!resep) {
        throw new ResponseError(404, "Resep is not found")
    }

    resep.gambar = await getImageLink(resep.gambar)

    return resep
}

const getAll = async () => {
    const resep = await prismaClient.resep.findMany({
        select: {
            id: true,
            nama_resep: true,
            deskripsi: true,
            gambar: true,
            bahan: true,
            informasi_gizi: true
        }
    })

    resep.gambar = await getImageLink(resep.gambar)

    return resep
}

const getByIdKategori = async (kategoriId) => {
    kategoriId = validate(getResepValidation, kategoriId)

    const countKategori = await prismaClient.kategori.count({
        where: {
            id: kategoriId
        }
    })

    if (countKategori === 0) {
        throw new ResponseError(404, "Kategori is not found")
    }

    const resep = await prismaClient.resep.findMany({
        where: {
            kategori: {
                some: {
                    id: kategoriId
                }
            }
        },
        select: {
            id: true,
            nama_resep: true,
            deskripsi: true,
            gambar: true,
            bahan: true,
            informasi_gizi: true
        }
    })

    resep.gambar = await getImageLink(resep.gambar)

    return resep
}

const remove = async (resepId) => {
    resepId = validate(getResepValidation, resepId)

    const resep = await prismaClient.resep.count({
        where: {
            id: resepId
        }
    })

    if (!resep) {
        throw new ResponseError(404, "Resep is not found")
    }

    await prismaClient.resep.delete({
        where: {
            id: resepId
        }
    })

    return
}

export default {
    create,
    update,
    get,
    getAll,
    getByIdKategori,
    remove
}