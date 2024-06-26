const express = require("express");
const http = require("http");
const cors = require("cors");
const bodyparser = require("body-parser");
const morgan = require("morgan");
const app = express();
const server = http.createServer(app);
const controller = require("./controllers");
const dbconnection = require("./utliz/dbConnection");

app.use(cors({origin:"*"}));
app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(morgan("tiny"));

app.use(controller);

server.listen(3001);
server.on("listening", ()=>{
    console.log("server is up...");
    dbconnection();
})