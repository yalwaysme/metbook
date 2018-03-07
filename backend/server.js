'use strict'

const express = require ('express');
const mysql = require('mysql2/promise');



const config = require('./config.js');

const sqlPromise = mysql.createConnection(config.mysql);


// add DB
const app = express();

// listen for requests
app.listen(8080, (err) => {
  if (err)
    console.error('error starting server', err);
  else
    console.log('server started');
  }
);



async function pullBooks(req,res){
  console.log("");
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
