async function loginMiddleware(req,res,next){
    req.body.username = "Smriti"
    next()
    
}
export default loginMiddleware