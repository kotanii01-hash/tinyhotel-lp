// burger menu
const burger = document.getElementById('burger');
if (burger) {
  burger.addEventListener('click', () => {
    document.querySelector('.header__nav').classList.toggle('open');
  });
}

// Room detail accordion
document.querySelectorAll('.room-detail__acc-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});

// FAQ accordion
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// flow sidebar scroll highlight
const flowItems = document.querySelectorAll('.flow-item[id]');
const sidebarPoints = document.querySelectorAll('.flow-sidebar__point');

if (flowItems.length && sidebarPoints.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarPoints.forEach(p => p.classList.remove('active'));
          const match = document.querySelector(`.flow-sidebar__point[href="#${id}"]`);
          if (match) match.classList.add('active');
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  flowItems.forEach(item => observer.observe(item));
}
