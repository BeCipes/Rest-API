const WebResponse = (code, status, msg, data) => {
    return {
        code: code,
        status: status,
        msg: msg,
        data: data
    }
}

export default WebResponse