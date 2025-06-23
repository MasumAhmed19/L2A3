import {Server} from 'http';
import mongoose from 'mongoose';
import app from './app';
import dotenv from 'dotenv';
dotenv.config();

let server:Server;
const PORT = 9000;

async function main(){
    try{
        await mongoose.connect(`${process.env.DB_URL}`)
        console.log("Mongoose Connected")
        server = app.listen(PORT, ()=>{
            console.log(`App is listening to port ${PORT}`);
        })
    }catch(error){
        console.log("Server connection failed!", error);
    }
}

main();