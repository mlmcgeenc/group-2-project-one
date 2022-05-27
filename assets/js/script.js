var searchResultsEl = document.getElementById('search-results');

var userSearch = 'Breaking Bad';
var watchmodeAccount = 'CFUyQoNYEjDUNjdIGVUjd03eAKPBvYKRtCQAdiUu';
var imdbAccount = 'k_h9vj9ndq';

// Autocomplete API to get an array of titles matching the search
var fetchResultsList = function (inputValue) {
	let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${watchmodeAccount}&search_value=${inputValue}`;
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
		});
};

// Use the watchmode 'Title Details' API and append the 'Sources' option to get the needed information about a users selected show/movie
// Use the ImDB ID in the watchmode results to get the ImDB rating
async function getTitleDetailsAndSources(watchmodeId) {
	let url = `https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${watchmodeAccount}&append_to_response=sources`;
  const watchmodeResponse = await fetch(url);
	const watcmodeTitleDetails = await watchmodeResponse.json();

  var imdbId = watcmodeTitleDetails.imdb_id;

  let imdbUrl = `https://imdb-api.com/en/API/Ratings/${imdbAccount}/${imdbId}`;
  const imdbResponse = await fetch(imdbUrl);
  const imdbInfo = await imdbResponse.json()

  package = {
    details: watcmodeTitleDetails,
    imdbRating: imdbInfo.imDb,
  }

	return package;
}

var handleMakeSelection = function (e) {
  // Declare an object named selectionInfo that will contain the needed info collected through API calls
  var selectionInfo = {
		title: '',
		poster: '',
		imdb_rating: '',
		streaming_services: [],
	};

	// Get the watchmode ID from the search result the user has clicked on and use it to search watchmode for details about that show/movie
	var watchmodeId = e.target.parentElement.getAttribute('data-id');
	getTitleDetailsAndSources(watchmodeId)
		// Assign the desired info from the watchmode and ImDB API calls to the selectionInfo object
		.then(function (selection) {
			selectionInfo = {
				title: selection.details.title,
				poster: selection.details.poster,
				imdbRating: selection.imdbRating,
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
			console.log(selection);
			console.log(selectionInfo);
			return selectionInfo;
		});
};

searchResultsEl.addEventListener('click', handleMakeSelection);
