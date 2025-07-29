import express from 'express';
import rateLimit from 'express-rate-limit';

const app = express();

//Express rate limit 
const limiter = rateLimit({
	windowMs: 5 * 60 * 1000, // 5 minutes interval ma 5 vanda badi request janna aautai system bata after 5 minutes only server will be active
	limit: 5, 
    message:"Maximum attempt reached"

})
app.use(express.json());
app.use(limiter)


const users = [
    { id: 1, name: "Smriti", email: "Smriti@gmail.com" },
    { id: 2, name: "Sita", email: "sita@gmail.com" },
];

app.get('/profile', async (req, res) => {
    throw new Error("Invalid error")
})


// const checks = (req, res, next) => {
//   const { email } = req.body;
//   const user = users.find(u => u.email === email);

//   if (!user) {
//     return res.json({ message: " Invalid email" });
//   }

//   req.user = user; 
//   next(); 
// };


// app.post('/check', checks, (req, res) => {
//   res.json({
//     message: " Found",
//     user: req.user
//   });
// });



//Differences with req.params and req.query
app.get('/user', (req, res) => {
    const { id } = req.query;  // get id from query string
    console.log("Query", req.query); // e.g. { id: '1' }
    console.log("Params", req.params); // empty here, because no route params

    const user = users.find(u => u.id == id);  // == to compare string and number

    if (!user) {
        return res.send("Invalid id");
    }
    res.json({ user });
});

//Global Error handling
app.use((err, req, res, next) => {
    res.json({
        // message: "Error Found"
        message:err.message

    })

})




app.listen(3000, () => {
    console.log("Server running on port 3000");
});
