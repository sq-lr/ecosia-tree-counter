function applyThemeObserver() {
  const observer = new MutationObserver(() => {
    updateButtonTheme();
  });

  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['class']
  });

  updateButtonTheme();
}

function updateButtonTheme() {
  const htmlClass = document.documentElement.className;
  const button = document.getElementById('tree-counter-button');

  if (!button) return;

  if (htmlClass.includes('dark')) {
    button.classList.add('dark-mode');
    button.classList.remove('light-mode');
  } else {
    button.classList.add('light-mode');
    button.classList.remove('dark-mode');
  }
}
