//  ! Placeholder variables
//  * ID's & classes needed: submit button
var submitButtonEl = $('#submit-btn');
var account = 'ruNaWJgAnvmlDC7luYrIu0wwVIofUPwcmWpHkPJZ'

//  Push the user entry input to fetchResultsList
//  * ID's needed: search form's input ID
function handleNewSearch (event) {
    event.preventDefault();
    userEntry = $(this).siblings('#placeholder').val().trim();
    console.log(userEntry)
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
    var displayResults = $('<ul>').addClass('results-list').appendTo('#placeholder-results-div');

    for (var i = 0; i < json.results.length; i++) {
    var nameTitle = json.results[i].name;
    var releaseTitle = json.results[i].year
    var typeOfShow = json.results[i].type


    $('<li>' + nameTitle + '</li>').addClass('results-styling-placeholder').appendTo(displayResults);
    $('<li>' + releaseTitle + '</li>').addClass('results-styling-placeholder').appendTo(displayResults);
    $('<li>' + typeOfShow + '</li>').addClass('results-styling-placeholder').appendTo(displayResults);
    $('</br>').appendTo(displayResults)
    }
};
// results: Array(49)
// 0:
// id: 3173903
// image_url: "https://cdn.watchmode.com/posters/03173903_poster_w185.jpg"
// name: "Breaking Bad"
// relevance: 247.33
// result_type: "title"
// tmdb_id: 1396
// tmdb_type: "tv"
// type: "tv_series"
// year: 2008

// Title details API call provides ImDB number and sources array
var findTitleSources = function (choosenTitleId) {
	let url = `https://api.watchmode.com/v1/title/345534/details/?apiKey=YOUR_API_KEY`;
};

// get reviews from IMDB using IMDB ID
var getTitleReviews = function (imdbId) {
	let url = `https://imdb-api.com/en/API/Ratings/${imdbApiKey}/${imdbId}`;
};


$(submitButtonEl).on('click', handleNewSearch);