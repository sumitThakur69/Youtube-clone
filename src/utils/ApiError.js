class ApiError extends Error {
    constructor(
        statuscode,
        message = "Something Went Wrong",
        errors = [],
        statck = ""            // constructor provide kare want ex. we want to constr
    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors   // here we overwrite the methods of func by error class and constructors 

    if(statck){
        this.stack = statck
    } else {
        Error.captureStackTrace(this , this.constructor)
    }
}
} 

export { ApiError }