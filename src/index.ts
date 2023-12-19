import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import morgan from 'morgan';
import { AppDataSource } from './db/dataSource';
import { userRouter } from './routes/user';
import cookieParser from "cookie-parser";
import cors from 'cors'
import { fileUpload } from './routes/fileUpload';

const app = express();

app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());
app.use(express.static('public'));
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.get('/api/home', async(_, res) => {
    res.send("<h1>Hello, What's up dude? <h1/>")    
})
app.use(userRouter)
app.use(fileUpload)

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