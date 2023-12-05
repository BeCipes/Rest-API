import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createTeknikValidation, updateTeknikValidation, getTeknikValidation } from "../validation/teknik-validation.js"

const create = async (req) => {
    const teknik = validate(createTeknikValidation, req)

    const countTeknik = await prismaClient.teknik.count({
        where: {
            title: teknik.title
        }
    })

    if (countTeknik === 1) {
        throw new ResponseError(400, "Teknik already exists")
    }

    const countUser = await prismaClient.user.count({
        where: {
            id: req.createdBy
        }
    })

    if (countUser === 0) {
        throw new ResponseError(404, "User is not found")
    }

    const countKategori = await prismaClient.kategori.count({
        where: {
            id: teknik.id_kategori
        }
    })

    if (countKategori === 0) {
        throw new ResponseError(404, "Kategori is not found")
    }

    return prismaClient.teknik.create({
        data: teknik,
        select: {
            title: true,
            description: true,
            cover: true,
            url: true,
            sumber: true,
            id_kategori: true,
        }
    })
}

const update = async (req) => {
    const teknik = validate(updateTeknikValidation, req)

    const countTeknik = await prismaClient.teknik.count({
        where: {
            id: teknik.id
        }
    })

    if (!countTeknik) {
        throw new ResponseError(404, "Teknik is not found")
    }

    return prismaClient.teknik.update({
        where: {
            id: teknik.id
        },
        data: teknik,
        select: {
            id: true,
            title: true,
            description: true,
            cover: true,
            url: true,
            sumber: true,
            id_kategori: true,
        }
    })
}

const get = async (teknikId) => {
    teknikId = validate(getTeknikValidation, teknikId)

    const teknik = await prismaClient.teknik.findUnique({
        where: {
            id: teknikId
        },
        select: {
            id: true,
            title: true,
            description: true,
            cover: true,
            url: true,
            sumber: true,
            id_kategori: true,
        }
    })

    if (!teknik) {
        throw new ResponseError(404, "Teknik is not found")
    }

    return teknik
}

const getAll = async () => {
    return prismaClient.teknik.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            cover: true,
            url: true,
            sumber: true,
            id_kategori: true,
        }
    })
}

const remove = async (teknikId) => {
    teknikId = validate(getTeknikValidation, teknikId)

    const countTeknik = await prismaClient.teknik.count({
        where: {
            id: teknikId
        }
    })

    if (!countTeknik) {
        throw new ResponseError(404, "Teknik is not found")
    }

    await prismaClient.teknik.delete({
        where: {
            id: teknikId
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