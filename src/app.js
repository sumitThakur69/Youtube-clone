import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN
}))
app.use(express.json({ limit: "16kb"})); // set call json and limit 
app.use(express.urlencoded({ extended: true , limit : "16kb"})); // for Taking encoded url system 
app.use(express.static("Public"))             // for Storing the image and file in public server we use this 
app.use(cookieParser())

export { app }