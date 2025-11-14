const form = document.querySelector('form');
const searchInput = document.querySelector('input[type="text"]');
const resultDiv = document.querySelector('.result');

const getWordInfo = async(word) => {
    if (!word) {
        resultDiv.innerHTML = `<p class="error-text">Proszę wpisać słowo.</p>`;
        return;
    }

    try {
        resultDiv.innerHTML = `<p class="initial-text">Ładowanie danych...</p>`;
        const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.title || 'Nie znaleziono słowa');
        }

        const data = await response.json();

        displayResults(data);

    } catch (error) {
        resultDiv.innerHTML = `<p class="error-text">Przepraszamy, nie znaleziono słowa "${word}". Spróbuj ponownie.</p>`;
        console.error(error);
    }
}

const displayResults = (data) => {
    resultDiv.innerHTML = "";

    const wordData = data[0];

    const header = document.createElement('div');
    header.className = 'result-header';

    const wordTitle = document.createElement('h2');
    wordTitle.textContent = wordData.word;
    header.appendChild(wordTitle);

    const phonetic = wordData.phonetics.find(p => p.audio && p.audio.length > 0);
    if (phonetic) {
        const audioBtn = document.createElement('button');
        audioBtn.className = 'audio-btn';
        audioBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
        audioBtn.dataset.audio = phonetic.audio;
        header.appendChild(audioBtn);
    }

    resultDiv.appendChild(header);

    wordData.meanings.forEach(meaning => {
        const meaningBlock = document.createElement('div');
        meaningBlock.className = 'meaning-block';

        const partOfSpeech = document.createElement('h3');
        partOfSpeech.className = 'partOfSpeech';
        partOfSpeech.textContent = meaning.partOfSpeech;
        meaningBlock.appendChild(partOfSpeech);

        const definitionsList = document.createElement('ol');
        definitionsList.className = 'definitions-list';

        meaning.definitions.forEach(def => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="definition">${def.definition}</span>`;

            if (def.example) {
                const exampleP = document.createElement('p');
                exampleP.className = 'example';
                exampleP.textContent = `"${def.example}"`;
                li.appendChild(exampleP);
            }
            definitionsList.appendChild(li);
        });
        meaningBlock.appendChild(definitionsList);

        if (meaning.synonyms && meaning.synonyms.length > 0) {
            meaningBlock.appendChild(createTagBlock('Synonimy:', meaning.synonyms, 'synonym-block'));
        }

        if (meaning.antonyms && meaning.antonyms.length > 0) {
            meaningBlock.appendChild(createTagBlock('Antonimy:', meaning.antonyms, 'antonym-block'));
        }

        resultDiv.appendChild(meaningBlock);
    });

    const sourceLink = document.createElement('a');
    sourceLink.className = 'source-link';
    sourceLink.href = wordData.sourceUrls[0];
    sourceLink.target = '_blank';
    sourceLink.textContent = 'Czytaj więcej (źródło)';
    resultDiv.appendChild(sourceLink);
}

const createTagBlock = (title, tagsArray, blockClass) => {
    const block = document.createElement('div');
    block.className = blockClass;

    const titleEl = document.createElement('h4');
    titleEl.textContent = title;
    block.appendChild(titleEl);

    const tagsContainer = document.createElement('div');
    tagsContainer.className = 'tags-container';

    tagsArray.forEach(tagWord => {
        const tag = document.createElement('span');
        tag.className = 'tag';
        tag.textContent = tagWord;
        tagsContainer.appendChild(tag);
    });

    block.appendChild(tagsContainer);
    return block;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    getWordInfo(searchInput.value);
});

resultDiv.addEventListener('click', (e) => {

    const audioButton = e.target.closest('.audio-btn');
    if (audioButton) {
        const audioUrl = audioButton.dataset.audio;
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
        return;
    }

    const tag = e.target.closest('.tag');
    if (tag) {
        const word = tag.textContent;
        searchInput.value = word;
        getWordInfo(word);
        return;
    }
});