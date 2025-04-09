import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const db = () =>{
mongoose.connect(process.env.MONGO_URL)
    .then(()=>{
    console.log('Connected t mongo bd')
})
.catch((err)=>{
    console.log('Error Connecting to mongo db')
})

};


export default db;