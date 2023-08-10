const express = require('express');
var cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, AuthorizationReporter"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, PUT, DELETE, OPTIONS"
    );
    next();
  });

app.use(require('./routes/files'));

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
}
)

module.exports = app