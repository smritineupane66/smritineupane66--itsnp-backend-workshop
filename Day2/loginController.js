async function loginHandler(req, res) {
  const { username, password } = req.body;

  res.json({
    message: "Request Received",
    user: { username, password }
  });
}


export default loginHandler;
