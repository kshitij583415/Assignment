const express=require('express');
const app=express();
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const cookieParser=require('cookie-parser');
const cors=require('cors');

const userRoute=require('./routes/user')
const postsRouter = require('./routes/post');



app.use(express.json());


dotenv.config();
app.use(cookieParser());
app.use(cors());
// app.use(cors({
//     origin:["http://localhost:3000"],
//     credentials:true
// }));

const url=process.env.mongo;

const connect=async()=>{
    try{
        const conn=await mongoose.connect(url);
        if(conn) console.log("Mongodb connected");
    }
    catch(err){
        console.log(err);
    }
}

connect();

app.use('/routes/user',userRoute);
app.use('/posts', postsRouter);



app.listen(5000,()=>{
    console.log("Server listen at 5000 port");
})