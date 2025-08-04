//Mongoose queries (with examples)

import express from 'express'
import mongoose from 'mongoose'
import ConnectDB from './connectDB.js';
import User from './userSchema.js';


const app = express();
app.use(express.json())

ConnectDB();

app.post('/add', async (req, res) => {
    const { name, email, age } = req.body;
    try {
        const newUser = new User({ name, email, age });
        await newUser.save();
        res.status(201).json({ message: "User added", user: newUser })

    } catch (error) {
        res.status(400).json({ message: error.message })

    }
})

//get all user
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json({ message: "users list", users })
})

//get one user by email
app.get('/users/:email', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.params.email })
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Email", user })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }


})

//get user by id 
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ message: "ID", user })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

//update user
app.put('/updateuser', async (req, res) => {
    const { email, name, age} = req.body;

    if (!email) {
        return res.status(400).json({ message: "Emai is required to update" })
    }
    try {
        const updated = await User.findOneAndUpdate(
            { email },  //search conditions
            { name, age }, //fields to update
            { new: true }    //return updated document
        );
        if (!updated) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({
            message: "user updated successfully", user: updated
        })

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });

    }
})

///Delete user by email

app.delete('/deleteuser', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required to delete" });
    }
    try {
        const deletedUser = await User.findOneAndDelete({ email });  // search condition to delete

        if (!deletedUser) {
            return res.status(404).json({ message: "User not deleted (not found)" });
        }

        res.json({
            message: "User deleted successfully",
            user: deletedUser  // return the deleted user info
        });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});




app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");

})
