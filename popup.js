window.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get(['words'], result => {
    const words = result.words || [];

    document.getElementById('words-count').textContent = `目前有 ${words.length} 張單字卡:`;
    document.getElementById('words').textContent = words.join(', ');

    document.getElementById('review').addEventListener('click', () => {
      window.open(chrome.runtime.getURL('review.html'));
    });
  })
});
