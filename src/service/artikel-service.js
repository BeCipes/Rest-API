import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createArtikelValidation, updateArtikelValidation, getArtikelValidation } from "../validation/artikel-validation.js"

const create = async (req) => {
    const artikel = validate(createArtikelValidation, req)

    const countArtikel = await prismaClient.artikel.count({
        where: {
            headline: artikel.headline
        }
    })

    if (countArtikel === 1) {
        throw new ResponseError(400, "Artikel already exists")
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
            id: artikel.id_kategori
        }
    })

    if (countKategori === 0) {
        throw new ResponseError(404, "Kategori is not found")
    }

    return prismaClient.artikel.create({
        data: artikel,
        select: {
            headline: true,
            gambar: true,
            isi: true,
            penulis: true,
            sumber: true,
            id_kategori: true,
        }
    })
}

const update = async (req) => {
    const artikel = validate(updateArtikelValidation, req)

    const countArtikel = await prismaClient.artikel.count({
        where: {
            id: artikel.id
        }
    })

    if (!countArtikel) {
        throw new ResponseError(404, "Artikel is not found")
    }

    return prismaClient.artikel.update({
        where: {
            id: artikel.id
        },
        data: artikel,
        select: {
            id: true,
            headline: true,
            gambar: true,
            isi: true,
            penulis: true,
            sumber: true,
            id_kategori: true,
        }
    })
}

const get = async (artikelId) => {
    artikelId = validate(getArtikelValidation, artikelId)

    const artikel = await prismaClient.artikel.findUnique({
        where: {
            id: artikelId
        },
        select: {
            id: true,
            headline: true,
            gambar: true,
            isi: true,
            penulis: true,
            sumber: true,
            id_kategori: true,
        }
    })

    if (!artikel) {
        throw new ResponseError(404, "Artikel is not found")
    }

    return artikel
}

const getAll = async () => {
    return prismaClient.artikel.findMany({
        select: {
            id: true,
            headline: true,
            gambar: true,
            isi: true,
            penulis: true,
            sumber: true,
            id_kategori: true,
        }
    })
}

const remove = async (artikelId) => {
    artikelId = validate(getArtikelValidation, artikelId)

    const countArtikel = await prismaClient.artikel.count({
        where: {
            id: artikelId
        }
    })

    if (!countArtikel) {
        throw new ResponseError(404, "Artikel is not found")
    }

    await prismaClient.artikel.delete({
        where: {
            id: artikelId
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