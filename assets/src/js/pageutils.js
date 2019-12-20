export const stickyHeader = () => {
  const header = document.querySelector('header#app-topbar')
  let scrollPos = 0
  window.addEventListener('scroll', () => {
    if (window.scrollY < (window.matchMedia('(max-width: 650px)').matches ? 1 : 750)) {
      header.classList.remove('opaque')
    } else {
      header.classList.add('opaque')
      header.classList.toggle('hidden', document.body.getBoundingClientRect().top < scrollPos)
    }
    scrollPos = (document.body.getBoundingClientRect()).top
  })
}

export const smoothScrolling = () => {
  Array.from(document.querySelectorAll('a[href*="#"]:not([href="#"])'))
    .forEach(link => link.addEventListener('click', function (event) {
      event.preventDefault()
      document.querySelector('header#app-topbar').classList.add('hidden')
      document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' })
    }, false))
}

export const heroAnimation = () => {
  const hero = document.querySelector('#app-hero')
  try {
    if (hero && localStorage.getItem('staticHero') === 'true') {
      hero.classList.add('static')
    }
    localStorage.setItem('staticHero', 'true')
  } catch (err) {
    if (hero) {
      hero.classList.add('static')
    }
  }
}

export const darkModeSupport = () => {
  window.matchMedia('(prefers-color-scheme: dark)').addListener(adaptColorScheme)
  adaptColorScheme()

  document.addEventListener('keydown', event => {
    if (event.key === 'm') {
      adaptColorScheme(document.body.classList.contains('darkmode') ? 'light' : 'dark')
    }
  })
}

const adaptColorScheme = (forcedMode) => {
  const savedMode = localStorage.getItem('savedMode')
  let newMode = null

  if (forcedMode) {
    switch (forcedMode) {
      case 'light':
      case 'dark':
        newMode = forcedMode
      case 'system':
        try {
          localStorage.setItem('savedMode', forcedMode)
        } catch (err) {
          // localStorage not available. mode won't be persisted
        }
    }
  } else if (savedMode === 'light' || savedMode === 'dark') {
    newMode = savedMode
  }

  switch (newMode) {
    case 'light':
      return setLightMode()
    case 'dark':
      return setDarkMode()
    default:
      window.matchMedia('(prefers-color-scheme: dark)').matches ? setDarkMode() : setLightMode()
  }
}

const setLightMode = () => {
  document.body.classList.remove('darkmode')
  document.querySelector('link[rel="icon"]').setAttribute('href', 'assets/images/icon_light.png')
  document.querySelector('link[rel="apple-touch-icon"]').setAttribute('href', 'assets/images/icon_apple_light.png')
  document.querySelector('link[rel="mask-icon"]').setAttribute('color', '#030044')
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#fff')
  document.querySelector('meta[name="msapplication-TileColor"]').setAttribute('content', '#fff')
}

const setDarkMode = () => {
  document.body.classList.add('darkmode')
  document.querySelector('link[rel="icon"]').setAttribute('href', 'assets/images/icon_dark.png')
  document.querySelector('link[rel="apple-touch-icon"]').setAttribute('href', 'assets/images/icon_apple_dark.png')
  document.querySelector('link[rel="mask-icon"]').setAttribute('color', '#fff')
  document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000')
  document.querySelector('meta[name="msapplication-TileColor"]').setAttribute('content', '#000')
}
