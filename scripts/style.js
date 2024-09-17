function applyThemeObserver() {
  const observer = new MutationObserver(() => {
    updateTheme();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  updateTheme();
}

function updateTheme() {
  const htmlClass = document.documentElement.className;
  const button = document.getElementById('tree-counter-button');
  const popover = document.getElementById('tree-counter-popover');

  if (!button || !popover) return;

  if (htmlClass.includes('dark')) {
    button.classList.add('dark-mode');
    button.classList.remove('light-mode');
    popover.classList.add('dark-mode');
    popover.classList.remove('light-mode');
  } else {
    button.classList.add('light-mode');
    button.classList.remove('dark-mode');
    popover.classList.add('light-mode');
    popover.classList.remove('dark-mode');
  }
}
