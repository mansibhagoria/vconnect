import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import eventRoute from './routes/events.js';
import bodyParser from 'body-parser';
import multer from 'multer';
import userRoute from './routes/users.js';

import cors from 'cors';


const app = express();
dotenv.config()
app.use(cors());

app.use(express.json());
app.use("/events", eventRoute);
app.use("/users", userRoute);


app.get("/", (req, res) => {
    res.json({ message: 'Hello from the backend!' });
})


const connect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO, {useNewUrlParser: true,
          useUnifiedTopology: true,
      } );
        console.log("Connected to MongoDB.")
      } catch (error) {
        console.log("Error connecting to MongoDB");
        console.log(error);
      }

};



mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB disconnected!")
})

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connected!")
})



app.listen(8800, () => {
    connect();
    console.log("Backend server is running!");
});