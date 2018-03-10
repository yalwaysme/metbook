'use static';
let express = require('express');
const mysql = require('mysql2/promise');

const intialDb = require('./intialScript');
intialDb.makeTables();

const config = require('./config');

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
  const sql = await connection;

  const reviewData = {score: req.score, description: req.description};
  const userBookData = {userId: req.userId,bookId: req.id};
  const [rows] = await sql.query(sql.format('INSERT INTO Review SET ?;', reviewData));
  const [rows] = await sql.query(sql.format('INSERT INTO UserReviews SET ?;', userBookData));




}



app.use('/', express.static(config.pages, { extensions: ['html'] }));
app.post('/home', addReview);
app.listen(8080, (err) => {
  if (err) console.error('error starting server', err);
  else console.log('server started');
});
