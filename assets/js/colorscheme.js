const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

function setColorScheme() {
    darkMode.matches ? document.body.classList.add('darkmode') : document.body.classList.remove('darkmode');
}

setColorScheme();
darkMode.addListener(setColorScheme);
