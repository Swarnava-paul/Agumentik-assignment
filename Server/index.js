require('dotenv').config();
const http = require('node:http');
const cors = require('cors')
const express = require('express');
const connectToDb = require('./db/db.js');
const AuthRouter = require('./Routes/Auth.js');
const UserRouter = require("./Routes/User.js");

const { createServer } = require("http");
const { Server } = require("socket.io");

    const server = express();
    const httpServer = createServer(server);
    const io = new Server(httpServer,{
        cors:{
            origin : "http://localhost:5173",
        }
    });

    server.use(cors());
    server.use(express.json());
    server.use('/auth/v1',AuthRouter);
    server.use('/user/v1',UserRouter);
    
    const adminNamespace = io.of("/admin");

    adminNamespace.on("connection", (socket) => {

       console.log('Admin connected');
       socket.join('online');

       socket.on('post-news', (data) => {
          console.log(data);
          io.to('online').emit('news', data);
       });

       socket.on('disconnect',()=>{
        console.log('Admin disconnected');
       })
   });

    io.on("connection", (socket) => {
        console.log('user connected');
        
        socket.join('online');

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });

    httpServer.listen(process.env.PORT || 6000 , async()=>{
        try{
            await connectToDb();
            console.log(`Server started on port ${process.env.PORT || 6000}`);
        }catch(error) {
            console.log(`Failed to start server or Database connection problem ${error}`);
            process.exit(1);
        }
    })

