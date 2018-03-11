'use static';

const express = require('express');
const mysql = require('mysql2/promise');


// Database
const intialDb = require('./intialScript');
intialDb.makeTables();

const config = require('./config');



// parses data submitted through post
// const urlencodedParser = bodyParser.urlencoded({ extended: false });

const app = express();

const connection = mysql.createConnection(config.mysql);

// logs errors
(async () => {
  const sql = await connection;
  sql.on('error',(err) =>{
    console.log(err);
    sql.end();
  });
})();


// async function getBooks(req,res){
//   try{
//     const sql = await connection;
//     let order;
//     switch(req.order){
//       case(a2z):order = 'title ASC';break;
//       case(z2a):order ='title DESC';break;
//
//       case(auth):order = 'author DESC';break;
//
//
//       case(isbn):order ='isbn ASC';break;
//
//       case(publisher):order='publisher ASC';break;
//       default:'id DESC'; // order by newest in
//
//
//     }
//   }
// }


// add a review, responsed ok if update ok else give err + log it
// adds to userReviews and reviews
async function addReview(req,res){
  try{
    const sql = await connection;
    const reviewData = {score: req.score, description: req.description};
  //  const userBookData = {userId: req.userId,bookId: req.bookId};
    await sql.query(sql.format('INSERT INTO Reviews SET ?;', reviewData));
    //await sql.query(sql.format('INSERT INTO UserReviews SET ?;', userBookData));
    res.sendStatus(200);
  }catch(e){
    error(res,e);
  }
}

// // add a user, return ok or an error , error gets logged
async function addUser(req,res){
  try{
    const sql = await connection;
    const userData = {fname: req.fName, lname: req.lName, userName: req.userName,imagePath: req.img}
    await sql.query(sql.format('INSERT INTO User SET ?;', userData))
    res.sendStatus(200); // ok
  }catch(e){
    error(res,e);
  }
}
//
// // add staff, returns ok or error, error gets logged
// async function addStaff(req,res){
//   try{
//     const sql = await connection;
//     const staffData = {fName: req.fName, lName: req.lName,email: req.email,contactNumber: req.contactNumber}
//     await sql.query(sql.format('INSERT INTO UserReviews SET ?;', userData))
//     res.sendStatus(200); // ok
//   }catch(e){
//     error(res,e);
//   }
// }
//


 function error(res,msg){
   res.sendStatus(500)
   console.error(msg);
}



// serve static pages
app.use('/',express.static(config.pages,{extensions:['html'] }));

app.post('/home', addReview);
app.post('/home/user',addUser);
app.listen(8080, (err) => {
  if (err) console.error('error starting server', err);
  else console.log('server started');
});
