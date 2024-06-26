const TokenService = require("../services/TokenService");

module.exports = {

  authenticateToken : async (req, res, next) => {

    const authHeader = req.cookies.accessToken
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

  },

  refreshToken : async (req, res) => {
    const authHeader = req.cookies.refreshToken
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
      res.cookie('accessToken', 'Bearer ' + newAuthToken.accessToken, {
        httpOnly: true,
        path: '/'
      })

      res.cookie('refreshToken', 'Bearer ' + newAuthToken.refreshToken, {
        httpOnly: true,
        path: '/'
      })

      res.status(201).send("login success")
    }

  }
  
}