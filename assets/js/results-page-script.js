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
		const listItem = document.createElement('li');
		const sourceName = document.createElement('h3');
		const typeIcon = entry.sourceType === 'buy' ? '<i class="fa-solid fa-coins"></i>' : '<i class="fa-solid fa-repeat"></i>';
		sourceName.innerHTML = `<div>icon </div><div>${entry.sourceName} - ${entry.sourceFormat} </div>${typeIcon}`;

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