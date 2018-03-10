'use strict'

window.addEventListener('load',pageLoad);


function pageLoad(e){
  // add listeners to the page


  //request to applicaitonServer




  document.getElementById("searchButton").addEventListener('click',searchHandler);

  // send request to load books to APS
//  getHomeBooks();
    addReview();
  //
}


function searchHandler(e){
  let searchParam = document.getElementById("searchBar").value;
  if(searchParam == "Search.."){
    searchParam = "";
  }
  // send request to server

}



async function addReview(){ // change back to e
  const userID = 1  ;          // pulled from somewhere
  const name = "joe" ;          // pulled from the
  const desc = "pretty bad" ;          // pull from dsc box make sure to convert to SQL format to prevent inject
  const score = 3;          // pull from stars
  const bookId = 2;           // pull from books
  const publ = "Tricorn Books";           //pull publisher from


  let url = 'home';
  url +='?userID='+userID + '&name=' + name + '&description=' + desc + '&score=' + score + 'bookId=' + bookId + 'publisher' + publ;




  const reviews = await fetch(url,{method:'POST'});
  if(reviews == "fail"){

    console.log("something went wrong");
  }
  else{
    console.log("success");
    // reformat page getCurrentBook or getReviews
  }
}


// async function getHomeBooks(){
//   let homeBooksList = await fetch('api/home/books');
//   // gets List [[list of home books, [list intresting reads],[list of intresting reads] ]
//   for(let i = 0;i < homeBooksList.length;i++){
//     // choose element to add to
//
//     // add code
//
//     for(let j = 0;j<homeBooksList[i].length;i++){
//     // add indivual book to element,book is in json
//
// // change created elements to what they acutally are
//       let newBook = document.createElement("section")
//
//       let title = document.createElement("h3");
//       title.innerText = homeBooksList[i[j]].title
//       title.classList.add('title');
//
//       let author = document.createElement("p");
//       author.innerText =  homeBooksList[i[j]].author
//       author.classList.add('author');
//
//       let dateOfPub = document.createElement("p");
//       dateOfPub.innerText =  homeBooksList[i[j]].dateofpublication
//       dateOfPub.classList.add('dateOfPub');
//
//       let pub = document.createElement("p");
//       pub.innerText = homeBooksList[i[j]].publisher;
//       publisher.classList.add('publisher');
//
//       let isbn = document.createElement("p");
//       isbn.innerText = homeBooksList[i[j]].isbn;
//       isbn.classList.add('isbn');
//
//       let desc = document.createElement("p");
//       desc.innerText = homeBooksList[i[j]].description;
//       desc.classList.add('desc');
//       // left out img path as possible change to blob
//
//
//       let type = document.createElement("p");
//       type.innerText = homeBooksList[i[j]].type;
//       type.classList.add('type');
//
//       let newBookChildren = [title,author,dataOfPub,pub,isbn,desc,type];
//       for(let k = 0;k<newBookChildren.length;k++){
//         newBook.appendChild(newBookChildren[k]);
//       }
//       newBook.classList.add('book');
//       window.element.appendChild(newBook)
//     }
//   }
// }



// async function addStaff(){
//   // make sure pulled data is put into SQL format
//   const fName= //pull from input boxes
//   const lName= //pull from input boxes
//   const email= //pull from input boxes
//   const contactNumber= //pull from input boxes
//
//   let url = 'api/users/staff';
//   url +='?fName='+fName + '&lName=' + lName + '&email=' + email + '&contactNumber=' + contactNumber;
//
//   const addStaff = await fetch(url,{}'POST'});
//
//   if(addStaff == "fail"){
//     console.log("something went wrong");
//   }
//   else{
//     console.log("success");
//   }
// }
