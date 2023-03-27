const errorHandlerMiddleware = (error, req, res, next) => {
    let errorCode = error.statusCode || 500;
    let errorMsg = error.message || 'Something went wrong, please try again later';
    try {
        if (error.name === 'ValidationError') {
            errorCode = 400
            console.log(error)
            errorMsg = Object.values(error.errors).map((item) => item.message).join(', ')
        }
        if (error.code && error.code === 11000) {
            errorCode = 400
            errorMsg = 'This user already exists, please try to log in'
        }
        res.status(errorCode).json({msg: errorMsg})
    } catch (error) {
        res.status(errorCode).json({ msg: errorMsg})
    }

}

export default errorHandlerMiddleware