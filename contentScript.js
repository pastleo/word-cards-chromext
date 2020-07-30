let button;

document.addEventListener('click', event => {
  if (button) {
    button.remove();
    button = null;
  }
  setTimeout(() => {
    const selected = window.getSelection().toString();
    if (!selected) return;

    button = document.createElement('button');
    button.textContent = 'Save this';
    button.style.cssText = `
      position: fixed;
      text-align: center;
      font-size: 12px;
      width: 100px;
      left: ${event.clientX - 50}px;
      top: ${event.clientY + 20}px;
    `;

    button.addEventListener('click', () => {
      window.getSelection().removeAllRanges();
      button.remove();
      button = null;

      chrome.storage.local.get(['words'], ({ words: oriWords }) => {
        const words = [...(oriWords || []), selected];
        console.log({ words });
        chrome.storage.local.set({ words });
      });
    });

    document.body.appendChild(button);
  })
})
