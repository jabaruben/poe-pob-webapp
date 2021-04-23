const express = require('express');
const jwt = require("jsonwebtoken");
const config = require('./config.json');

const router = express.Router();

router.get('/logged', (req, res) => {
  jwt.verify(req.token, config.SECRET_KEY, (err, authData) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        res.status(401).send('Expired Token');
      } else {
        res.sendStatus(403);
      }
    } else {
      delete authData.user.password;
      res.json({ authData });
    }
  });
});

module.exports = router;
