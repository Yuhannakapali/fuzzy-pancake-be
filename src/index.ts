import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { AppDataSource } from './db/dataSource';
import { userRouter } from './routes/user';
import cookieParser from "cookie-parser";
import cors from 'cors'

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000'
}))




app.get('/api/home', async(_, res) => {
    res.send("<h1>Hello, What's up dude? <h1/>")    
})
app.use(userRouter)

app.listen(8000, () => {
    console.log("server started on port 8000...")
})

AppDataSource.initialize()
    .then(() => {
        console.log("database initialized")
    })
    .catch((error) =>{
     console.log(error)
     throw new Error("unable to connect to the database");
    })