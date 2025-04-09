import express  from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import db from './utils/db.js';
import cookieParser from 'cookie-parser'


//import all routes
import userRoutes from './routes/user.routes.js'

dotenv.config();

const app = express()
const port = process.env.PORT || 4000

app.use(cors({
 'origin':process.env.BASE_URL,
 'methods':['GET','POST',"DELETE","PUT"],
 'allowedHeaders':['Content-Type','Authorization']
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello Cohort!')
})

app.get('/yash',(req,res)=>{
    res.send('Yash');
})


db();

//user routes

app.use("/api/v1/users",userRoutes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  
})