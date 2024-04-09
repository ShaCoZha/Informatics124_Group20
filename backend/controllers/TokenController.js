const TokenService = require("../services/TokenService");

module.exports = {

  //Middleware
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
      req.userName = authUser.name;
      next();
      return;
    }

  },

  refreshToken : async (req, res) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)
    {
      res.status(401).send("No Refresh Token Found");
      return;
    }

    const newAuthToken = await TokenService.refreshToken(token);
    if(newAuthToken instanceof Error)
    {
      res.status(403).send(newAuthToken.stack);
      return;
    }
    else
    {
      res.status(403).send(newAuthToken);
    }

  },

  verifyRefreshToken : async (req, res) => {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(token == null)
    {
      res.status(401).send("No Refresh Token Found");
      return;
    }

    const authUser = await TokenService.verifyrefreshToken(token);
    if(authUser instanceof Error)
    {
      res.status(403).send(authUser.stack);
      return;
    }
    else
    {
      res.status(403).send(authUser);
      return;
    }

  },

}