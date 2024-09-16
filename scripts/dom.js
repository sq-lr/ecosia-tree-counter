function insertCounterButton() {
  const imageUrl = chrome.runtime.getURL('icons/icon-32.png');

  const button = document.createElement('div');
  button.id = 'tree-counter-button';
  button.innerHTML = `
    <img src="${imageUrl}" alt="Tree Icon">
    <span id="tree-counter-text">0</span>
    <div id="progress-container">
      <div id="progress-bar"></div>
    </div>
  `;

  const targetElement = document.querySelector('.notifications.main-header__notifications') 
    || document.querySelector('.main-nav.main-header__nav');

  if (targetElement) {
    targetElement.parentNode.insertBefore(button, targetElement);
  }
}

function updateCounterDisplay(treeCount, progressPercentage) {
  const treeCounter = document.getElementById('tree-counter-text');
  const progressBar = document.getElementById('progress-bar');

  if (treeCounter) {
    treeCounter.textContent = `${treeCount}`;
  }

  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
  }
}
