const express = require('express');
var cors = require('cors');
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(require('./routes/files'));

app.use(cors({
    origin: "http://localhost:5173/"
}));


/*
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
*/

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
}
)

module.exports = app