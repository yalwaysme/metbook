'use strict'

window.addEventListener('load',pageLoad);


function pageLoad(e){
  // add listeners to the page


  //request to applicaitonServer




  document.getElementById("searchButton").addEventListener('click',searchHandler);

  // send request to load books to APS
  getBooks();

  //
}


function searchHandler(e){
  let searchParam = document.getElementById("searchBar").value;
  if(searchParam == "Search.."){
    searchParam = "";
  }
  // send request to server

}



async function addReview(e){
  const userID =            // pulled from somewhere
  const name =              // pulled from the
  const desc =              // pull from dsc box make sure to convert to SQL format to prevent inject
  const score =             // pull from stars
  const bookId =            // pull from books
  const publ =              //pull publisher from


  let url = 'api/home/book';
  url +='?userID='+userID + '&name=' + name + '&description=' + desc + '&score=' + score + 'bookId=' + bookId + 'publisher' + publ;




  const reviews = await fetch(url,{}'POST'});
  if(reviews == "fail"){

    console.log("something went wrong");
  }
  else{
    console.log("success");
    // reformat page getCurrentBook or getReviews
  }
}


function getBooks(){


}



async function addStaff(){
  // make sure pulled data is put into SQL format
  const fName= //pull from input boxes
  const lName= //pull from input boxes
  const email= //pull from input boxes
  const contactNumber= //pull from input boxes

  let url = 'api/users/staff';
  url +='?fName='+fName + '&lName=' + lName + '&email=' + email + '&contactNumber=' + contactNumber;

  const addStaff = await fetch(url,{}'POST'});

  if(addStaff == "fail"){
    console.log("something went wrong");
  }
  else{
    console.log("success");
  }
}
