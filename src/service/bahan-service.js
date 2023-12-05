import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createBahanValidation, updateBahanValidation, getBahanValidation } from "../validation/bahan-validation.js"

const create = async (req) => {
    const bahan = validate(createBahanValidation, req)

    const countBahan = await prismaClient.bahan.count({
        where: {
            nama_bahan: bahan.nama_bahan
        }
    })

    if (countBahan === 1) {
        throw new ResponseError(400, "Bahan already exists")
    }

    const countUser = await prismaClient.user.count({
        where: {
            id: req.createdBy
        }
    })

    if (countUser === 0) {
        throw new ResponseError(404, "User is not found")
    }

    return prismaClient.bahan.create({
        data: bahan,
        select: {
            nama_bahan: true,
            deskripsi: true,
            gambar: true,
            gizi: true
        }
    })
}

const update = async (req) => {
    const bahan = validate(updateBahanValidation, req)

    const countBahan = await prismaClient.bahan.count({
        where: {
            id: bahan.id
        }
    })

    if (!countBahan) {
        throw new ResponseError(404, "Bahan is not found")
    }

    return prismaClient.bahan.update({
        where: {
            id: bahan.id
        },
        data: bahan,
        select: {
            id: true,
            nama_bahan: true,
            deskripsi: true,
            gambar: true,
            gizi: true
        }
    })
}

const get = async (bahanId) => {
    bahanId = validate(getBahanValidation, bahanId)

    const bahan = await prismaClient.bahan.findUnique({
        where: {
            id: bahanId
        },
        select: {
            id: true,
            nama_bahan: true,
            deskripsi: true,
            gambar: true,
            gizi: true
        }
    })

    if (!bahan) {
        throw new ResponseError(404, "Bahan is not found")
    }

    return bahan
}

const getAll = async () => {
    return prismaClient.bahan.findMany({
        select: {
            id: true,
            nama_bahan: true,
            deskripsi: true,
            gambar: true,
            gizi: true
        }
    })
}

const remove = async (bahanId) => {
    bahanId = validate(getBahanValidation, bahanId)

    const countBahan = await prismaClient.bahan.count({
        where: {
            id: bahanId
        }
    })

    if (!countBahan) {
        throw new ResponseError(404, "Bahan is not found")
    }

    await prismaClient.bahan.delete({
        where: {
            id: bahanId
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