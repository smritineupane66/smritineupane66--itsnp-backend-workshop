import express from 'express'
import ConnectDB from './connectDB.js'
import User from './userSchema.js'
import tokenVerificationMiddleware from './middleware.js'
import jwt from 'jsonwebtoken'

const app = express()
const jwtSecret = '1234'
app.use(express.json())

//call 
ConnectDB();


//post request to add user
app.post("/adduser", async (req, res) => {
    // console.log("Request body:", req.body);
    const { name, email, phone } = req.body;
    if (!name) return res.status(400).send("Name is required");

    const newUser = new User({ name, email, phone });
    try {
        await newUser.save();
        res.send("User added successfully");
    } catch (err) {
        res.status(500).send(err.message);
    }
});




//login route  token verification middleware
app.post('/login', async (req, res) => {
    const { email, phone } = req.body;
    const user = await User.findOne({ email, phone })  //searches for one user where both email and phone match and await waits for query to complete
    if (!user) {
        console.log("Login request:", email, phone);
        res.status(401).send({ message: 'invalid credentials' })
        return;
    }
    //if user is found jwt token is creted with userinfo
    const token = jwt.sign({ user }, jwtSecret)  //jwt secret is a key to sign token
    res.status(200).json({ message: "Login successful", token });
});



//get route
app.get('/getuser', tokenVerificationMiddleware, async (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'Unauthorized access' })
        return;
    }
    res.status(200).json({ message: "User retrieved successfully", user: req.user })
})


app.listen(3000, () => {
    console.log("Server is listening at localhost:3000");

})