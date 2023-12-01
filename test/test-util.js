import { prismaClient } from "../src/app/database.js"
import bcrypt from "bcrypt"

// User configuration
const createTestUser = async () => {
    await prismaClient.user.create({
        data: {
            id_role: 1,
            email: "test@test.com",
            first_name: "test",
            last_name: "test",
            password: await bcrypt.hash("rahasia", 10),
            token: "token"
        }
    })
}

const removeTestUser = async () => {
    await prismaClient.user.deleteMany({
        where: {
            email: "test@test.com"
        }
    })
}

// Role configuration
const createTestRole = async () => {
    await prismaClient.role.create({
        data: {
            role_name: "user",
        }
    })
}

export {
    createTestUser,
    removeTestUser,
    createTestRole
}