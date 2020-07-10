'use strict';

function displayResults() {
  let codeHTML = '';

  for (let index = 0; index < searchResults.length; index++) {
    let series = searchResults[index].show;
    codeHTML += `<article class="seriesCard" id="${series.id}">`;
    codeHTML += `<div class="imgContainer">`;
    codeHTML += `<a href="${series.url}" title="Visit ${series.name} on TVmaze">`;
    if (series.image) {
      codeHTML += `<img src="${series.image.medium}" class="seriesImage js-seriesImage" alt="Cover image for ${series.name}" /></a></div>`;
    } else {
      codeHTML += `<img src="${placeholderImg}" class="seriesImage js-seriesImage" alt="Cover image for ${series.name}" /></a></div>`;
    }
    codeHTML += `<h3 class="seriesTitle js-seriesTitle">${series.name}</h3>`;
    codeHTML += `<span class="add-favorites js-add-favorites" id="${series.id}">`;
    codeHTML += `<i class="fas fa-plus-square"></i>`;
    codeHTML += `Add to Favorites</span>`;
    codeHTML += `</article>`;
  }
  const searchResultsSection = document.querySelector(
    '.js-searchResultsSection'
  );
  searchResultsSection.innerHTML =
    `<h2 class="s">Your search results:</h2>` + codeHTML;
  listenSeriesClicks();
}
