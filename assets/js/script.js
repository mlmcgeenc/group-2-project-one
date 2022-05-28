//#region  API CALLS TO BE DELETED
let account = "7JHhPYyxv2UtIUfImk4BYOdeKZvgQ6r1Wba971Cv";
let userEntry = "Goodfellas";
let imdbApiKey = "k_v4xuex9v";

// Autocomplete API to get an array of titles matching the search
var fetchResultsList = function (userEntry) {
	let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${account}&search_value=${userEntry}`;
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
		});
};

// Title details API call provides ImDB number and sources array
var findTitleSources = function (choosenTitleId) {
	let url = `https://api.watchmode.com/v1/title/345534/details/?apiKey=YOUR_API_KEY`;
};

// get reviews from IMDB using IMDB ID
var getTitleReviews = function (imdbId) {
	let url = `https://imdb-api.com/en/API/Ratings/${imdbApiKey}/${imdbId}`;
};
//#endregion

let searchDiv = $("#search-div");
/* NOTE: recentSearchDiv visi can't be managed
	when jQuery used to select element.
*/
let recentSearchDiv = document.querySelector("#recent-search-div");
let recents_ul = $("#recents-list");
let searchTextInput, currentRqst;
let isGoodRequest = true;

/* element is set to hidden via CSS */
let manage_element_visi = function (element_list, doHide) {
  for (let i = 0; i < element_list.length; i++) {
    elem = element_list[i];

    if (doHide) elem.hidden = true;
    else {
      elem.hidden = false;
      elem.style.visibility = "visible";
    }
  }
};

//#region INITIAL STORAGE LOAD
let storedSearches = JSON.parse(localStorage.getItem("storedSearches"));
let storedSearchObj = storedSearches ? storedSearches : [];

if (storedSearches) {
	manage_element_visi([recentSearchDiv], false);
	for(let i = 0; i < storedSearches.length; i++)
		recents_ul.append(`<li>${storedSearches[i]}</li>`);
}
//#endregion

let upDateStorage = function(item) {
	if (!storedSearchObj.includes(item)) {

		storedSearchObj.push(item);

		if (storedSearchObj.length > 3)
			storedSearchObj.shift();

		localStorage.setItem("storedSearches", JSON.stringify(storedSearchObj));
		manage_element_visi([recentSearchDiv], false);

		recents_ul.prepend(`<li>${item}</li>`);
		let liCount = $("#recents-list li").length;
		if (liCount > 3)
			recents_ul.children().last().remove();
  }
}

/* incorporate to Matt's eventhandler */
$("#search-results").click(function () {
	searchTextInput = document.querySelector("#searchTxt");
	currentRqst = searchTextInput.value;
	if(isGoodRequest)
		upDateStorage(currentRqst);
	searchTextInput.value = "";
	/* get Matt to return an isGoodRequest var
	 so we confirm b/4 adding to storage.
	 Hardcoded for now. */
});
