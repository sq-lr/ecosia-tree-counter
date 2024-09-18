const browser = chrome || browser;

function insertCounterButton() {
  const imageUrl = browser.runtime.getURL('images/icon-32.png');

  const button = document.createElement('div');
  button.id = 'tree-counter-button';
  button.innerHTML = `
    <div id="counter-container">
      <img src="${imageUrl}" alt="Tree Icon">
      <span id="tree-counter-text">0</span>
    </div>
    <div id="progress-container">
      <div id="progress-bar"></div>
    </div>
  `;

  const targetElement = document.querySelector('.notifications.main-header__notifications') 
    || document.querySelector('.main-nav.main-header__nav');
  
  if (targetElement) {
    targetElement.parentNode.insertBefore(button, targetElement);
  }

  const popover = document.createElement('div');
  popover.id = 'tree-counter-popover';
  popover.classList.add('hidden');
  popover.innerHTML = `
    <div class="popover-content">
      <li class="popover-info divider-bottom">
        <span class="popover-section-text">Details</span>
        <ul>
          <li>
            <span class="popover-data-text">Tree counter:</span>
            <span id="tree-counter-text">0</span>
          </li>
          <li>
            <span class="popover-data-text">Search counter:</span>
            <span id="search-counter-text">0</span>
            <span>(ad present)</span>
          </li>
        </ul>
      </li>
      <li class="popover-warning">
        <span class="popover-section-text">Warning</span>
        <ul>
          <li>
            <span>Trees planted counter is an approximation, the real number may vary dramatically from Ecosia's expenditure.</span>
          </li>
        </ul>
      </li>
    </div>
  `;
  document.body.appendChild(popover);

  button.addEventListener('click', (event) => {
    const isVisible = popover.classList.contains('show');
    if (isVisible) {
      togglePopover(popover, false);
    } else {
      togglePopover(popover, true);
      positionPopover(button, popover);
    }
    event.stopPropagation(); 
  });

  document.addEventListener('click', (event) => {
    const isVisible = popover.classList.contains('show');
    if (isVisible && !popover.contains(event.target) && !button.contains(event.target)) {
      togglePopover(popover, false);
    }
  });
}

function updateCounterDisplay(treeCount, searchCount, progressPercentage) {
  const treeCounters = document.querySelectorAll('#tree-counter-text');
  const searchCounter = document.getElementById('search-counter-text');
  const progressBar = document.getElementById('progress-bar');

  if (treeCounters.length) {
    treeCounters.forEach((counter) => {
      counter.textContent = `${treeCount}`;
    })
  }

  if (searchCounter) {
    searchCounter.textContent = `${searchCount}`;
  }

  if (progressBar) {
    progressBar.style.width = `${progressPercentage}%`;
  }
}

function togglePopover(popover, shouldShow) {
  if (shouldShow) {
    popover.classList.remove('hidden');
    setTimeout(() => {
      popover.classList.add('show');
    }, 10);
  } else {
    popover.classList.remove('show');
    setTimeout(() => {
      popover.classList.add('hidden');
    }, 300);
  }
}

function positionPopover(button, popover) {
  const buttonRect = button.getBoundingClientRect();
  popover.style.top = `${(buttonRect.bottom + 12) + window.scrollY}px`;
  popover.style.left = `${(buttonRect.left - 169) + window.scrollX}px`;
}
