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
