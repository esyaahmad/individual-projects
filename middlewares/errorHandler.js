const errorHandler = (error, req, res, next) => {

    let status = 500
    let message = 'Internal Server Error'

    if (error.name === "SequelizeValidationError" || error.name == "SequelizeUniqueConstraintError" || error.name == "ValidationErrorItems") {
    status = 400
    message =  error.errors.map((err) => err.message)[0]
    // res.status(400).json({message: error.errors.map((err) => err.message, 'error')})
    }

    if (error.name === "EmailIsRequired") {
    status = 400
    message = 'email is required'
    // res.status(400).json({message: 'email is required'})
    }

    if (error.name === "PasswordIsRequired"){
    status = 400
    message = 'password is required'
    // res.status(400).json({message: 'password is required'})
    }

    if (error.name === "InvalidDataType") {
        status = 400
        message = 'Invalid data type'
        // res.status(400).json({message: 'email is required'})
        }
    
    if (error.name === "InvalidEmailPassword"){
    status = 401
    message = 'Invalid email/password'
    // res.status(401).json({message: 'Invalid email/password'})
    }

    if (error.name === 'Unauthorized') {
    status = 401
    message = 'Please login first'
    // res.status(401).json({message: 'Please login first'})
    } 
    
    if (error.name === 'JsonWebTokenError') {
    status = 401
    message = 'Unauthorized'
    // res.status(401).json({message: 'Unauthorized'})
    } 

    if (error.name === "Forbidden") {
    status = 403
    message = 'You have no access'
    // res.status(403).json({message: 'You have no access'})
    }

    if (error.name === "NotFound") {
    status = 404
    message = 'Not found'
    // res.status(404).json({message: 'Cuisine not found'})
    }
    // console.log(error, "ini di errorHandler");

    res.status(status).json({message})
}

module.exports = errorHandler