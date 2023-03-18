const express = require('express');
const ws = require('ws')
//const app = express();
const server = http.createServer(app);
const wss = new ws.Server({ server });

wss.on('connection', function(user){

    user.onmessage = function(msg)
    {  
        
        wss.clients.forEach((ele) => {
            if(ele!=user)
                       
            ele.send(msg.data)
        });
    }
    // user.on('close', (user)=>{
    //    console.log(server.clients.size)
    // })
    
    })