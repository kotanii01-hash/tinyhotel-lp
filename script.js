// ===== LOADER =====
const loader = document.getElementById('loader');
if (loader) {
  document.body.classList.add('is-loading');
  window.setTimeout(() => {
    loader.classList.add('is-hiding');
  }, 4000);
  window.setTimeout(() => {
    loader.classList.add('is-hidden');
    document.body.classList.remove('is-loading');
  }, 4900);
}

// ===== HEADER: scroll → white =====
const header = document.getElementById('header');
const toggleHeader = () => {
  if (!header) return;
  if (window.scrollY > 24) header.classList.add('is-scrolled');
  else header.classList.remove('is-scrolled');
};
toggleHeader();
window.addEventListener('scroll', toggleHeader, { passive: true });

// ===== FIXED RESERVE: show after FV =====
const fixedReserve = document.querySelector('.fixed-reserve');
const fvSection = document.querySelector('.fv');
const toggleFixedReserve = () => {
  if (!fixedReserve || !fvSection) return;
  const fvBottom = fvSection.getBoundingClientRect().bottom;
  if (fvBottom <= 0) fixedReserve.classList.add('is-visible');
  else fixedReserve.classList.remove('is-visible');
};
toggleFixedReserve();
window.addEventListener('scroll', toggleFixedReserve, { passive: true });
window.addEventListener('resize', toggleFixedReserve);

// ===== DRAWER MENU =====
const burger = document.getElementById('burger');
const drawer = document.getElementById('drawer');
const drawerBackdrop = document.getElementById('drawer-backdrop');
const drawerClose = document.getElementById('drawer-close');

const openDrawer = () => {
  if (!drawer) return;
  drawer.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
  drawerBackdrop && drawerBackdrop.classList.add('is-open');
  burger && burger.classList.add('is-open');
  document.body.style.overflow = 'hidden';
};
const closeDrawer = () => {
  if (!drawer) return;
  drawer.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
  drawerBackdrop && drawerBackdrop.classList.remove('is-open');
  burger && burger.classList.remove('is-open');
  document.body.style.overflow = '';
};

if (burger) {
  burger.addEventListener('click', () => {
    if (drawer && drawer.classList.contains('is-open')) closeDrawer();
    else openDrawer();
  });
}
drawerClose && drawerClose.addEventListener('click', closeDrawer);
drawerBackdrop && drawerBackdrop.addEventListener('click', closeDrawer);
drawer && drawer.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

// ===== ACCORDION: Room detail =====
document.querySelectorAll('.room-detail__acc-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    item.classList.toggle('active');
  });
});

// ===== ACCORDION: FAQ =====
document.querySelectorAll('.faq__q').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.parentElement;
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.faq__item').forEach(i => i.classList.remove('active'));
    if (!wasActive) item.classList.add('active');
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    if (id === '#top') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(id);
    if (el) {
      e.preventDefault();
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== FLOW SIDEBAR: scroll highlight + time-of-day background =====
const flowItems = document.querySelectorAll('.flow-item[id]');
const sidebarPoints = document.querySelectorAll('.flow-sidebar__point');
const flowSection = document.querySelector('.flow');

if (flowItems.length && sidebarPoints.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          sidebarPoints.forEach(p => p.classList.remove('active'));
          const match = document.querySelector(`.flow-sidebar__point[href="#${id}"]`);
          if (match) match.classList.add('active');

          if (flowSection) {
            const num = id.replace('flow-', '');
            [...flowSection.classList].forEach(c => {
              if (c.startsWith('time-')) flowSection.classList.remove(c);
            });
            flowSection.classList.add(`time-${num}`);
          }
        }
      });
    },
    { rootMargin: '-30% 0px -60% 0px' }
  );

  flowItems.forEach(item => observer.observe(item));
}

// ===== REVEAL ON SCROLL =====
const revealSelectors = [
  '.intro__vertical',
  '.intro__text',
  '.intro__img',
  '.about__text',
  '.detail__layout > *',
  '.section-title',
  '.voice__card',
  '.flow__sub',
  '.flow-item',
  '.room-detail__images',
  '.room-detail__info',
  '.anshin__sub',
  '.anshin__card',
  '.plan__card',
  '.plan__note',
  '.img-ph--map',
  '.access__address',
  '.access__col',
  '.faq__list',
  '.reserve__desc',
  '.reserve__buttons'
];

const revealTargets = [];
revealSelectors.forEach(sel => {
  document.querySelectorAll(sel).forEach(el => {
    el.classList.add('reveal');
    revealTargets.push(el);
  });
});

if ('IntersectionObserver' in window && revealTargets.length) {
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  revealTargets.forEach(el => revealObserver.observe(el));
} else {
  revealTargets.forEach(el => el.classList.add('is-visible'));
}
