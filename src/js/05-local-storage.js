loadLocalStorage();

function updateLocalStorage() {
  /*deletes local storage key if favs list is empty, otherwise updates key with each new item*/
  if (favorites.length === 0) {
    localStorage.removeItem('favorites');
  } else {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }
}

/*populates favs list upon load with local storage data*/
function loadLocalStorage() {
  const favsLocalStorage = JSON.parse(localStorage.getItem('favorites'));
  if (favsLocalStorage) {
    favorites = favsLocalStorage;
  }
  displayFavorites();
  updateFavsNumber();
}
