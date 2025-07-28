import express from 'express';
import loginMiddleware from './middleware.js';

const app = express();


app.use(express.json());

const users = [
    { id: 1, username: "Smriti", password: "1234" },
    { id: 2, username: "sita", password: "pass1" },
    { id: 3, username: "Gita", password: "pass12" },
];

app.get('/profile', (req, res) => {
    res.send('Request Recieved')
    console.log(req.headers);


})

//dynamic routing means changing routing user 1 lay magey user 1 ko detail,user 2 lay magey 2 ko id like this 
app.get('/user/:id', (req, res) => {
    const id = req.params.id;
    const user = users.find(user => user.id == id)
    if (user) {
        res.json({
            message: "User Found",
            user   //key value pair in json ie user is both key and value 
        })
    }
    res.json({
        message: "user not found",
        id
    })
})






//POST,put ma  request ma req.body chai post request garinxa or frontend dekhi aaxa vani 
app.post('/login',loginMiddleware, (req, res) => {
    // const { username, password } = req.body;
    console.log(req.username);
    res.send(req.body.username)

    

//     const User = users.find(
//         (user) => user.username === username && user.password === password
//     );

//     if (User) {
//         res.status(200).send(`Welcome ${User.username}`)
//     } else {
//         res.send("Failed")
//     }
});



app.listen(3000, () => {
    console.log("Server is listening at http://localhost:3000");
});
