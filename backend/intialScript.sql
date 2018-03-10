create database if not exists back;

create table if not exists back.Book (
  id int primary key auto_increment,
  title varchar(50),
  author varchar(50),
  dateofpublication date,
  isbn int(11),
  description varchar(100),
  imagePath varchar(80),
  type varchar(50),
  score int;
  foreign key (type) references Categories(type),
  foreign key (score) references Reviews(socre);
);


create table if not exists back.PlacesToFind (
  id int primary key auto_increment,
  bookID varchar(50),
  title varchar(50),
  url varchar(60),
  supportInfo varchar(80),
  foreign key (bookID) references Book(id),
);

create table if not exists back.Categories (
  id int primary key auto_increment,
  type varchar(50),
  title varchar(50),
  description varchar(100),
  imagePath varchar(40),
);


create table if not exists back.bookCategory (
  bookId int,
  catId int),
  primary key (bookId, catId) auto_increment,
  foreign key (bookId) references Book(id),
  foreign key (catId) references Categories(id),
);

create table if not exists back.Staff (
  id int primary key auto_increment,
  fname varchar(30),
  lname varchar(30),
  email varchar(40),
  phone int(11),
);

create table if not exists back.InterestingReads (
  bookId int,
  staffId int,
  primary key (bookId, staffId) auto_increment,
  foreign key (bookId) references Book(id),
  foreign key (staffId) references Staff(id),
);


create table if not exists back.User (
  id int primary key auto_increment,
  fname varchar(30),
  lname varchar(30),
  userName varchar(30),
  imagePath varchar(80),
);

create table if not exists back.History (
  id int,
  userId int,
  bookId int,
  primary key (id, userId, bookId) auto_increment,
  foreign key (userId) references User(id),
  foreign key (bookId) references Book(id),
);

create table if not exists back.YourPicks (
  id int,
  userId int,
  bookId int,
  primary key (id, userId, bookId) auto_increment,
  foreign key (userId) references User(id),
  foreign key (bookId) references Book(id),
);

create table if not exists back.Reviews (
  id int primary key auto_increment,
  score int,
  description varchar(80),
);


create table if not exists back.UserReviews (
  reviewId int primary key auto_increment,
  userId int,
  bookId int;
  primary key (reviewId, userId) auto_increment,
  foreign key (reviewId) references Reviews(id),
  foreign key (userId) references User(id),
  foreign key (bookId) references Book(bookId),
);




insert ignore into back.Book values (1,'Some Book","Bob Green',10/12/1993,1234,"A fake book i just made","fakeImg/fake");

insert ignore into back.PlacesToFind values (1,1,'Amazon','amazon.com','wtf is support info');

insert ignore into back.User values (1,'joe','joeson','mrJoe','dontKnowMate');
