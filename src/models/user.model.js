import mongoose , {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema({
    username : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
        index : true
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        lowercase : true,
    },
    fullname : {
        type : String,
        required : true,
        trim : true,
        index : true
    },
    avatar : {
        type : String, // cloudnary URl lagega idhar
        required : true,
    },
    coverimage : {   // cloudnary URL needs 
        type : String,
    },
    watchHistory : [{
        type : Schema.Types.ObjectId,
        ref : "Video",
    }],
    password : {
        type : String,
        required : [true , 'Password is Required!!']
    },
    refreshToken : {
        type : String,

    }
},{
    timestamps : true
})

userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next()
    this.password = bcrypt.hash(this.password , 10)    // For encrypt the pass. and run while we need it not while when the other thing modify
    next()
})

userSchema.method.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password , this.password) // check the pass from user and saved in db.
}

userSchema.methods.generateAccessToken = function () {
    Jwt.sign({
        id : this._id,             // 1.we have to provide an Payload for check 
        email : this.email,
        username : this.username,
        fullname : this.fullname // fullname is key or payload and this fullname is in database for check whether is correct or not
    },
    process.env.ACCESS_TOKEN_SECRET,   // 2. we need env process.
    {
        expiresIn : process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken = function () {
    Jwt.sign({
        id : this._id,             // 1.we have to provide an Payload for check 
 // fullname is key or payload and this fullname is in database for check whether is correct or not
    },
    process.env.REFRESH_TOKEN_SECRET,   // 2. we need env process.
    {
        expiresIn : process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

export const User = mongoose.model("User" , userSchema)