import { validate } from "../validation/validation.js"
import { createArtikelValidation, updateArtikelValidation, getArtikelValidation } from "../validation/artikel-validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"

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

    return prismaClient.artikel.create({
        data: artikel,
        select: {
            headline: true,
            image: true,
            content: true,
            writer: true,
            source: true,
            category: true,
            created_by: true
        }
    })
}