import express from 'express'
import bcrypt from 'bcrypt'
import ConnectDB from './db.js'
import User from './User.js'

const app = express()

app.use(express.json())

//DB connect
ConnectDB();



app.listen(3000, () => {
    console.log(" Server running on port 3000");
})