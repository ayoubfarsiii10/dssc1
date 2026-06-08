const button = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
button?.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  button.setAttribute('aria-expanded', String(isOpen));
});

const links = [...document.querySelectorAll('.nav a')];
links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  button?.setAttribute('aria-expanded', 'false');
}));

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(item => observer.observe(item));

const sections = [...document.querySelectorAll('section[id]')];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(section => navObserver.observe(section));
