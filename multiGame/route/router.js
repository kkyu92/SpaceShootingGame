
const express = require('express');
const route = express.Router();

route.get('/user', function (err, res) {
    res.send("확인");
});

module.exports = route;