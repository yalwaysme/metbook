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

database.post('/reviews/', addReview);
database.post('/users/staff',addStaff);
database.post('/users/user',addUser);
//extra posts but like 3
//error checking and insertion
//possible middleware required for image path calculation - probably actually
//codes will be added later

//possible not requied as data is already parsed as json but will double check this requirement
function jsonStringify(rawList) {
  for (i = 0; i < rawList.length; i++) {
    rawList[i] = JSON.stringify(rawList[i]);
  }

  return rawList;
}

//database retrieve functions
async function authenticate(req, res){
  const sql = await init();

  let result = await sql.query('SELECT '+ req.query.token + 'FROM USER');

  if(result!=null){
    let id = result;
    result = [];
    //will double check
     result.push({user id: id});
     result.push(await sql.query('SELECT' + token + ', fname, lname, userName, imagePath'));
     result.push(await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM BOOK WHERE History.userId =' + req.query.token + 'AND History.bookId = Book.bookId'));
     result.push(await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM BOOK WHERE YourPicks.userId =' + token + 'AND YourPicks.bookId = Book.bookId'));
     result.push(await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type, score, description FROM BOOK WHERE Reviews.userId =' + token + 'AND Reviews.bookId = Book.bookId'));
     result = jsonStringify(result);
  }
  res.send(result);
}

async function homeData(req, res) {
  const sql = await init();
  let objs = [];``
  let raw = [];
  let rows =[];
  //possible split
  rows.push([rows] = await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book ORDERBY Date'));

  for (i = 0; i < rows.COUNT; i++) {
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

  rows.push(await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book WHERE' + InterestingReads.id = Book.id));
  for (i = 0 < i < rows.COUNT; i++) {
    raw.push({
      type: rows[i].title,
      title: rows[i].author,
      description: rows[i].dateofpublication,
      imagePath: rows[i].publisher,
    });
  }
  objs.push(raw);
  rows.push(await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book WHERE' + InterestingReads.id = Book.id));
  for (i = 0; i < rows.COUNT; i++) {
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

  processedList = jsonStringify(objs);
  res.send(processedList);
}

async function newInData(req, res) {
  const sql = await init();
  const [rows] = await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book ORDERBY Date');
  let objs = [];

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
  processedList = jsonStringify(objs);
  res.send(processedList);

  //More queries?
}

async function reccomendedData(req, res) {
  const sql = await init();
  const [rows] = await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book WHERE score>3');
  let objs = [];

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
  processedList = jsonStringify(objs);
  res.send(processedList);

  //More queries?

}



async function retrieveBooks(req, res) {
  const sql = await init();
  const [rows] = await sql.query('SELECT title, author, dateofpublication, publisher, isbn, description, imagePath, type FROM Book WHERE title LIKE ' + req.query.term);
  let objs = [];

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
  processedList = jsonStringify(objs);
  res.send(processedList);
}

//insertion
function addBook(obj){
const sql = await init();
//maybe can modify
const insertQuery = sql.format('INSERT INTO Book SET ? ;', {obj.title, obj.author, obj.dateofpublication, obj.publisher, obj.isbn, obj.description, obj.imagePath, obj.type, obj.score});
const insertQuery = sql.format('INSERT INTO PlacesToFind SET ? ;', {obj.bookId, obj.title, obj.url, obj.supportInfo});
const result = await sql.query(insertQuery);
if(result!=null){
  result = 'success';
}else{
  result = 'fail';
}
res.send(result);
}


async function addReview(req, res){
  const sql = await init();
  //maybe can modify
  const insertQuery = sql.format('INSERT INTO Review SET ? ;', {req.bookId req.score, req.description, req.publisher});
  const insertQuery = sql.format('INSERT INTO History SET ? ;', {req.id, req.bookId});
  const result = await sql.query(insertQuery);
  if(result!=null){
    result = 'success';
  }else{
    result = 'fail';
  }
  res.send(result);
}

async function addStaff(req, res){
  const sql = await init();
  //maybe can modify, no id requred due to auto_increment
  const insertQuery = sql.format('INSERT INTO Staff SET ? ;', {req.fName req.lName, req.email, req.contactNumber});
  const result = await sql.query(insertQuery);
  if(result!=null){
    result = 'success';
  }else{
    result = 'fail';
  }
  res.send(result);
}


async function addUser(req, res){
  const sql = await init();
  //maybe can modify
  const insertQuery = sql.format('INSERT INTO Categories SET ? ;', {obj.type, obj.description});
  const result = await sql.query(insertQuery);
  if(result!=null){
    result = 'success';
  }else{
    result = 'fail';
  }
  res.send(result);
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

//modules, possibly more
module.exports.authenticate = authenticate;


database.listen(8080);
