// import the required modules/packages
const express = require("express");
const http = require("http");

const port = 3000;

// app instance
const app = express();

app.get("/test", function(request, response){
    response.send("Testing route working");
});

app.get("/", (req, res)=>{
    res.send("Welcome home dev");
});

// server instance
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`server listening on port: ${port}`)
});