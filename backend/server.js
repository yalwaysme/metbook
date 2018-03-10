'use static';
let express = require('express');
const mysql = require('mysql2/promise');


const config = require('./config');
//const initialDb = require('./intialScript').makeTables;

const app = express();


const connection = mysql.createConnection(config.mysql);

// logs errors
(async () => {
  const sql = await connection;
  sql.on('error',(err) =>{
    console.error(err);
    sql.end();
  });
})();


// add a review, use URL to insert param
async function addReview(req,res){
  const sql = await sqlPromise;
  const reviewData = {bookId: req.id, score: req.score, description: req.description}
 const [rows] = await sql.query(sql.format('INSERT INTO Review SET ?;', reviewData));

}



app.use('/', express.static(config.pages, { extensions: ['html'] }));
app.post('/home', addReview);
app.listen(8080, (err) => {
  if (err) console.error('error starting server', err);
  else console.log('server started');
});
