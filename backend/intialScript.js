
const mysql = require('mysql2');
const config = require('./config');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  charset: 'UTF8MB4'})


function makeTables(){



  connection.query("create database if not exists back",function(err,result){
    if(err) throw err;
    console.log("database created");
  });


  connection.query("create table if not exists back.Categories (id int primary key auto_increment,type varchar(50),title varchar(50),description varchar(100),imagePath varchar(40))",function(err,result){
    if(err) throw err;
    console.log("Cats created");
  });

  connection.query("create table if not exists back.PlacesToFind (id int primary key auto_increment,title varchar(50),url varchar(60),supportInfo varchar(80))",function(err, result){
  if(err) throw err;
  console.log("PlacesToFind created");
  });


  connection.query("create table if not exists back.Staff (id int primary key auto_increment,fname varchar(30),lname varchar(30),email varchar(40),phone int(11))",function(err,result){
      if(err) throw err;
      console.log("staff created");
  });

  connection.query("create table if not exists back.User (id int primary key auto_increment,fname varchar(30),lname varchar(30),userName varchar(30),imagePath varchar(80))",function(err,result){
      if(err) throw err;
      console.log("user created");
  });

  connection.query("create table if not exists back.Reviews (id int primary key auto_increment,score int,description varchar(80),foreign key (bookId) references Book(bookId))",function(err,result){
      if(err) throw err;
      console.log("reviews created");
    });



  connection.query("create table if not exists back.Book (id int primary key auto_increment,title varchar(50),author varchar(50),dateofpublication date,isbn int(11),description varchar(100),imagePath varchar(80),typeId int,reviewId int,placesToFindID int,foreign key (typeId) references Categories(id),foreign key (reviewId) references Reviews(id))",function(err,result){
      if(err) throw err;
      console.log("Book Created");
  });








  connection.query("create table if not exists back.bookCategory (id int auto_increment,bookId int,catId int,primary key (id, bookId, catId),foreign key (bookId) references Book(id),foreign key (catId) references Categories(id))",function(err,result){
    if(err) throw err;
    console.log("bookCat created");
  });



  connection.query("create table if not exists back.InterestingReads (bookId int,staffId int,primary key (bookId, staffId),foreign key (bookId) references Book(id),foreign key (staffId) references Staff(id))",function(err,result){
      if(err) throw err;
      console.log("intReads created");
 });



  connection.query("create table if not exists back.History (id int auto_increment,userId int,bookId int,primary key (id, userId, bookId),foreign key (userId) references User(id),foreign key (bookId) references Book(id))",function(err,result){
      if(err) throw err;
      console.log("history created");
    });
  connection.query("create table if not exists back.YourPicks (id int auto_increment,userId int,bookId int,primary key (id, userId, bookId),foreign key (userId) references User(id),foreign key (bookId) references Book(id))",function(err,result){
      if(err) throw err;
      console.log("yourPicks created");
    });



    connection.query("create table if not exists back.UserReviews (id int auto_increment,reviewId int,userId int,bookId int,primary key (id, reviewId, userId, bookId),foreign key (reviewId) references Reviews(id),foreign key (userId) references User(id),foreign key (bookId) references Book(id))",function(err,result){
        if(err) throw err;
        console.log("bookCat created");
      });




connection.query("insert ignore into back.PlacesToFind values        (1,'Amazon','amazon.com','wtf is support info')",function(err,result){
  if(err) throw err;
    console.log("record 2 inserted");
});

  connection.query("insert ignore into back.Book values (1,'Some Book','Bob Green',10/12/1993,1234,'A fake book i just made','fakeImg/fake',1,1,1)",function(err,result){
    if(err) throw err;
    console.log("record 1 inserted");
    });



  connection.query("insert ignore into back.User values (1,'joe','joeson','mrJoe','dontKnowMate')",function(err,result){
    if(err) throw err;
    console.log("record 3 inserted");
    });
}
module.exports = {
  makeTables:makeTables
}
