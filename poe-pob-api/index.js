const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const config = require('./config.json');

const apiRouter = require('./api.routes');

const app = express();
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});


app.get('/', (req, res) => {
  res.send('API works!');
});

app.post('/login', verifyUser, (req, res) => {
  const user = req.body;
  jwt.sign({ user }, config.SECRET_KEY, { expiresIn: config.TOKEN_EXPIRATION }, (err, token) => {
    res.json({ 
      success: 1,
      message: 'login successfully',
      token
    });
  });
});

app.use('/api', cors(config.DEFAULT_CORS_OPTIONS), verifyToken, apiRouter);
app.use(cors(config.DEFAULT_CORS_OPTIONS), verifyToken, (req, res, next) => { res.sendStatus(404); }); // OTHERWISE ENDPOINT

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

  if (validateUser)
    next();
  else
    res.json({
      "success": 0,
      "message": "login failed"
    });
}

// FORMAT OF TOKEN
// Authorization: Bearer <acces_token>
function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

app.listen(config.SERVER_PORT, () => console.log(`API en puerto: ${config.SERVER_PORT}`));
