//  ! Placeholder variables
//  * ID's & classes needed: submit button
var submitButtonEl = $('#submit-btn');
var account = 'ruNaWJgAnvmlDC7luYrIu0wwVIofUPwcmWpHkPJZ'

//  Push the user entry input to fetchResultsList
//  * ID's needed: search form's input ID
function handleNewSearch (event) {
    event.preventDefault();
    userEntry = $(this).siblings('#placeholder').val().trim();
    if (userEntry) {
        fetchResultsList(userEntry);
        $('#placeholder').val('');
    }
//  ? should we add an else statement with a modal 'Please enter a search item'
}

// Autocomplete API to get an array of titles matching the search
var fetchResultsList = function (userEntry) {
	let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${account}&search_value=${userEntry}`;
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
            buildResultsList(json);
		});
};

// Take user entry data and build a list of results and dynamically display onto the DOM
//  * ID's needed: div container for displaying the results, id for styling the displayed results
function buildResultsList(json) {
    for (var i = 0; i < json.results.length; i++) {
        var nameTitle = json.results[i].name;
        var releaseTitle = json.results[i].year
        var typeOfShow = json.results[i].type.replace('_', ' ');
        var dataId = json.results[i].id;

        var resultButton = $(`<button class='results-list-styling-placeholder' data-id=${dataId}></button>`).appendTo('#placeholder-results-div');
        var displayResults = $(`<ul class='results-list-styling-placeholder'></ul>`).appendTo(resultButton);
        $(`<li class='results-list-styling-placeholder'> ${nameTitle} ${releaseTitle} ${typeOfShow} </li>`).appendTo(displayResults);
    }
};


// Title details API call provides ImDB number and sources array
var findTitleSources = function (choosenTitleId) {
	let url = `https://api.watchmode.com/v1/title/345534/details/?apiKey=YOUR_API_KEY`;
};

// get reviews from IMDB using IMDB ID
var getTitleReviews = function (imdbId) {
	let url = `https://imdb-api.com/en/API/Ratings/${imdbApiKey}/${imdbId}`;
};


$(submitButtonEl).on('click', handleNewSearch);



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



// /#region  API CALLS TO BE DELETED
// let account = "7JHhPYyxv2UtIUfImk4BYOdeKZvgQ6r1Wba971Cv";
// let userEntry = "Goodfellas";
// let imdbApiKey = "k_v4xuex9v";

// // Autocomplete API to get an array of titles matching the search
// var fetchResultsList = function (userEntry) {
// 	let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${account}&search_value=${userEntry}`;
// @@ -17,3 +22,67 @@ var findTitleSources = function (choosenTitleId) {
// var getTitleReviews = function (imdbId) {
// 	let url = `https://imdb-api.com/en/API/Ratings/${imdbApiKey}/${imdbId}`;
// };

// //#region INITIAL STORAGE LOAD
// let storedSearches = JSON.parse(localStorage.getItem("storedSearches"));
// let storedSearchObj = storedSearches ? storedSearches : [];

// if (storedSearches) {
// 	manage_element_visi([recentSearchDiv], false);
// 	for(let i = 0; i < storedSearches.length; i++)
// 		recents_ul.append(`<li>${storedSearches[i]}</li>`);
// }
// //#endregion

// let upDateStorage = function(item) {
// 	if (!storedSearchObj.includes(item)) {

// 		storedSearchObj.push(item);

// 		if (storedSearchObj.length > 3)
// 			storedSearchObj.shift();

// 		localStorage.setItem("storedSearches", JSON.stringify(storedSearchObj));
// 		manage_element_visi([recentSearchDiv], false);

// 		recents_ul.prepend(`<li>${item}</li>`);
// 		let liCount = $("#recents-list li").length;
// 		if (liCount > 3)
// 			recents_ul.children().last().remove();
//   }
// }

// /* incorporate to Matt's eventhandler */
// $("#search-results").click(function () {
// 	searchTextInput = document.querySelector("#searchTxt");
// 	currentRqst = searchTextInput.value;
// 	if(isGoodRequest)
// 		upDateStorage(currentRqst);
// 	searchTextInput.value = "";
// 	/* get Matt to return an isGoodRequest var
// 	 so we confirm b/4 adding to storage.
// 	 Hardcoded for now. */
// });