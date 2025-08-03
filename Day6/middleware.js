import jwt from 'jsonwebtoken'
const jwtSecret = '1234' //secret key to verify token

// A middleware to protect routes by checking if  a valid token is present.

async function tokenVerificationMiddleware(req, res, next) {
    const token = req.headers["authorization"]  //get token from header it looks for the jwt token in the Authorization header of request 

    if (!token) {
        res.status(401).json({ message: "No token provided" })
        return;
    }
    //if token is found verify
    try {
        const decodedtoken = jwt.verify(token, jwtSecret) //checks if token is valid and not expired
        req.user = decodedtoken.user;  //if valid extracts the user from decodedtoken and attach in req.user
        next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" })


    }
}
export default tokenVerificationMiddleware;

