// import the required modules/packages
const express = require("express");
const http = require("http");

// import routes
const appRoutes = require("./routes/appRoutes");

const port = 3000;

// app instance
const app = express();

// configure app to use routes
app.use("/", appRoutes);

// server instance
const server = http.createServer(app);

server.listen(port, ()=>{
    console.log(`server listening on port: ${port}`)
});