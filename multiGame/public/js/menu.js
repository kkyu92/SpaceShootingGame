// const mysql = require('mysql');
// const express = require('express');
// var app = express;
// const bodyParser = require('body-parser');
//
// app.use(bodyParser.json());
//
// var mysqlConnection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'sql',
//     database: 'test'
// });
//
// mysqlConnection.connect((err) => {
//     if (!err) {
//         console.log('DB connection success.');
//     } else {
//         console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
//     }
// });
//
// app.listen(3000, ()=>console.log('Express server is running at port num 3000'));
//
// app.get('/employ', (res, req)=>{
//     mysqlConnection.query('SELECT * FROM member', (err, rows, fields)=>{
//         if (!err) {
//             console.log(rows);
//         } else {
//             console.log(err);
//         }
//     });
// });