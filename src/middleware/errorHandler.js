exports.notFound = (req, res, next)=>{
    const err = new Error(`Route not found`)
    err.status = 404
    next(err)
}
exports.createError = (status, message) => {
    const err = new Error();
    err.status = status;
    err.message = message;
    return err;
}