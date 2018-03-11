'use static';

// const bodyParser = require('body-parser');
const express = require('express');
const mysql = require('mysql2/promise');
// const passport = require('passport');

const config = require('./config');
const user = require('./user');

// Database
// const intialDb = require('./intialScript');
// intialDb.makeTables();

// parses data submitted through post
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

// serve static pages
app.use(express.static('public'));

// set view engine
app.set('view engine', 'ejs');

// routes
app.get('/', (req, res)=>{
    res.render('home');
});

// user routes
app.use('/user', user);


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



app.post('/home', addReview);

app.listen(8080, (err) => {
  if (err) console.error('error starting server', err);
  else console.log('server started');
});
