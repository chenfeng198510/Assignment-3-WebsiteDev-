const express = require('express');
const path = require('path');
const routes = require('./routes/index');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));
app.use('/css', express.static(`${__dirname}/node_modules/bootstrap/dist/css`))
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', routes);
app.use(express.static("public"));


module.exports = app;


