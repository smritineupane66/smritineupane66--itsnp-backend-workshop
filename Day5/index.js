import express from 'express'
import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import ConnectDB from './ConnectDB.js'
import User from './userSchema.js'

const app = express()
const port = process.env.PORT || 3000;
const mongoURI = process.env.MONGO_URI;
const jwtSecret = process.env.JWT_SECRET;


// Middleware
app.use(express.json())


app.post('/login',async (req, res) => {
    const data = req.body

    //save to MongoDB
    const newUser = new User(data)
    await newUser.save()

    //create token
    const token = jwt.sign(data, jwtsecret, { expiresIn: '1h' })
    res.json({ token })
})



app.get('/profile', (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Authorization header missing' });
    }

    const token = authHeader.split(' ')[1]; // Extract token

    try {
       const decoded = jwt.verify(token, jwtsecret); // Your secret here
        res.json({ message: 'Token valid', user: decoded });
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token' });
    }
});


//stores user info

app.post('/register',async(req,res)=>{
    try {
        const {username,password} = req.body;
        const newUser = new User({username,password})
        await newUser.save() //save to MongoDB
        res.status(201).json({message:'User register successfully'})
        
    } catch (error) {
        res.status(500).json({error:"Failed to register"})
        
    }
})

//MongoDB
ConnectDB();

//CRUD OPERATIONS -> CREATE,READ,UPDATE,DELETE




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
})
