const TokenService = require("../services/TokenService");

module.exports = {

  authenticateToken : async (req, res, next) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)
    {
      res.status(401).send("No Access Token Found");
      return;
    }

    const authUser = await TokenService.verifyToken(token);
    if(authUser instanceof Error)
    {
      res.status(403).send(authUser.stack);
      return;
    }
    else
    {
      req.user = authUser;
      next();
      return;
    }

  }

}