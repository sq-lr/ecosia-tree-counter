function initializeCounter(callback) {
  const ecfgCookieObject = getCookieObjectByName("ECFG");

  if (ecfgCookieObject) {
    const searchCount = extractSearchCountFromCookie(ecfgCookieObject);
    const treeCount = Math.floor(searchCount / 45);
    const progressPercentage = ((searchCount % 45) / 45) * 100;

    callback(treeCount, progressPercentage);
  }
}

function extractSearchCountFromCookie(cookieValue) {
  const searchCount = cookieValue[15].split(':')[0];

  return (parseInt(searchCount, 10) * 2) || 0;
}

function getECFGField(cookieValue, fieldName) {
  const regex = new RegExp(`${fieldName}=([^:]+)`);
  const match = cookieValue.match(regex);

  return match ? match[1] : '0';
}

function getCookieObjectByName(name) {
  const cookieString = document.cookie;
  const cookies = cookieString.split('; ');

  for (let i = 0; i < cookies.length; i++) {
    const cookiePair = cookies[i].split('=');
    if (cookiePair[0] === name) {
      return cookiePair;
    }
  }
  return null;
}
