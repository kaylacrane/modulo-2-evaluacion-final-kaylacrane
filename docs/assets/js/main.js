"use strict";const seriesTitle=document.querySelector(".js-seriesTitle"),searchBox=document.querySelector(".js-searchBox"),searchButton=document.querySelector(".js-searchButton"),searchResultsSection=document.querySelector(".js-search-results-section"),favsTitle=document.querySelector(".js-favorites-title"),favoritesListDisplay=document.querySelector(".js-favorites-list"),placeholderImg="https://dummyimage.com/210x295/ffb6c1/000000.png&text=",placeholderImgFavs="https://dummyimage.com/210x295/75e0db/000000.png&text=";let searchValue,searchResults=[],favorites=[];function getSearchData(){searchValue=searchBox.value}function initiateServerRequest(e){e.preventDefault(),fetch("https://api.tvmaze.com/search/shows?q="+searchValue).then(e=>e.json()).then(e=>{searchResults=e,displayCats(),displayNoDogs(),displayResults()})}function displayResults(){let e="";for(let s=0;s<searchResults.length;s++){const{id:a,name:t,image:r,url:i}=searchResults[s].show;e+=`<article class="series-card js-series-card" id="${a}">`,e+=`<span class="series-card-favs js-series-card-favs" id="${a}">`,e+='<i class="fas fa-plus-square"></i>',e+=" Add to Favs</span>",e+='<div class="img-container">',e+=`<a href="${i}" title='Visit ${t} on TVmaze' target="_blank">`,e+=r?`<img src="${r.medium}" class="series-image js-series-image" alt="Cover image for ${t}" /></a></div>`:`<img src="${placeholderImg}${t}" class="series-image js-series-image" alt="Cover image for ${t}" /></a></div>`,e+=`<h3 class="series-title js-seriesTitle">${t}</h3>`,e+="</article>"}searchResultsSection.innerHTML=e,showSearchResultFavorites(),listenSeriesClicks(),displayImgNoResults()}function showSearchResultFavorites(){document.querySelectorAll(".js-series-card").forEach(e=>{favorites.find(s=>s.show.id===parseInt(e.id))?e.classList.add("js-card-favorite"):e.classList.remove("js-card-favorite")}),changeFavButtonSearchResults()}function changeFavButtonSearchResults(){document.querySelectorAll(".js-series-card-favs").forEach(e=>{favorites.find(s=>s.show.id===parseInt(e.id))?(e.classList.add("js-series-favs-remove"),e.innerHTML='<i class="fas fa-minus-square" aria-hidden="true"></i> Remove from Favs'):(e.classList.remove("js-series-favs-remove"),e.innerHTML='<i class="fas fa-plus-square"></i> Add to Favs')})}function displayImgNoResults(){0===searchResults.length?searchResultsSection.classList.add("js-no-results-img"):searchResultsSection.classList.remove("js-no-results-img")}function displayNoDogs(){"dog"!==searchValue.toLowerCase()&&"dogs"!==searchValue.toLowerCase()||alert("Dogs?! 🙀 Oh the betrayal... ")}function displayCats(){"cat"!==searchValue.toLowerCase()&&"cats"!==searchValue.toLowerCase()||alert("I must say, you have amazing taste 🌟😻🌟")}function listenSeriesClicks(){document.querySelectorAll(".js-series-card-favs").forEach(e=>{e.addEventListener("click",updateFavorites)})}function listenFavoritesClicks(){document.querySelectorAll(".js-remove-favorites").forEach(e=>{e.addEventListener("click",updateFavorites)})}searchBox.addEventListener("keyup",getSearchData),searchButton.addEventListener("click",initiateServerRequest),favsTitle.addEventListener("click",openCloseFavs);const deleteAllFavs=document.querySelector(".js-delete-favs-icon");function openCloseFavs(){favoritesListDisplay.classList.toggle("js-open-favs")}function resetFavsList(){favorites=[],updateLocalStorage(),loadLocalStorage(),showSearchResultFavorites(),updateFavsNumber()}function displayFavorites(){let e="";for(const s of favorites)e+='<div class="favorites-item">',e+=`<span class="remove-favorites js-remove-favorites" id="${s.show.id}" title="Remove from favorites list">`,e+='<i class="fas fa-minus-square remove-icon"></i>',e+="Remove</span>",e+=`<a href="${s.show.url}" title="Visit ${s.show.name} on TVmaze" target="_blank">`,s.show.image?e+=`<img src="${s.show.image.medium}" class="js-favoritesImage favorites-image" alt="Cover image for ${s.show.name}" />`:e+=`<img src="${placeholderImgFavs}${s.show.name}" class="js-favoritesImage favorites-image" alt="Cover image for ${s.show.name}" />`,e+="</a></div >";favoritesListDisplay.innerHTML=e,listenFavoritesClicks()}function updateFavorites(e){const s=parseInt(e.currentTarget.id),a=searchResults.find(e=>e.show.id===s),t=favorites.findIndex(e=>e.show.id===s);t>=0?favorites.splice(t,1):-1===t&&favorites.push(a),changeFavButtonSearchResults(),displayFavorites(),updateLocalStorage(),showSearchResultFavorites(),updateFavsNumber()}function updateFavsNumber(){document.querySelector(".js-favs-count").innerHTML=favorites.length}function updateLocalStorage(){0===favorites.length?localStorage.removeItem("favorites"):localStorage.setItem("favorites",JSON.stringify(favorites))}function loadLocalStorage(){const e=JSON.parse(localStorage.getItem("favorites"));e&&(favorites=e),displayFavorites(),updateFavsNumber()}deleteAllFavs.addEventListener("click",resetFavsList),loadLocalStorage();
