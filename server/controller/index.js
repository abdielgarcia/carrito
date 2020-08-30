const express = require('express');
const app = express();

app.use(require('./usuario'));
app.use(require('./portafolio'));
app.use(require('./login'));

module.exports = app;