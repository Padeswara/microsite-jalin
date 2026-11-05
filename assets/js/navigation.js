const header = document.querySelector('.site-header');
const navigation = header.querySelector('.navigation');
const navigationLinks = [...document.querySelectorAll('.navigation a[href^="#"]')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const headerScrollThreshold = 80;
const sections = navigationLinks
  .map((link) => document.getElementById(link.hash.slice(1)))
  .filter(Boolean);
let sectionObserver;
let footerObserver;
let observerSize = '';
const visibleSections = new Set();
let footerVisible = false;
let navigationScrollTimer;
const navigationIndicator = document.createElement('span');
navigationIndicator.className = 'navigation-indicator';
navigationIndicator.setAttribute('aria-hidden', 'true');
navigation.append(navigationIndicator);

function updateNavigationIndicator() {
  const activeLink = navigation.querySelector('[aria-current="location"]');
  if (!activeLink) return;

  const menuRect = navigation.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  navigationIndicator.style.left = `${linkRect.left - menuRect.left + navigation.scrollLeft}px`;
  navigationIndicator.style.top = `${linkRect.bottom - menuRect.top + navigation.scrollTop - 2}px`;
  navigationIndicator.style.width = `${linkRect.width}px`;
}

function setActiveSection(id) {
  navigationLinks.forEach((link) => {
    if (link.hash === `#${id}`) {
      link.setAttribute('aria-current', 'location');
    } else {
      link.removeAttribute('aria-current');
    }
  });

  updateNavigationIndicator();
  scheduleActiveLinkVisibility();
}

function scheduleActiveLinkVisibility() {
  clearTimeout(navigationScrollTimer);
  navigationScrollTimer = setTimeout(keepActiveLinkVisible, 120);
}

function keepActiveLinkVisible() {
  const activeLink = navigation.querySelector('[aria-current="location"]');
  if (!activeLink || navigation.scrollWidth <= navigation.clientWidth) return;

  const menuRect = navigation.getBoundingClientRect();
  const linkRect = activeLink.getBoundingClientRect();
  const inset = 8;
  if (linkRect.left >= menuRect.left + inset && linkRect.right <= menuRect.right - inset) {
    return;
  }

  // Scroll only the menu horizontally so the page keeps its current position.
  navigation.scrollTo({
    left: navigation.scrollLeft + linkRect.left - menuRect.left
      - (navigation.clientWidth - linkRect.width) / 2,
    behavior: reducedMotion.matches ? 'instant' : 'smooth',
  });
}

function updateActiveSection() {
  const active = footerVisible
    ? sections[sections.length - 1]
    : sections.find((section) => visibleSections.has(section.id));
  if (active) setActiveSection(active.id);
}

function observeSections() {
  const headerRect = header.getBoundingClientRect();
  const headerHeight = headerRect.height;
  document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  const size = `${headerHeight}:${window.innerHeight}`;
  if (size === observerSize) return;
  observerSize = size;

  sectionObserver?.disconnect();
  footerObserver?.disconnect();
  visibleSections.clear();
  footerVisible = false;

  // Observe a narrow strip immediately below the sticky header.
  const top = Math.min(headerHeight + 24, window.innerHeight - 1);
  const bottom = Math.max(0, window.innerHeight - top - 1);
  sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        visibleSections.add(target.id);
      } else {
        visibleSections.delete(target.id);
      }
    });
    updateActiveSection();
  }, { rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0 });
  sections.forEach((section) => sectionObserver.observe(section));

  // Keep the final menu active when a short final section reaches the page end.
  const footer = document.querySelector('.site-footer');
  if (footer) {
    footerObserver = new IntersectionObserver(([entry]) => {
      footerVisible = entry.isIntersecting;
      updateActiveSection();
    }, { rootMargin: `-${headerHeight}px 0px 0px 0px`, threshold: 0 });
    footerObserver.observe(footer);
  }
}

function scrollToSection(hash, behavior = 'auto') {
  const section = document.getElementById(hash.slice(1));
  if (!section) return;

  observeSections();
  section.scrollIntoView({ behavior, block: 'start' });
}

function updateHeaderAppearance() {
  header.classList.toggle('is-scrolled', window.scrollY >= headerScrollThreshold);
}

observeSections();
updateHeaderAppearance();
updateNavigationIndicator();
requestAnimationFrame(() => navigation.classList.add('has-active-indicator'));
new ResizeObserver(updateNavigationIndicator).observe(navigation);
document.fonts.ready.then(updateNavigationIndicator);
window.addEventListener('pageshow', updateHeaderAppearance);
new ResizeObserver(observeSections).observe(header);
window.addEventListener('resize', observeSections);
window.addEventListener('scroll', () => {
  updateHeaderAppearance();
  scheduleActiveLinkVisibility();
}, { passive: true });

header.addEventListener('click', (event) => {
  const link = event.target.closest('a[href^="#"]');
  if (
    !link || event.defaultPrevented || event.button !== 0 ||
    event.metaKey || event.ctrlKey || event.shiftKey || event.altKey
  ) {
    return;
  }
  if (!document.getElementById(link.hash.slice(1))) return;

  event.preventDefault();
  if (window.location.hash !== link.hash) {
    history.pushState(null, '', link.hash);
  }
  scrollToSection(link.hash, reducedMotion.matches ? 'auto' : 'smooth');
});

window.addEventListener('hashchange', () => scrollToSection(window.location.hash || '#home'));
window.addEventListener('load', () => {
  if (window.location.hash) scrollToSection(window.location.hash);
});
