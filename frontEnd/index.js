'use strict'

window.addEventListener('load',pageLoad);


function pageLoad(e){
  // add listeners to the page


  //request to applicaitonServer




  document.getElementById("searchButton").addEventListener('click',searchHandler);

  // send request to load books to APS


  //
}


function searchHandler(e){
  let searchParam = document.getElementById("searchBar").value;
  if(searchParam == "Search.."){
    searchParam = "";
  }
  // send request to server

}



function addReview(e){
  const userID =            // pulled from somewhere
  const name =              // pulled from the
  const desc =              // pull from dsc box


  let url = 'api/home/book';
  url += '?name=' + name + '&desc=' + desc


  const reviews = await fetch(url,{}'POST'});
  //pull from review field

  // send userId score desc
}
