const upload = async (file, id) => {
    const { originalname, buffer } = file

    const fileName = `${originalname}`
    const filePath = `./uploads/${fileName}`

    fs.writeFileSync(filePath, buffer)

    return {
        fileName,
        filePath
    }
}

export default {
    upload
}