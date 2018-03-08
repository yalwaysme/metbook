'use strict'

const express = require ('express');

const app = express();


async function addReview(req,res){
  let url = 'database/reviews';
  url +='?userID='+req.userID + '&name=' + req.name + '&description=' + req.description + '&score=' + req.score + 'bookId=' + req.bookId + 'publisher' + req.publisher;
  const response = await fetch('url',{method: 'POST'});

  res.send(response); // fail or sucess response
}


async function addStaff(req,res){
  let url = '?fName='+req.fName + '&lName=' + req.lName + '&email=' + req.email + '&contactNumber=' + req.contactNumber;
  const response = await fetch('url',{method: 'POST'});

  res.send(response);
}




async function  loadBooks(req,res){

}

async function getRatings(req,res){
  // add code here
  console.log("some ratings");
}




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

app.post('/api/home/books',addReviews);
app.post('/api/users/staff',addStaff)
