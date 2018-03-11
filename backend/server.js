'use static';

const express = require('express');
const mysql = require('mysql2/promise');

// Database
const intialDb = require('./intialScript');
intialDb.makeTables();

const config = require('./config');

const app = express();

const connection = mysql.createConnection(config.mysql);

// logs errors
(async () => {
  const sql = await connection;
  sql.on('error', (err) => {
    console.log(err);
    sql.end();
  });
})();

async function getBooks(req, res) {
  // find out what sql ordering to use
  let query = 'SELECT * FROM BOOK'
  try {
    const sql = await connection;
    let order;
    switch (req.order) {
      case(a2z):
        order = 'title ASC';
        break;
      case(z2a):
        order = 'title DESC';
        break;

      case(auth):
        order = 'author DESC';
        break;

      case(isbn):
        order = 'isbn ASC';
        break;

      case(publisher):
        order = 'publisher ASC';
        break;
      default:
        'id DESC'; // order by newest in default

    }
    query += 'ORDER BY ' + order
    let books = await sql.query(query); //gets all books, mysql outputs as json so no need to convert

    // decode filter json
    let filters = JSON.parse(decodeURIComponent(req.filters));
    // loop to apply to book filters
    for(let i = 0;i<filters.length;i++){

      //change if to case statement + add more filter
      if(filters[i] == "author"){
        // filter the books array using contains
      }
      else if (filters[i] == "category") {
        // apply filter
      }
    }

  }
}

// add a review, responsed ok if update ok else give err + log it
// adds to userReviews and reviews
async function addReview(req, res) {
  try {
    const sql = await connection;
    const reviewData = {
      score: req.score,
      description: req.description
    };
    //  const userBookData = {userId: req.userId,bookId: req.bookId};
    await sql.query(sql.format('INSERT INTO Reviews SET ?;', reviewData));
    //await sql.query(sql.format('INSERT INTO UserReviews SET ?;', userBookData));
    res.sendStatus(200);
  } catch (e) {
    error(res, e);
  }
}

//  add a user, return ok or an error , error gets logged
async function addUser(req, res) {
  try {
    const sql = await connection;
    const userData = {
      fname: req.fName,
      lname: req.lName,
      userName: req.userName,
      imagePath: req.img
    }
    await sql.query(sql.format('INSERT INTO User SET ?;', userData))
    res.sendStatus(200); // ok
  } catch (e) {
    error(res, e);
  }
}
//
//  add staff, returns ok or error, error gets logged
// async function addStaff(req,res){
//   try{
//     const sql = await connection;
//     const staffData = {fName: req.fName, lName: req.lName,email: req.email,contactNumber: req.contactNumber}
//     await sql.query(sql.format('INSERT INTO UserReviews SET ?;', userData))
//     res.sendStatus(200);  ok
//   }catch(e){
//     error(res,e);
//   }
// }
//

function error(res, msg) {
  res.sendStatus(500)
  console.error(msg);
}

// serve static pages
app.use('/', express.static(config.pages, {extensions: ['html']}));
app.get('/books',getBooks);
app.post('/home', addReview);
app.post('/home/user', addUser);
app.listen(8080, (err) => {
  if (err)
    console.error('error starting server', err);
  else
    console.log('server started');
  }
);
