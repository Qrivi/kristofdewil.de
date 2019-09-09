const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

function setColorScheme(initial) {
  if (initial && darkMode.matches)
    return setDarkMode();
  darkMode.matches ? setDarkMode() : setLightMode();
}

function setDarkMode() {
  document.body.classList.add('darkmode');
  document.querySelector('link[rel="icon"]').setAttribute('href', 'assets/img/icons/icon_dark.png');
  document.querySelector('link[rel="apple-touch-icon"]').setAttribute('href', 'assets/img/icons/apple_dark.png');
  document.querySelector('link[rel="mask-icon"]').setAttribute('color', '#fff');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000');
  document.querySelector('meta[name="msapplication-TileColor"]').setAttribute('content', '#000');
}

function setLightMode() {
  document.body.classList.remove('darkmode');
  document.querySelector('link[rel="icon"]').setAttribute('href', 'assets/img/icons/icon_light.png');
  document.querySelector('link[rel="apple-touch-icon"]').setAttribute('href', 'assets/img/icons/apple_light.png');
  document.querySelector('link[rel="mask-icon"]').setAttribute('color', '#030044');
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#fff');
  document.querySelector('meta[name="msapplication-TileColor"]').setAttribute('content', '#fff');
}

setColorScheme(true);
darkMode.addListener(setColorScheme);
