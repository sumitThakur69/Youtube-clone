 // name of data base
//require('dotenv').config({path:'./env'}) 
import dotenv from 'dotenv'
import connectDB from "./db/index.js";

dotenv.config({
    path: './env'
})

connectDB()

// ( async () => {
//     try {            // apply try and catch for cheching succ/fail of connection with db
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`) // 1.Connect to DB `${env file}/${name of database}`
//         app.on("Error",(error) => {            // use app.listen function ()=>{inside Code}
//             console.log("ERR: ",error);   // if our express is not working them 
//             throw error                  
//         })

//     app.listen(process.env.PORT,()=>{
//         console.log(`App is Listen on PORT ${process.env.PORT}`); // Check it is woking on Port or not
//     })

//     } catch (error) {
//         console.error("Error: " , error)  // finding an error if any
//         throw error
//     }
// })()