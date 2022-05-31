const contentEl = document.getElementById('content')

const buildResultsContent = function () {
	const selectionInfo = JSON.parse(localStorage.getItem('selectionInfo'));

	const resultsContainer = document.createElement('div');

	const selectionTitle = document.createElement('h3');
	selectionTitle.textContent = selectionInfo.title;

	const selectionPoster = document.createElement('img');
	selectionPoster.src = selectionInfo.poster;

	const selectionRating = document.createElement('p');
	selectionRating.textContent = selectionInfo.rating;

	const sourcesList = document.createElement('ul');
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
		const sourceName = document.createElement('h3');
		const typeIcon = entry.sourceType === 'buy' ? '<i class="fa-solid fa-coins"></i>' : '<i class="fa-solid fa-repeat"></i>';
		sourceName.innerHTML = `<div>${entry.sourceName} - ${entry.sourceFormat} </div>${typeIcon}`;

		listItem.appendChild(sourceIcon);
		listItem.appendChild(sourceName);
		sourcesList.appendChild(listItem);
	});

	resultsContainer.appendChild(selectionTitle);
	resultsContainer.appendChild(selectionPoster);
	resultsContainer.appendChild(selectionRating);
	resultsContainer.appendChild(sourcesList);

	contentEl.appendChild(resultsContainer);
};

buildResultsContent();