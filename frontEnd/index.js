'use strict'

window.addEventListener('load',pageLoad);


function pageLoad(e){
  // add listeners to the page
  document.getElementById("searchButton").addEventListener('click',searchHandler);

  // send request to load books


  //
}


function searchHandler(e){
  let searchParam = document.getElementById("searchBar").value;
  if(searchParam == "Search.."){
    searchParam = "";
  }
  // send request to server

}
