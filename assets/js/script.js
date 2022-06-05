const searchResultsEl = document.getElementById('results-list');
const contentEl = document.getElementById('content');
const mattsWatchmodeAccount = 'CFUyQoNYEjDUNjdIGVUjd03eAKPBvYKRtCQAdiUu';
const mattsImdbAccount = 'k_h9vj9ndq';
var submitButtonEl = document.getElementById('search-results-btn');
let searchDiv = $('#search-div');
let recentSearchDiv = document.querySelector('#recent-search-div');
let recents_ul = $('#recents-list');
let searchTextInput, currentRqst;
let isGoodRequest = true;
var formEl = document.getElementById('search-form');

// Declare an object named selectionInfo that will contain the needed info collected through API calls
let selectionInfo = {
	title: '',
	poster: '',
	imdb_rating: '',
	streaming_services: [],
};

let storedSearches = JSON.parse(localStorage.getItem('storedSearches'));
let storedSearchObj = storedSearches ? storedSearches : [];

if (storedSearches) {
	manage_element_visi([recentSearchDiv], false);
	for (let i = 0; i < storedSearches.length; i++) recents_ul.append(`<li class='stored-searches'>${storedSearches[i]}</li>`);
}

// ==================== SEARCH ====================
//  Push the user entry input to fetchResultsList
//  * ID's needed: search form's input ID
function handleNewSearch(event) {
	event.preventDefault();
	searchResultsEl.innerHTML = '';
	userEntry = $(this).siblings('#searchTxt').val().trim();
	if (userEntry) {
		fetchResultsList(userEntry);
		$('#searchTxt').val('');
	}
	//  ? should we add an else statement with a modal 'Please enter a search item'
}

// Autocomplete API to get an array of titles matching the search
const fetchResultsList = function (userEntry) {
	let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${mattsWatchmodeAccount}&search_value=${userEntry}`;
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
		var releaseTitle = json.results[i].year;
		var typeOfShow = json.results[i].type.replace('_', ' ');
		var dataId = json.results[i].id;
		$(
			`<div class="button-container">
	  <div class="results-btn" data-id="${dataId}"'> ${nameTitle} <br /><span class='orange-txt'>${releaseTitle} ${typeOfShow}<span></div>
	  <div class="playBtn"> <i class="fa-solid fa-play fa-2x"></i></div>
	  </div>`
		).appendTo('#results-list');
	}
}

// ==================== USER SELECTS A RESULT FROM LIST RETURNED FROM SEARCH ====================
const handleMakeSelection = function (e) {
	// Get the watchmode ID from the search result the user has clicked on and use it to search watchmode for details about that show/movie
	const watchmodeId = e.target.getAttribute('data-id') ? e.target.getAttribute('data-id') : e.target.parentElement.getAttribute('data-id');
	getTitleDetailsAndSources(watchmodeId).then((selection) => buildSelectionObject(selection));
};

async function getTitleDetailsAndSources(watchmodeId) {
	// Make API cal to watchmode to get title details and sources
	const url = `https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${mattsWatchmodeAccount}&append_to_response=sources`;
	const watchmodeResponse = await fetch(url);
	const watcmodeTitleDetails = await watchmodeResponse.json();

	// Get the ImDB ID from the watchmode response and assign it to a variable for use in the ImDB API call
	var imdbId = watcmodeTitleDetails.imdb_id;

	// Get the ImDB rating from ImDB
	const imdbUrl = `https://imdb-api.com/en/API/Ratings/${mattsImdbAccount}/${imdbId}`;
	const imdbResponse = await fetch(imdbUrl);
	const imdbInfo = await imdbResponse.json();

	// Combine the info from the two API calls into an object that can be returned to handleMakeSelection
	// The rating source can be changed by choosing a new property from the imdbInfo object. Options are imDb, theMovieDb, rottenTomatoes, filmAffinity
	package = {
		details: watcmodeTitleDetails,
		titleRating: imdbInfo.imDb,
	};
	return package;
}

const buildSelectionObject = function (selection) {
	upDateStorage(selection.details.title);
	// Assign the desired info from the watchmode and ImDB API calls to the selectionInfo object
	selectionInfo = {
		title: selection.details.title,
		poster: selection.details.poster,
		rating: selection.titleRating,
		streaming_services: [],
	};

	// Iterate over the array of streaming and purchase sources and create a new array with only the info needed for results.html
	selection.details.sources.forEach((source) =>
		selectionInfo.streaming_services.push(
			(entry = {
				sourceId: source.source_id,
				sourceName: source.name,
				sourceType: source.type,
				sourceFormat: source.format,
			})
		)
	);

	// Save the selectionInfo object to local storage so it can be retrieved and displayed on the results.html page
	localStorage.setItem('selectionInfo', JSON.stringify(selectionInfo));
	window.location.href = './results.html';
};

let upDateStorage = function (item) {
	if (!storedSearchObj.includes(item)) {
		storedSearchObj.push(item);

		storedSearchObj.unshift(item);
		storedSearchObj.pop();
		if (storedSearchObj.length > 3) storedSearchObj.pop();

		localStorage.setItem('storedSearches', JSON.stringify(storedSearchObj));
		manage_element_visi([recentSearchDiv], false);

		recents_ul.prepend(`<li>${item}</li>`);
	}
	let liCount = $('#recents-list li').length;
	if (liCount > 3) recents_ul.children().last().remove();
};

/* element is set to hidden via CSS */
function manage_element_visi(element_list, doHide) {
	for (let i = 0; i < element_list.length; i++) {
		elem = element_list[i];

		if (doHide) elem.hidden = true;
		else {
			elem.hidden = false;
			elem.style.visibility = 'visible';
		}
	}
}

searchResultsEl.addEventListener('click', handleMakeSelection);
submitButtonEl.addEventListener('click', handleNewSearch);
