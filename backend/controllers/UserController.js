const userService = require("../services/UserServices");
const tokenService = require("../services/TokenService");

module.exports = {

  getUser : async (req, res) => {
    const user = req.userName;

    result = await userService.getUser(user);

    if (result instanceof Error)
    {
      res.status(400).send(result.stack);
      return;
    }
    else
    {
      res.status(201).send(result);
    }
  },

  createUser : async (req, res) => {
    const user = { name: req.body.name, password: req.body.password, role: req.body.role};
    const result = await userService.createUser(user.name, user.password, user.role);

    if (result instanceof Error)
    {
      res.status(400).send(result.stack);
      return;
    }
    else
    {
      res.status(201).send("User created");
      return;
    }
  },

  login : async (req, res) => {
    const loginInfo = { name: req.body.name, password: req.body.password}
    const result = await userService.userLogin(loginInfo.name, loginInfo.password);
    if (result instanceof Error)
    {
      res.status(401).send(result.stack);
      return;
    }

    const token = await tokenService.claimToken(loginInfo.name)
    if(token)
    {
      res.status(201).send(token);
      return;
    }
  }

};