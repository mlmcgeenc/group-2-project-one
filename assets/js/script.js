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
    var displayResults = $('<ul>').addClass('results-list-styling-placeholder').appendTo('#placeholder-results-div');

    for (var i = 0; i < json.results.length; i++) {
        var nameTitle = json.results[i].name;
        var releaseTitle = json.results[i].year
        var typeOfShow = json.results[i].type.replace('_', ' ');
        var resultButton = $('<button>').addClass('results-list-styling-placeholder').data([i]).appendTo(displayResults)

        $('<li>' + nameTitle + '</li>').addClass('results-styling-placeholder').appendTo(resultButton);
        $('<li>' + releaseTitle + '</li>').addClass('results-styling-placeholder').appendTo(resultButton);
        $('<li>' + typeOfShow + '</li>').addClass('results-styling-placeholder').appendTo(resultButton);
        $('</br>').appendTo(resultButton);
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