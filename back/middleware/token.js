const jwt = require('jsonwebtoken');
const util = require('../models/util');
const bcrypt = require('bcrypt');
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send('Missing authorization header');
    }
  
    const token = authHeader.split(' ')[1];
    jwt.verify(token, '123456789', (err, decoded) => {
      if (err) {
        return res.status(401).send('Invalid token');
      }
      req.utilid = decoded.utilid;
      next();
    });
  };
  
  module.exports = verifyToken;
  