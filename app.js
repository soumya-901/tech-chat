const express = require('express');
const app = express();
const cors = require('cors');
// const {Server} = require("socket.io");
require('dotenv').config();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/',(req,res)=>{
    res.send("hello world");
})

const server= app.listen(PORT,()=>{
    console.log("server connected");
})
const io = require('socket.io')(server ,{
    // cors:{
    //     origin:"http://localhost:3000",
    //     methods:["GET","POST"],
    // },
});
// const io = s.listen(server)
// const io = new Server(server,{
// })

// io server



const user={};

io.on("connection",(socket)=>{
    // console.log(socket);
    socket.on("user_joined",name =>{
        // console.log(name);
        user[socket.id]=name;
        socket.broadcast.emit('user_join',name);
    })
    socket.on("send_message",message=>{
        console.log(socket.id);
        // console.log(socket.handshake);
        console.log(socket.rooms);
        // console.log(socket.data);
        socket.broadcast.emit('receive',{messages:message,name:user[socket.id]});
    })
    socket.on("disconnect",()=>{
        // console.log(`${user[socket.id]} got offline` , socket.id);
        socket.broadcast.emit('user_offline', {name:user[socket.id]});
    });

})

