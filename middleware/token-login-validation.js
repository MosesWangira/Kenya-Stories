const jwt = require('jsonwebtoken')

module.exports = (req, res, next) =>{
  try{

    const jsonResponse = {
      status: 400,
      error: "token is valid"
    }

    const token = req.headers.authorization.split(" ")[1]
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    req.userData = decoded
    next()

    res.status(200).send(jsonResponse)
  }catch(error){
    const jsonResponse = {
      status: 400,
      error: 'token expired'
    }
    res.status(400).send(jsonResponse)
  }
}
