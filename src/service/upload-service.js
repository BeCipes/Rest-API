import multer from "multer"
import { ref, uploadBytes } from "@firebase/storage"
import { bucket } from "../../config/firebase_storage-config.js"

const upload = async (req) => {
    return new Promise((resolve, reject) => {
        const up = multer({storage: multer.memoryStorage()}).array("files", 3);

        up(req, null, async (err) => {
            if (err) {
                reject(err)
                return
            }

            if (!req.files || req.files.length === 0) {
                reject(new Error("No file provided"))
                return
            }

            const uploadPromises = req.files.map(async (file) => {
                const fileName = file.originalname;
                const fileBuffer = file.buffer;

                const storageRef = ref(bucket, fileName);
                await uploadBytes(storageRef, fileBuffer);

                const encodedFileName = encodeURIComponent(fileName)

                return `https://storage.googleapis.com/${process.env.BUCKET_NAME}/${encodedFileName}`;
            })

            
            const downloadURL = await Promise.all(uploadPromises)
            resolve(downloadURL)
        })
    })
}

export default {
    upload
}