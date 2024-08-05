function fetchTreeCount() {
  fetch('https://www.ecosia.org/')
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(data, 'text/html');
      const treeCountText = doc.querySelector('.tree-counter').textContent;
      const treeCount = parseInt(treeCountText.replace(/,/g, ''));

      displayTreeCount(treeCount);
    });
}

function displayTreeCount(count) {
  const treeCounterElement = document.createElement('div');
  treeCounterElement.id = 'custom-tree-counter';
  treeCounterElement.textContent = `Trees planted: ${count}`;
  document.body.appendChild(treeCounterElement);
}

fetchTreeCount();