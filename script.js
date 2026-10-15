// Hero: typewriter intro
const typeEl = document.getElementById('typewriter');
if (typeEl) {
  const message = 'hi, jiya here.';
  let i = 0;
  const type = () => {
    if (i <= message.length) {
      typeEl.textContent = message.slice(0, i);
      i++;
      setTimeout(type, 55);
    }
  };
  type();
}

// Nav: subtle darken on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 40
    ? 'rgba(255,253,247,0.97)'
    : 'rgba(255,253,247,0.9)';
});

// Nav: mobile toggle
const toggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
toggle?.addEventListener('click', () => navLinks.classList.toggle('open'));

// Close mobile nav when a link is clicked
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// Fade-in sections on scroll
const observer = new IntersectionObserver(
  (entries) => entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      observer.unobserve(e.target);
    }
  }),
  { threshold: 0.12 }
);

const fadeTargets = document.querySelectorAll(
  '.project-card, .skill-group, .stat-card, .contact-card, .timeline-card, .about-text, .edu-card'
);

fadeTargets.forEach((el, i) => {
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  el.style.transitionDelay = `${(i % 4) * 80}ms`;
  observer.observe(el);
});

// Cursor-reactive glow: track pointer position within each glass card
const glowTargets = document.querySelectorAll(
  '.project-card, .skill-group, .stat-card, .contact-card, .timeline-card, .about-text, .edu-card, .glass, .pcard'
);

glowTargets.forEach(el => {
  el.addEventListener('mousemove', (e) => {
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    el.style.setProperty('--mx', `${x}%`);
    el.style.setProperty('--my', `${y}%`);
  });
});

// Projects: pop cards in when the grid scrolls into view
const projectsGrid = document.getElementById('projects-grid');
if (projectsGrid) {
  new IntersectionObserver((entries, obs) => {
    if (entries[0].isIntersecting) {
      projectsGrid.classList.add('in');
      obs.disconnect();
    }
  }, { threshold: 0.05 }).observe(projectsGrid);

  // Projects: filter chips
  const chips = document.querySelectorAll('.filter-chip');
  const cards = projectsGrid.querySelectorAll('.pcard');
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.toggle('active', c === chip));
      const keys = chip.dataset.filter.split(' ');
      let shown = 0;
      cards.forEach(card => {
        const cats = card.dataset.cat.split(' ');
        const match = keys.includes('all') || keys.some(k => cats.includes(k));
        card.classList.toggle('hide', !match);
        if (match) card.style.setProperty('--i', shown++);
      });
      // Replay the pop-in for the filtered set
      projectsGrid.classList.remove('in');
      void projectsGrid.offsetWidth;
      projectsGrid.classList.add('in');
    });
  });
}
