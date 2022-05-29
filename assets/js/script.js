var submitButtonEl = $('#submit-btn');
var account = 'ruNaWJgAnvmlDC7luYrIu0wwVIofUPwcmWpHkPJZ'

//  *2
//  ID's needed: search form's input ID
function handleNewSearch (event) {
    event.preventDefault();
    userEntry = $(this).siblings('#placeholder').val().trim();
    console.log(userEntry)
    if (userEntry) {
        fetchResultsList(userEntry);
        $('#placeholder').val('');
    }
}

//  * 3
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


$(submitButtonEl).on('click', handleNewSearch);