import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import { AppDataSource } from './db/dataSource';

const app = express();

app.get('/api/home', async(req, res) => {
    res.send("<h1>Hello, What's up dude? <h1/>")
})


app.listen(3000, () => {
    console.log("server started on port 3000")
})

AppDataSource.initialize()
    .then(() => {
        console.log("database initialized")
    })
    .catch((error) =>{
     console.log(error)
     throw new Error("unable to connect to the database");
    })