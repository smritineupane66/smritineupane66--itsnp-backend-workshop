import express from 'express'
import bcrypt from 'bcrypt'
import ConnectDB from './db.js'
import User from './User.js'

const app = express()

app.use(express.json())

//DB connect
ConnectDB();

//Create(Register)
//Saves Hashed password
app.post('/register', async (req, res) => {
    const { email, password } = req.body;  //user type this in signup form
    try {
        const hashed = await bcrypt.hash(password, 10)
        const newUser = await User.create({ //You must use the model name you defined in your schema file.
            email: email,
            password: hashed
        })
        res.status(201).json({ message: "User registered", users: newUser })


    } catch (error) {
        res.status(500).json({ message: "Registration error", error: error.message })

    }
})

// Login: Compares plain password with hash POST
//Bcrypt will compare given password with hashed one 
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'user not found' })
        }


        //compare password
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
            return res.status(401).json({ message: "Invalid Credentials" })
        }
        res.json({ message: "Login Successful", user })

    } catch (error) {
        res.status(500).json({ message: " error", error: error.message })


    }


})

//update password
app.put('/update-password', async (req, res) => {
    try {
        const { email, newpassword } = req.body;

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        //hash new password
        const hashedpassword = await bcrypt.hash(newpassword, 10);
        user.password = hashedpassword;  //replace old password with new one 

        await user.save()  //save to DB

        res.json({ message: "Password updated successfully", user });

    } catch (error) {
        res.status(500).json({ message: "Update error", error: error.message })


    }
})

//Delete -> Remove User (Delete by email)
app.delete('/delete', async (req, res) => {
    try {
        const { email } = req.body;

        const deletedUser = await User.findOneAndDelete({ email })
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "User deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: " error", error: error.message })


    }
})





app.listen(3000, () => {
    console.log(" Server running on port 3000");
})