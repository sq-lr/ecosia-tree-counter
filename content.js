function insertCounterButton() {
  const imageUrl = chrome.runtime.getURL('icons/icon48.png');
  console.log(imageUrl); 

  const button = document.createElement('div');
  button.id = 'tree-counter-button';
  button.innerHTML = `
    <img src="${imageUrl}" alt="Tree Icon">
    <span id="tree-counter-text">0</span>
    <div id="progress-container">
      <div id="progress-bar"></div>
    </div>
  `;

  const targetElement = document.querySelector('.notifications.main-header__notifications') || document.querySelector('.main-nav.main-header__nav');
  if (targetElement) {
    targetElement.parentNode.insertBefore(button, targetElement);
  }

  updateCounter();
  updateButtonStyle();
}

function updateCounter() {
  chrome.storage.sync.get(['searchCount', 'treeCount'], function(data) {
    const searchCount = data.searchCount || 0;
    const treeCount = Math.floor(searchCount / 50);

    document.getElementById('tree-counter-text').textContent = `${treeCount}`;
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${(searchCount % 50) / 50 * 100}%`;
  });
}

function updateButtonStyle() {
  const htmlClass = document.documentElement.className;
  const button = document.getElementById('tree-counter-button');

  if (htmlClass.includes('dark')) {
    button.classList.add('dark-mode');
    button.classList.remove('light-mode');
  } else {
    button.classList.add('light-mode');
    button.classList.remove('dark-mode');
  }
}

insertCounterButton();

// Observe changes to the class attribute of the <html> element
const observer = new MutationObserver(() => {
  updateButtonStyle();
});

observer.observe(document.documentElement, {
  attributes: true,
  attributeFilter: ['class']
});
