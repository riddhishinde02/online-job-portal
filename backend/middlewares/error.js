class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;

    }
}

//middleware
export const errorMiddleware=(err,req,res,next)=>{
    err.statusCode=err.statusCode || 500;
    err.message=err.message || "Internal server erroe";

    if(err.name=== "castError"){
        const message= `invalid ${err,path}`;
        err = new ErrorHandler(message,4000)
    }
    if(err.code=== 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered` ;
        err = new ErrorHandler(message,4000)
    }

    if(err.name=== "JsonWebTokenError"){
        const message= `Json web token is invalid,Try again.`;
        err = new ErrorHandler(message,4000)
    }

    if(err.name=== "TokenExpiredError"){
        const message= `Json web token is expired,Try again.`;
        err = new ErrorHandler(message,4000)
    }

    return res.status(err.statusCode).json({
        success:false,
        message:err.message,
       
    })
}

export default ErrorHandler