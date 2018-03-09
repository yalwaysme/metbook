'use strict';

let express = require('express');
let path = require('path');
let database = express();

const mysql = require('mysql2/promise');
const config = require('./config.json');


//database.use not required at this stage, can think about it
database.get('/home', homeData);
database.get('/newIn', newInData);
database.get('/topreccomended', reccomendedData)
database.get('/home/:term', retrieveBooks);
database.get('/newIn/:term', retrieveBooks);
database.get('/topreccomended/:term', retrieveBooks);
database.get('/account:token', authenticate);
database.get('/searchResult:term', retrieveBooks);
database.post('/reviews/', addReview);
database.post('/createaccount/', addUser);

//Stringify raw objects
function jsonStringify(rawList) {
  for (i = 0; i < rawList.length; i++) {
    if(rawList[i].length=1){
      rawList[i] = JSON.stringify(rawList[i]);
    }
    for(let i=0; i<rawList[j].length; j++){
      rawList[i][j] = JSON.stringify(rawList[i][j]);
    }
  }
  return processedList;
}

//database retrieve functions
async function authenticate(req, res){
  const sql = await init();
  let raw = [];
  let result = await sql.query('SELECT id FROM USER WHERE id =' + req.token);

  if(id){
    let id = result;
    result = [];
     raw.push({userid: id});
     //User table
     let query = 'SELECT fname, lname, userName, imagePath FROM USER WHERE id=' + req.token;
     let [rows] = await sql.query(query);
     if(rows.length!=0){
     for (i = 0; i < rows.length; i++) {
       raw.push({
         fname: rows[i].fname,
         lname: rows[i].lname,
         userName: rows[i].userName,
         imagePath: rows[i].imagePath,
       });
     }
   }else{
     raw.push(false);
   }
    objs.push(raw);
 }else{
   raw.push(false)
 }

     //History
     let query = 'SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM BOOK WHERE History.userId =' + req.token + 'AND History.bookId = Book.bookId';
     let [rows] = await sql.query(query);
     if(rows.length!=0){
     for (i = 0; i < rows.length; i++) {
       raw.push({
         title: rows[i].title,
         author: rows[i].author,
         dateofpublication: rows[i].dateofpublication,
         publisher: rows[i].publisher,
         isbn: rows[i].isbn,
         description: rows[i].description,
         imagePath: rows[i].imagePath,
         type: rows[i].type,
       });
     }
        objs.push(raw);
   }else{
     raw.push(false);
   }

     //Your picks
     let query = 'SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM BOOK WHERE YourPicks.userId =' + token + 'AND YourPicks.bookId = Book.bookId';
     let [rows] = await sql.query(query);
     if(rows.length!=0){
     for (i = 0; i < rows.length; i++) {
       raw.push({
         title: rows[i].title,
         author: rows[i].author,
         dateofpublication: rows[i].dateofpublication,
         publisher: rows[i].publisher,
         isbn: rows[i].isbn,
         description: rows[i].description,
         imagePath: rows[i].imagePath,
         type: rows[i].type,
       });
     }
        objs.push(raw);
   }else{
     raw.push(false)
   }

     //Reviews
     let query = 'SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type, score, description FROM BOOK, Reviews WHERE Reviews.userId =' + token + 'AND Reviews.bookId = Book.bookId';
     let [rows] = await sql.query(query);
     if(rows.length!=0){
     for (i = 0; i < rows.length; i++) {
       raw.push({
         title: rows[i].title,
         author: rows[i].author,
         dateofpublication: rows[i].dateofpublication,
         publisher: rows[i].publisher,
         isbn: rows[i].isbn,
         description: rows[i].description,
         imagePath: rows[i].imagePath,
         type: rows[i].type,
         score: rows[i].score,
       });
     }
        objs.push(raw);
   }else{
     raw.push(false)
   }
     result = jsonStringify(objs);
     res.send(200, result);
}


//Retriving home data
async function homeData(req, res) {
  const sql = await init();
  let objs = [];
  let raw = [];
  //Interesting Reads
  let query = 'SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, Categories.title, Categories.description FROM Book WHERE InterestingReads.id = Book.id AND Categories.id = Book.catId';
  let [rows] = await sql.query(query);
  if(rows.length!=0){
  for (i = 0; i < rows.length; i++) {
    raw.push({
      type: rows[i].title,
      title: rows[i].author,
      description: rows[i].dateofpublication,
      imagePath: rows[i].publisher,
    });
  }
  objs.push(raw);
}else{
  objs.push(false);
}
  //Categories data
  let query = 'SELECT type, description FROM Categories';
  let [rows] = await sql.query(query);
  if(rows.length!=0){
  for (i = 0; i < rows.length; i++) {
    raw.push({
      type: rows[i].title,
      description: rows[i].author,
    });
  }
  objs.push(raw);
}else{
  objs.push(false);
}

  processedList = jsonStringify(objs);
  res.send(200, processedList);
}

//New in data
async function newInData(req, res) {
  const sql = await init();
  let query = 'SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book ORDERBY Date';
  let [rows] = await sql.query(query);
  let objs = [];

  //loop to create json objects
  if(rows.length!=0){
  for (let i = 0; i < rowss.length; i++) {
    objs.push({
      title: rows[i].title,
      author: rows[i].author,
      dateofpublication: rows[i].dateofpublication,
      publisher: rows[i].publisher,
      isbn: rows[i].isbn,
      description: rows[i].description,
      imagePath: rows[i].imagePath,
      type: rows[i].type,
    });
  }
}else{
  objs.push(false);
}
  processedList = jsonStringify(objs);
  res.send(200, processedList);
}

//reccomended data
async function reccomendedData(req, res) {
  const sql = await init();
  let query = 'SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book WHERE score>3';
  let [rows] = await sql.query(query);
  let objs = [];

  if(rows.length!=0){
  for (let i = 0; i < rows.length; i++) {
    objs.push({
      title: rows[i].title,
      author: rows[i].author,
      dateofpublication: rows[i].dateofpublication,
      publisher: rows[i]publisher,
      isbn: rows[i].isbn,
      description: rows[i].description,
      imagePath: rows[i].imagePath,
      type: rows[i].type,
    });
  }
}else{
  objs.push(false);
}
  processedList = jsonStringify(objs);
  res.send(200, processedList);

}

//Standard retrieve books, uses search term
async function retrieveBooks(req, res) {
  const sql = await init();
  let query = 'SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book WHERE title = ' + req.term;
  let [rows] = await sql.query(query);
  let objs=[];
  if(rows.length!=0){
  for (let i = 0; i < rows.length; i++) {
    objs.push({
      title: rows[i].title,
      author: rows[i].author,
      dateofpublication: rows[i].dateofpublication,
      publisher: rows[i].publisher,
      isbn: rows[i].isbn,
      description: rows[i].description,
      imagePath: rows[i].imagePath,
      type: rows[i].type,
    });
  }
}else{
  objs.push(false);
}
  processedList = jsonStringify(objs);
  res.send(200, processedList);
}

function insertChecks(results, insertQuery){
  if(insertQuery.length!=0){
    results.push(true);
  }else{
    results.push(false);
  }
  return results;
}
//Insertion
async function addBook(req, res){
  let results = [];
const sql = await init();
//Insert to Book
const insertQuery = sql.format('INSERT INTO PlacesToFind SET ? ;', {title: req.title, url: req.url, supportinfo: req.supportInfo});
results = insertChecks(results, insertQuery);
let query = 'SELECT id FROM PlacesToFind WHERE PlacesToFind.title = '+ req.title;
let placesID = await sql.query(query);
let query = 'SELECT id FROM Categories WHERE Categories.title = '+ req.cattitle;
let catID = await sql.query(query);
const insertQuery = sql.format('INSERT INTO Book SET ? ;', {title: req.title, author: req.author,  dateofpublication: req.dateofpublication, publisher: req.publisher, isbn: req.isbn,  description: req.description,  imagePath: req.imagePath, typeId: catID , reviewId: , placesToFind: result});
results = insertChecks(results, insertQuery);
res.send(200, results);
}


async function addReview(req, res){
  results = [];
  const sql = await init();
  //Insert to review
  const insertQuery = sql.format('INSERT INTO Review SET ?;', {bookId: req.id, score: req.score, description: req.description});
  results = insertChecks(results, insertQuery);
  //Insert to History
  const insertQuery = sql.format('INSERT INTO History SET ? ;', {userId: req.userId, bookId: req.bookId});
  results = insertChecks(results, insertQuery);
  res.send(200, results);
}

async function addStaff(req, res){
  results = [];
  const sql = await init();
  //Insert to staff
  const insertQuery = sql.format('INSERT INTO Staff SET ? ;', {fname: req.fName, lname: req.lName, email: req.email, phone: req.contactNumber});
  results = insertChecks(results, insertQuery);
  res.send(200, results);
}


async function addUser(req, res){
  results = [];
  const sql = await init();
  //maybe can modify
  const insertQuery = sql.format('INSERT INTO USER SET ? ;',{ fname: req.query.obj.fname, lname: req.query.obj.lname, username: req.query.obj.username, imagePath: req.query.obj.imagePath});
  results = insertChecks(results, insertQuery);
  res.send(200, results);
}


async function addCategory(req, res){
  resuls = [];
  const sql = await init();
  //maybe can modify
  const insertQuery = sql.format('INSERT INTO Categories SET ? ;', {type: req.type, title: req.title, description: req.description});
  results = insertChecks(results, insertQuery);
  res.send(200, results);
}

//custom your picks function required will be done later as can come up in mnay areas
//database setup functions

let sqlPromise = null;

async function init() {
  if (sqlPromise) return sqlPromise;

  sqlPromise = newConnection();
  return sqlPromise;
}

async function shutDown() {
  if (!sqlPromise) return;
  const stashed = sqlPromise;
  sqlPromise = null;
  await releaseConnection(await stashed);
}

async function newConnection() {
  //connection polling later
  const sql = await mysql.createConnection(config.mysql);

  // handle unexpected errors by just logging them
  sql.on('error', (err) => {
    console.error(err);
    sql.end();
  });

  return sql;
}

async function releaseConnection(connection) {
  await connection.end();
}

process.on('unhandledRejection', console.error);


database.listen(3000, console.log("Running"));
