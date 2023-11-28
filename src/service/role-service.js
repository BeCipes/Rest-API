import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createRoleValidation } from "../validation/role-validation.js"

const create = async (req, res) => {
    const role = validate(createRoleValidation, req)

    const countRole = await prismaClient.role.count({
        where: {
            role_name: role.role_name
        }
    });

    if (countRole === 1) {
        throw new ResponseError(400, "Role already exists")
    }

    return prismaClient.role.create({
        data: role,
        select: {
            role_name: true
        }
    })
}

export default {
    create
}