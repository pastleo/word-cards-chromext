const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <div class='card'>
    <span class='word'></span>
  </div>
`;

window.addEventListener('DOMContentLoaded', () => {
  const wordsCountDiv = document.getElementById('words-count')
  const cardsDiv = document.getElementById('cards')

  const refreshWords = () => {
    chrome.storage.local.get(['words'], result => {
      const words = result.words || [];

      wordsCountDiv.textContent = `目前有 ${words.length} 張單字卡:`;
      cardsDiv.innerHTML = '';
      words.forEach((word) => {
        const card = cardTemplate.content.cloneNode(true);

        card.querySelector('.word').textContent = word;

        cardsDiv.appendChild(card);
      });
    });
  }

  document.getElementById('clear').addEventListener('click', async () => {
    chrome.storage.local.set({ words: [] }, () => {
      refreshWords();
    })
  });

  refreshWords();
})
