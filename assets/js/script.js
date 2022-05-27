const searchResultsEl = document.getElementById('search-results');
const contentEl = document.getElementById('content');
const mattsWatchmodeAccount = 'CFUyQoNYEjDUNjdIGVUjd03eAKPBvYKRtCQAdiUu';
const mattsImdbAccount = 'k_h9vj9ndq';

// Autocomplete API to get an array of titles matching the search
const fetchResultsList = function (inputValue) {
	let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${mattsWatchmodeAccount}&search_value=${inputValue}`;
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
		});
};

// Use the watchmode 'Title Details' API and append the 'Sources' option to get the needed information about a users selected show/movie
// Use the ImDB ID in the watchmode results and the ImDB 'Ratings' API to get the ImDB rating
async function getTitleDetailsAndSources(watchmodeId) {
	// Make API cal to watchmode
	const url = `https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${mattsWatchmodeAccount}&append_to_response=sources`;
	const watchmodeResponse = await fetch(url);
	const watcmodeTitleDetails = await watchmodeResponse.json();

	// Get the ImDB ID from the watchmode response and assign it to a variable for use in the API call
	var imdbId = watcmodeTitleDetails.imdb_id;

	// Get the ImDB rating from ImDB
	const imdbUrl = `https://imdb-api.com/en/API/Ratings/${mattsImdbAccount}/${imdbId}`;
	const imdbResponse = await fetch(imdbUrl);
	const imdbInfo = await imdbResponse.json();

	// Combine the info from the two API calls into an object that can be returned to handleMakeSelection
	package = {
		details: watcmodeTitleDetails,
		imdbRating: imdbInfo.imDb,
	};

	return package;
}

const handleMakeSelection = function (e) {
	// Declare an object named selectionInfo that will contain the needed info collected through API calls
	let selectionInfo = {
		title: '',
		poster: '',
		imdb_rating: '',
		streaming_services: [],
	};

	// Get the watchmode ID from the search result the user has clicked on and use it to search watchmode for details about that show/movie
	const watchmodeId = e.target.parentElement.getAttribute('data-id');
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

			const selectionTitle = document.createElement('h3');
			selectionTitle.textContent = selectionInfo.title;
			const selectionPoster = document.createElement('img');
			selectionPoster.src = selectionInfo.poster;
			const selectionRating = document.createElement('p');
			selectionRating.textContent = selectionInfo.imdbRating;
      const sourcesList = document.createElement('ul');

      selectionInfo.streaming_services.forEach(function (entry) {
        const listItem = document.createElement('li')
        const sourceName = document.createElement('h3')
        //  TODO conditional formatting to choose a fontawesome icon based on movie/show type
        sourceName.textContent = 'icon' + ' ' + entry.sourceName + ' - ' + entry.sourceFormat + ' ' + entry.sourceType

        listItem.appendChild(sourceName)
        sourcesList.appendChild(listItem)
      })

			contentEl.appendChild(selectionTitle);
			contentEl.appendChild(selectionPoster);
			contentEl.appendChild(selectionRating);
      contentEl.appendChild(sourcesList);
			return selectionInfo;
		});
};

searchResultsEl.addEventListener('click', handleMakeSelection);
