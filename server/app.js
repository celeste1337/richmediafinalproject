const path = require('path');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');
const rateLimit = require('express-rate-limit');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/ClosetDB';

mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('could not connect to ze database');
    throw err;
  }
});

let redisURL = {
  hostname: 'redis-16632.c90.us-east-1-3.ec2.cloud.redislabs.com',
  port: 16632,
};

let redisPASS = 'QOcR81Qg6T1NB2L8rDoVUAjetm66vkeo';
// QOcR81Qg6T1NB2L8rDoVUAjetm66vkeo

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}

const router = require('./router.js');

const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.disable('x-powered-by');
app.use(compression());
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'doritos more like',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});

// rate limiter to limit spam requests
const apiLimiter = rateLimit({
  windowMs: 20 * 1000,
  max: 1,
  message: { error: 'Too many things!!!!!!!!!!!!!! stop.' },
});
app.use('/signup', apiLimiter);
app.use('/passwordChange', apiLimiter);

router(app);

app.use((req, res) => {
  res.status(404);
  return res.render('notfound');
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
