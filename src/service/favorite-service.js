import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createFavoriteValidation, getFavoriteValidation, getFavoriteValidationUser } from "../validation/favorite-validation.js"

const create = async (req) => {
    const favorite = validate(createFavoriteValidation, req)

    const countFavorite = await prismaClient.favorite.count({
        where: {
            id_user: favorite.id_user,
            id_resep: favorite.id_resep
        }
    })

    if (countFavorite === 1) {
        throw new ResponseError(400, "Favorite already exists")
    }

    const countResep = await prismaClient.resep.count({
        where: {
            id: favorite.id_resep
        }
    })

    if (countResep === 0) {
        throw new ResponseError(404, "Resep is not found")
    }

    const countUser = await prismaClient.user.count({
        where: {
            id: req.createdBy
        }
    })

    if (countUser === 0) {
        throw new ResponseError(404, "User is not found")
    }

    return prismaClient.favorite.create({
        data: favorite,
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
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

const get = async (favoriteId) => {
    favoriteId = validate(getFavoriteValidation, favoriteId)

    const favorite = await prismaClient.favorite.findUnique({
        where: {
            id: favoriteId
        },
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
                }
            },
            resep: {
                select: {
                    id: true,
                    nama_resep: true,
                    deskripsi: true,
                    gambar: true,
                    bahan: true,
                    informasi_gizi
                }
            }
        }
    })

    if (!favorite) {
        throw new ResponseError(404, "Favorite is not found")
    }

    return favorite
}

const getByUserId = async (userId) => {
    userId = validate(getFavoriteValidationUser, userId)

    const favorite = await prismaClient.favorite.findMany({
        where: {
            id_user: userId
        },
        select: {
            id: true,
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

    if (!favorite) {
        throw new ResponseError(404, "Favorite is not found")
    }

    return favorite
}

const getAll = async () => {
    return prismaClient.favorite.findMany({
        select: {
            id: true,
            user: {
                select: {
                    id: true,
                    first_name: true,
                    last_name: true,
                    email: true
                }
            },
            resep: {
                select: {
                    id: true,
                    nama_resep: true,
                    deskripsi: true,
                    gambar: true,
                    bahan: true,
                    informasi_gizi
                }
            }
        }
    })
}

const remove = async (favoriteId) => {
    favoriteId = validate(getFavoriteValidation, favoriteId)

    const countFavorite = await prismaClient.favorite.count({
        where: {
            id: favoriteId
        }
    })

    if (!countFavorite) {
        throw new ResponseError(404, "Favorite is not found")
    }

    await prismaClient.favorite.delete({
        where: {
            id: favoriteId
        }
    })

    return 
}

export default {
    create,
    get,
    getAll,
    getByUserId,
    remove
}