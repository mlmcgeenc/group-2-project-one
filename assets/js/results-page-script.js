const contentEl = document.getElementById('content')
const titleEl = document.getElementById('title')
const posterEl = document.getElementById('poster-container')
const resultsListEl = document.getElementById('results-list')

const buildResultsContent = function () {
	const selectionInfo = JSON.parse(localStorage.getItem('selectionInfo'));

	const resultsContainer = document.createElement('div');

	const selectionTitle = document.createElement('div');
	selectionTitle.textContent = selectionInfo.title;

	const selectionPoster = document.createElement('img');
	selectionPoster.src = selectionInfo.poster;

	const selectionRating = document.createElement('p');
	selectionRating.textContent = selectionInfo.rating;

	selectionInfo.streaming_services.forEach(function (entry) {
		const sourceIcon = document.createElement('img');
		sourceIcon.setAttribute('class', 'source-icon')
		switch (entry.sourceId) {
			case 24:
				sourceIcon.setAttribute('src', './assets/images/amazon-prime.png')
				break;
			case 26:
				sourceIcon.setAttribute('src', './assets/images/amazon-prime.png')
				break;
			case 371:
				sourceIcon.setAttribute('src', './assets/images/apple-icon.png')
				break;
			case 443:
				sourceIcon.setAttribute('src', './assets/images/spectrum-icon.png')
				break;
			case 442:
				sourceIcon.setAttribute('src', './assets/images/direct-tv-icon.png')
				break;
			case 372:
				sourceIcon.setAttribute('src', './assets/images/disney-plus-logo.png')
				break;
			case 373:
				sourceIcon.setAttribute('src', './assets/images/fubo-icon.png')
				break;
			case 140:
				sourceIcon.setAttribute('src', './assets/images/google-play-icon.png')
				break;
			case 387:
				sourceIcon.setAttribute('src', './assets/images/hbo-max-icon.png')
				break;
			case 157:
				sourceIcon.setAttribute('src', './assets/images/hulu-icon.png')
				break;
			case 349:
				sourceIcon.setAttribute('src', './assets/images/itunes-icon.png')
				break;
			case 398:
				sourceIcon.setAttribute('src', './assets/images/microsoft-store-icon.png')
				break;
			case 203:
				sourceIcon.setAttribute('src', './assets/images/netflix-icon.png')
				break;
			case 272:
				sourceIcon.setAttribute('src', './assets/images/tbs-icon.png')
				break;
			case 307:
				sourceIcon.setAttribute('src', './assets/images/vudu-icon.png')
				break;
			case 344:
				sourceIcon.setAttribute('src', './assets/images/youtube-icon.png')
				break;
			default:
				sourceIcon.setAttribute('src', './assets/images/wifi-solid.svg')
		}
		const listItem = document.createElement('li');
		listItem.setAttribute('class', 'small-6 large-centered align-middle')
		const sourceName = document.createElement('span');
		const typeIcon = entry.sourceType === 'buy' ? '<i class="fa-solid fa-coins orange"></i>' : '<i class="fa-solid fa-repeat orange"></i>';
		sourceName.innerHTML = `${entry.sourceName} - ${entry.sourceFormat} ${typeIcon}`;

		listItem.appendChild(sourceIcon);
		listItem.appendChild(sourceName);
		resultsListEl.appendChild(listItem);
	});

	titleEl.appendChild(selectionTitle);
	posterEl.appendChild(selectionPoster);
	resultsContainer.appendChild(selectionRating);

	contentEl.appendChild(resultsContainer);
};

buildResultsContent();