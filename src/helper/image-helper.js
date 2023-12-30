import { getStorage, ref, getDownloadURL } from "@firebase/storage"

const getImageLink = async (img) => {
    if (!img || img.length === 0) {
        return null
    }

    const storage = getStorage()

    if (Array.isArray(img)) { 
        const urls = await Promise.all(img.map(async (imageName) => {
            const storageRef = ref(storage, `${imageName}`)
            try {
                    const url = await getDownloadURL(storageRef)
                    return url
                } catch (error) {
                    return imageName
                }
        }))
        
        return urls
    } else {
        try {
            const url = await getDownloadURL(ref(storage, `${img}`))
            return url
        } catch (error) {
            return img
        }
    }
}

export { getImageLink }