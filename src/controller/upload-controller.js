import uploadService from '../service/upload-service.js'
import { SuccessWebResponse } from '../helper/web-response.js'

const uploadFile = async (req, res, next) => {
    try {
        const result = await uploadService.upload(req)
        const response = SuccessWebResponse(200, "OK", "File Upload successfully", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    uploadFile
}