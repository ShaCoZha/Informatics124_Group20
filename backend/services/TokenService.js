const jwt = require('jsonwebtoken')

async function claimToken(userName) {
  const user = {name: userName};
  const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_EXPIRE_TIME});

  const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRE_TIME});

  return { accessToken: accessToken, refreshToken: refreshToken};
}

async function verifyToken(Token) {
  try {
    const user = await jwt.verify(Token, process.env.ACCESS_TOKEN_SECRET);
    return user;
  } catch (error) {
    return error;
  }
}

async function verifyrefreshToken(Token) {
  try {
    const user = await jwt.verify(Token, process.env.REFRESH_TOKEN_SECRET);
    return user;
  } catch (error) {
    return error;
  }
}

async function refreshToken(Token) {
  const Authenicate = await verifyrefreshToken(Token);
  if(Authenicate instanceof Error)
  {
    return Authenicate;
  }
  
  const user = {name: Authenicate.name};

  const accessToken = await jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn : process.env.ACCESS_TOKEN_EXPIRE_TIME});

  const refreshToken = await jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, {expiresIn : process.env.REFRESH_TOKEN_EXPIRE_TIME});

  return { accessToken: accessToken, refreshToken: refreshToken};
}

module.exports = {
  refreshToken,
  claimToken,
  verifyToken,
  verifyrefreshToken
};