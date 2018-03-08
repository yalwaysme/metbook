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
    console.error('error starting server', err);
  else
    console.log('server started');
  }
);



async function pullBooks(title,sort){
  // add params to specifiy what we are pulling , ATM pulling all books at once

  let query = 'SELECT Title, Author, DateOfPublication, Publisher, ISBN, Description, Image, Type FROM Book';
  let order;
  switch(sort){
    case 'asc':
    case 'a2z':order = 'title ASC'; break;
    case 'dsc':
    case 'z2a':order = 'title DESC';break;
    case 'oldest':order = 'id ASC';break;
    case 'newest':
    default: order = 'id DESC';

  }
  query += ' ORDER BY ' + order;


  const [rows] = await sql.query(query);

  return rows.map((row) => {
      return {
        id: row.id,
        title: row.title,
        author: row.author,
        dateOfPublication: row.dateOfPublication,
        publisher: row.publisher,
        ISBN: row.ISBN,
        image: row.image,
        type: row.type,
      };
    });
}

async function addRating(req,res){
  const newRating ={
    userId: req.query.userId,
    score: req.query.score,
    description: req.query.desc
  }
  const [rows] = await sql.query(sql.format('INSERT INTO Reviews SET ?', newRating)); // maybe rename Reviews
  return { id: rows.insertId, title: newRating.userId,score: newRating.score,description: newRating.description };
}



async function getRatings(req,res){

  // add code here
  console.log("some books");



}




module.exports.add = {
  addRating : addRating
}
