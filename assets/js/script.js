var searchResultsEl = document.getElementById('search-results');

var userSearch = 'Breaking Bad';
var account = 'CFUyQoNYEjDUNjdIGVUjd03eAKPBvYKRtCQAdiUu';
var imdbAccount = 'k_h9vj9ndq';

var selectionInfo = {
	title: '',
	poster: '',
	imdb_rating: '',
	streaming_services: [],
};

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
async function getTitleDetailsAndSources(watchmodeId) {
	let url = `https://api.watchmode.com/v1/title/${watchmodeId}/details/?apiKey=${account}&append_to_response=sources`;
	const response = await fetch(url);
	const details = await response.json();
	return details;
}

// get reviews from IMDB using IMDB ID
var getTitleRating = function (imdbId) {
	let url = `https://imdb-api.com/en/API/Ratings/${imdbAccount}/${imdbId}`;
	fetch(url)
		.then((res) => res.json())
		.then((json) => {
			console.log(json);
			return json;
		});
};

var handleMakeSelection = function (e) {
	var watchmodeId = e.target.parentElement.getAttribute('data-id');
	getTitleDetailsAndSources(watchmodeId).then(function (selectionDetails) {
		selectionInfo = {
			title: selectionDetails.title,
			poster: selectionDetails.poster,
			imdb_rating: '',
			streaming_services: [],
		};

		selectionDetails.sources.forEach((source) =>
			selectionInfo.streaming_services.push(
				(entry = {
					sourceId: source.source_id,
					sourceName: source.name,
					sourceType: source.type,
					sourceFormat: source.format,
				})
			)
		);

		console.log(selectionInfo);
	});
};

searchResultsEl.addEventListener('click', handleMakeSelection);

// results
// var results1 = {
// 	id: 3173903,
// 	title: 'Breaking Bad',
// 	original_title: 'Breaking Bad',
// 	plot_overview:
// 		"When Walter White, a New Mexico chemistry teacher, is diagnosed with Stage III cancer and given a prognosis of only two years left to live. He becomes filled with a sense of fearlessness and an unrelenting desire to secure his family's financial future at any cost as he enters the dangerous world of drugs and crime.",
// 	type: 'tv_series',
// 	runtime_minutes: 45,
// 	year: 2008,
// 	end_year: 2013,
// 	release_date: '2008-01-20',
// 	imdb_id: 'tt0903747',
// 	tmdb_id: 1396,
// 	tmdb_type: 'tv',
// 	genres: [7],
// 	genre_names: ['Drama'],
// 	user_rating: 9.3,
// 	critic_score: 85,
// 	us_rating: 'TV-MA',
// 	poster: 'https://cdn.watchmode.com/posters/03173903_poster_w185.jpg',
// 	backdrop: 'https://cdn.watchmode.com/backdrops/03173903_bd_w780.jpg',
// 	original_language: 'en',
// 	similar_titles: [
// 		3131293, 3129354, 340865, 383653, 390224, 395040, 313542, 3124749, 350372, 3109684, 3108916, 3164525, 316177, 345534, 3158493, 520325, 1122525,
// 		3117686, 3130921, 519834, 3140350, 383654, 125583, 3137595, 3155583,
// 	],
// 	networks: [8],
// 	network_names: ['AMC'],
// 	relevance_percentile: 98.92,
// 	trailer: 'https://www.youtube.com/watch?v=XZ8daibM3AE',
// 	trailer_thumbnail: 'https://cdn.watchmode.com/video_thumbnails/536008_pthumbnail_320.jpg',
// 	sources: [
// 		{
// 			source_id: 349,
// 			name: 'iTunes',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://itunes.apple.com/us/tv-season/pilot/id271383858?i=271866344&at=10laHb',
// 			format: 'SD',
// 			price: 1.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 349,
// 			name: 'iTunes',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://itunes.apple.com/us/tv-season/pilot/id271383858?i=271866344&at=10laHb',
// 			format: 'HD',
// 			price: 2.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 140,
// 			name: 'Google Play',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://play.google.com/store/tv/show?id=L2wfgMDGiBk&cdid=tvseason-2LA4CTEOrZM&gdid=tvepisode-PNxGMkcus_g',
// 			format: 'SD',
// 			price: 1.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 140,
// 			name: 'Google Play',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://play.google.com/store/tv/show?id=L2wfgMDGiBk&cdid=tvseason-2LA4CTEOrZM&gdid=tvepisode-PNxGMkcus_g',
// 			format: 'HD',
// 			price: 2.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 307,
// 			name: 'VUDU',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://www.vudu.com/content/movies/details/content/207577',
// 			format: 'SD',
// 			price: 1.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 307,
// 			name: 'VUDU',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://www.vudu.com/content/movies/details/content/207577',
// 			format: 'HD',
// 			price: 2.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 24,
// 			name: 'Amazon',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.74a9f71f-3d5a-f492-23dc-3dfbc2404a24',
// 			format: 'SD',
// 			price: 1.99,
// 			seasons: 5,
// 			episodes: 54,
// 		},
// 		{
// 			source_id: 24,
// 			name: 'Amazon',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.74a9f71f-3d5a-f492-23dc-3dfbc2404a24',
// 			format: 'HD',
// 			price: 2.99,
// 			seasons: 5,
// 			episodes: 54,
// 		},
// 		{
// 			source_id: 24,
// 			name: 'Amazon',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://watch.amazon.com/detail?gti=amzn1.dv.gti.74a9f71f-3d5a-f492-23dc-3dfbc2404a24',
// 			format: '4K',
// 			price: 3.99,
// 			seasons: 5,
// 			episodes: 54,
// 		},
// 		{
// 			source_id: 344,
// 			name: 'YouTube',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://www.youtube.com/watch?v=PNxGMkcus_g',
// 			format: 'HD',
// 			price: 2.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 344,
// 			name: 'YouTube',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://www.youtube.com/watch?v=PNxGMkcus_g',
// 			format: 'SD',
// 			price: 1.99,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 		{
// 			source_id: 398,
// 			name: 'Microsoft Store',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://www.microsoft.com/en-us/p/season-1/8d6kgwxcmrfx',
// 			format: 'SD',
// 			price: 1.99,
// 			seasons: 5,
// 			episodes: 54,
// 		},
// 		{
// 			source_id: 398,
// 			name: 'Microsoft Store',
// 			type: 'buy',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://www.microsoft.com/en-us/p/season-1/8d6kgwxcmrfx',
// 			format: 'HD',
// 			price: 2.99,
// 			seasons: 5,
// 			episodes: 54,
// 		},
// 		{
// 			source_id: 203,
// 			name: 'Netflix',
// 			type: 'sub',
// 			region: 'US',
// 			ios_url: 'Deeplinks available for paid plans only.',
// 			android_url: 'Deeplinks available for paid plans only.',
// 			web_url: 'https://www.netflix.com/watch/70196252',
// 			format: 'HD',
// 			price: null,
// 			seasons: 5,
// 			episodes: 62,
// 		},
// 	],
// };
