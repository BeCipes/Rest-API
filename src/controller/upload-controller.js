import uploadService from '../service/upload-service.js'

const uploadFile = async (req, res, next) => {
    try {
        const { file } = req
        const { id } = req.user

        const result = await uploadService.upload(file, id)
        const response = SuccessWebResponse(200, "OK", "File Upload successfully", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    uploadFile
}