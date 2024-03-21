const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);

app.get("/", (req,res)=>{
    return res.send({msg:"testing"})
});

server.listen(3001);