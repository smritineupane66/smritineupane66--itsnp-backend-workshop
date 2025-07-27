// if we do type = "module"
// then we can import and export 
// if we do commonjs module then we can do const express = require('express')


// import http from 'http'
// import path from 'path'

// const server = http.createServer((req, res) => {
//     res.writeHead(200, { "Content-Type": "text/plain" })
//     res.end("Hello World")
// })


// server.listen(3000, () => {
//     console.log("Server is running at localhost:3000");

// })

import express from 'express';
import loginHandler from './loginController.js'; 

const server = express();
server.use(express.json()); // Parses incoming JSON requests

server.get('/', (req, res) => {
  res.send("Request Was arrived");
});

server.get('/post', (req, res) => {
  res.json({
    name: "Smriti",
    course: "Backend"
  });
});

// POST request
server.post('/login', loginHandler);

server.listen(3000, () => {
  console.log("Server is running at localhost:3000");
});



