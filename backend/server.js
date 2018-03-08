'use strict'

const express = require ('express');
// const mysql = require('mysql2/promise');



const config = require('./config');

// const sqlPromise = mysql.createConnection(config.mysql);


// add DB
const app = express();


// serve static pages
app.use('/', express.static(config.pages, { extensions: ['html','css'] }));

// output log to the console
app.use('/', (req, res, next) => { console.log(new Date(), req.method, req.url); next(); });


// listen for requests
app.listen(8080, (err) => {
  if (err)
    console.error('error starting applicaitonServer server', err);
  else
    console.log('applicaitonServer server started');
  }
);



async function addReview(req,res){
  const response = await fetch('/database/reviews',{
    method: 'POST',
    body:data
  });

  res.send(response);
}
async function  loadBooks(req,res){

}



async function getRatings(req,res){
  // add code here
  console.log("some books");
}


app.get('/api/home/books',addReviews);
