import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createStepValidation, updateStepValidation, getStepValidation } from "../validation/step-validation.js"

const create = async (req) => {
    const step = validate(createStepValidation, req)

    const countStep = await prismaClient.step.count({
        where: {
            id_resep: step.id_resep,
            step_no: step.step_no
        }
    })

    if (countStep === 1) {
        throw new ResponseError(400, "Step already exists")
    }

    const countUser = await prismaClient.user.count({
        where: {
            id: req.createdBy
        }
    })

    if (countUser === 0) {
        throw new ResponseError(404, "User is not found")
    }

    const countResep = await prismaClient.resep.count({
        where: {
            id: step.id_resep
        }
    })

    if (countResep === 0) {
        throw new ResponseError(404, "Resep is not found")
    }

    return prismaClient.step.create({
        data: step,
        select: {
            id_resep: true,
            step_no: true,
            step_desc: true,
            waktu: true
        }
    })
}

const update = async (req) => {
    const step = validate(updateStepValidation, req)

    const countStep = await prismaClient.step.count({
        where: {
            id: step.id,
            id_resep: step.id_resep,
        }
    })

    if (!countStep) {
        throw new ResponseError(404, "Step is not found")
    }

    const countStepNo = await prismaClient.step.count({
        where: {
            step_no: step.step_no
        }
    })

    if (countStepNo === 1) {
        throw new ResponseError(400, "Step No already used")
    }

    console.log(countStepNo)

    return prismaClient.step.update({
        where: {
            id: step.id,
            id_resep: step.id_resep
        },
        data: step,
        select: {
            id_resep: true,
            waktu: true,
            step_no: true,
            step_desc: true
        }
    })
}

const get = async (stepId) => {
    stepId = validate(getStepValidation, stepId)

    const step = await prismaClient.step.findUnique({
        where: {
            id: stepId
        },
        select: {
            id: true,
            id_resep: true,
            waktu: true,
            step_no: true,
            step_desc: true
        }
    })

    if (!step) {
        throw new ResponseError(404, "Step is not found")
    }

    return step
}

const getByResep = async (resepId) => {
    resepId = validate(getStepValidation, resepId)

    const step = await prismaClient.step.findMany({
        where: {
            id_resep: resepId
        },
        select: {
            id_resep: true,
            waktu: true,
            step_no: true,
            step_desc: true
        }
    })

    if (!step) {
        throw new ResponseError(404, "Step is not found")
    }

    return step
}

const getAll = async () => {
    return prismaClient.step.findMany({
        select: {
            id_resep: true,
            waktu: true,
            step_no: true,
            step_desc: true
        }
    })
}

const remove = async (stepId) => {
    stepId = validate(getStepValidation, stepId)

    const countStep = await prismaClient.step.count({
        where: {
            id: stepId
        }
    })

    if (!countStep) {
        throw new ResponseError(404, "Step is not found")
    }

    await prismaClient.step.delete({
        where: {
            id: stepId
        }
    })

    return 
}

export default {
    create,
    update,
    get,
    getByResep,
    getAll,
    remove
}