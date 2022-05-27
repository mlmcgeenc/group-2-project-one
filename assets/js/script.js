var searchResultsEl = document.getElementById('search-results');

var userSearch = 'Breaking Bad';
var account = 'CFUyQoNYEjDUNjdIGVUjd03eAKPBvYKRtCQAdiUu';

// Autocomplete API to get an array of titles matching the search

// Test call
var fetchResultsList = function (inputValue) {
	let url = `https://api.watchmode.com/v1/autocomplete-search/?apiKey=${account}&search_value=${inputValue}`;
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
		});
};

// Title details API call provides ImDB number and sources array
var findTitleSources = function (watchmodeId) {
	let url = `https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${account}&append_to_response=sources`;
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			return json;
		});
};

// results
var findTitleSourcesResult = {
	id: 3173903,
	title: 'Breaking Bad',
	original_title: 'Breaking Bad',
	plot_overview:
		"When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
	type: 'tv_series',
	runtime_minutes: 45,
	year: 2008,
	end_year: 2013,
	release_date: '2008-01-20',
	imdb_id: 'tt0903747',
	tmdb_id: 1396,
	tmdb_type: 'tv',
	genres: [7],
	genre_names: ['Drama'],
	user_rating: 9.3,
	critic_score: 85,
	us_rating: 'TV-MA',
	poster: 'https://cdn.watchmode.com/posters/03173903_poster_w185.jpg',
	backdrop: 'https://cdn.watchmode.com/backdrops/03173903_bd_w780.jpg',
	original_language: 'en',
	similar_titles: [
		3131293, 3129354, 340865, 383653, 390224, 395040, 313542, 3124749, 350372, 3109684, 3108916, 3164525, 316177, 345534, 3158493, 520325, 1122525,
		3117686, 3130921, 519834, 3140350, 383654, 125583, 3137595, 3155583,
	],
	networks: [8],
	network_names: ['AMC'],
	relevance_percentile: 98.92,
	trailer: 'https://www.youtube.com/watch?v=XZ8daibM3AE',
	trailer_thumbnail: 'https://cdn.watchmode.com/video_thumbnails/536008_pthumbnail_320.jpg',
};

// get reviews from IMDB using IMDB ID
var getTitleRating = function (imdbId) {
	let url = `https://imdb-api.com/en/API/Ratings/${imdbApiKey}/${imdbId}`;
};

var handleMakeSelection = function (e) {
	console.log(e.target.parentElement.getAttribute('data-id'));
	var watchmodeId = e.target.parentElement.getAttribute('data-id');
	var selectionDetails = findTitleSources(watchmodeId);
	var imdbRating = getTitleRating(selectionDetails.imdb_id);
};

searchResultsEl.addEventListener('click', handleMakeSelection);
