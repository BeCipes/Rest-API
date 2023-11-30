const SuccessWebResponse = (code, status, msg, data) => {
    return {
        code: code,
        status: status,
        msg: msg,
        data: data
    }
}

const ErrorWebResponse = (code, error) => {
    return {
        code: code,
        errors: error
    }
}

export {
    SuccessWebResponse,
    ErrorWebResponse
}