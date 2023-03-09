const errorHandler =(error,_,res,next) => {
    // check for bad status code
    const statusCode = res.statusCode < 400 ? 500 : res.statusCode

    res.status(statusCode)
        res.json({
            message: error.message
        })
    }


module.exports = {errorHandler}