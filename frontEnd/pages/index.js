'use strict'

window.addEventListener('load',pageLoad);


function pageLoad(e){
  // add listeners to the page


  //request to applicaitonServer



  document.getElementById("searchButton").addEventListener('click',searchHandler);

  // send request to load books to APS
    //getBooks();
    addReview();
    addUser();
}


function searchHandler(e){
  let searchParam = document.getElementById("searchBar").value;
  if(searchParam == "Search.."){
    searchParam = "";
  }
  // send request to server

}



async function addReview(){ // change back to e
  const userId = 1  ;          // pulled from somewhere
  const name = "joe" ;          // pulled from the
  const desc = "pretty bad" ;          // pull from dsc box make sure to convert to SQL format to prevent inject
  const score = 3;          // pull from stars
  const bookId = 2;           // pull from books
  const publ = "Tricorn Books";           //pull publisher from

  let url = 'home';
  url +='?userId='+userId + '&name=' + name + '&description=' + desc + '&score=' + score + 'bookId=' + bookId + 'publisher' + publ;
  let response = await fetch(url,{method:'POST'});
  console.log(response);
  // reload page
  }


// called on load, pulls all books with filters applied + order by
async function getBooks(){
  let filters = [] // get all the ticked filters from pages and page type

// filters code

  const order =  // pull single ticked order by
  let url = 'books/';
  // pass array as json
  url += '?order=' + order + '&filters= + 'encodeURIComponent(JSON.stringify(filters));
  const books = await fetch(url);
  // add the books to the page in someway

}

async function addUser(){ // change to e when done
  const fName = "bobby"//pull from google auth
  const lName = "bobser"//pull from google autho
  const userName ="bobbob" // have create user name and pull from html
  const img = "/not/real/"// pull from google autho

  let url = 'home/user';
  url +='?fName='+fName + '&lName=' +lName+ '&userName=' + userName + '&img=' + img;
  const response = await fetch(url,{method:'POST'});
  if(!response.ok) throw response;
  console.log(response);
  // login function / reload page

}

// async function addStaff(e){
//     const fName = //pull from google auth
//     const lName = //pull from google auth
//     const email = // pull from google auth
//     const contactNumber = // pull from ???
//
//     let url = 'home/staff';
//     url +='?fName='+fName + '&lName=' +lName+ '&email=' + email + '&contactNumber=' + contactNumber;
//     await fetch(url);
//     // reload page
// }




//spencer version
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
