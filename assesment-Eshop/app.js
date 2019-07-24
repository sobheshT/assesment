const express=require('express')
const server = express()
const parser=require('body-parser')
const itemRoutes = require('./route/item').itemRoutes;
const cors =require('cors')

server.use(cors())
server.use(parser.json());
server.use('/items',itemRoutes);

server.listen(8080,()=>{
    console.log("server started at port 8080.")
})