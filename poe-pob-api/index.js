const express = require("express");
const jwt = require("jsonwebtoken");

const SERVER_PORT = 3000;
const SECRET_KEY = 'cG9lX3BvYl9zZWNyZXQ='; // poe_pob_secret
const TOKEN_EXPIRATION = '30s';

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.get('/api', (req, res) => {
  res.send('API works!');
});

app.get('/api/logged', verifyToken, (req, res) => {
  jwt.verify(req.token, SECRET_KEY, (err, authData) => {    
    if(err) {   
      if (err.name === 'TokenExpiredError') {
        res.status(401).send('Expired Token');
      } else {
        res.sendStatus(403);        
      }
    } else {
      delete authData.user.password;
      res.json({authData});
    }
  });
});

app.post('/api/login', verifyUser, (req, res) => {  
  const user = req.body;
  jwt.sign({user}, SECRET_KEY, {expiresIn: TOKEN_EXPIRATION}, (err, token) => {
    res.json({token});
  });
});

app.use((req, res, next)=>{res.sendStatus(404);}); // OTHERWISE ENDPOINT

function verifyUser(req, res, next) {  
  let validateUser = false;  
  // MOCK user
  const user = {
    email: 'ashketchum@poe2pob.com',
    password: 'cDRzc3cwcmQ=' // p4ssw0rd
  }
  user.password = Buffer.from(user.password, 'base64').toString();

  // TODO: (MOCK -> BD) validation
  if (req.body && JSON.stringify(req.body) === JSON.stringify(user))
    validateUser = true;
  
  if(validateUser)
    next();
  else 
    // FORBIDDEN
    res.sendStatus(403);
}

// FORMAT OF TOKEN
// Authorization: Bearer <acces_token>

function verifyToken(req, res, next) {  
  const bearerHeader = req.headers['authorization'];
  if(typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    // FORBIDDEN
    res.sendStatus(403);
  }
}

app.listen(SERVER_PORT, () => console.log(`API corriendo en puerto ${SERVER_PORT}`));
