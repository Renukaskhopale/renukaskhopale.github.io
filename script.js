const roles = [
  'Machine Learning',
  'Deep Learning',
  'Generative AI',
  'Computer Vision',
  'NLP Engineer'
];

const projectDetails = {
  leaf: {
    title: 'Leaf Disease Prediction System',
    description: 'A computer vision project for detecting plant leaf diseases using deep learning, image preprocessing, and explainable prediction flows inspired by Renuka\'s CV-listed disease diagnosis work.',
    features: [
      'Image upload with instant disease identification',
      'Confidence-based prediction report',
      'Preprocessing, augmentation, training, and evaluation pipeline',
      'Suitable for agriculture support and early disease awareness'
    ]
  },
  dashboard: {
    title: 'Data Analytics Dashboard',
    description: 'A premium business intelligence experience with KPI cards, SQL-backed data analysis, and interactive drill-down reporting.',
    features: [
      'KPI trend tracking and performance summaries',
      'Interactive filtering and category comparisons',
      'Power BI-style executive visualization blocks',
      'Designed for operations, sales, or business reporting'
    ]
  },
  career: {
    title: 'Multi-Agent AI Career Assistant',
    description: 'An AI system concept using specialized agents to help students improve resumes, practice interviews, and discover role matches.',
    features: [
      'Resume analysis and rewrite suggestions',
      'Interview question generation and answer coaching',
      'Job matching with context-aware recommendations',
      'Agent-based workflow orchestration for task specialization'
    ]
  },
  health: {
    title: 'AI Healthcare Symptom Analyzer',
    description: 'An NLP-first assistant that structures symptom narratives into useful insights for awareness, triage assistance, and health information workflows.',
    features: [
      'Symptom text understanding with transformer models',
      'Risk-aware output formatting and health category tagging',
      'Structured summary generation for non-diagnostic guidance',
      'Conversation design for healthcare support interfaces'
    ]
  },
  traffic: {
    title: 'Smart Traffic Management System',
    description: 'A computer vision traffic intelligence platform for identifying congestion, counting vehicles, and forecasting flow issues.',
    features: [
      'Vehicle detection using YOLO-based pipelines',
      'Lane and density monitoring dashboards',
      'Congestion prediction for urban signal planning',
      'Potential integration with smart city alert systems'
    ]
  }
};

const typingNode = document.getElementById('typingText');
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('siteNav');
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalClose = document.getElementById('modalClose');
const contactForm = document.getElementById('contactForm');

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  if (!typingNode) return;
  const current = roles[roleIndex];
  typingNode.textContent = current.slice(0, charIndex);

  if (!isDeleting && charIndex < current.length) {
    charIndex += 1;
  } else if (isDeleting && charIndex > 0) {
    charIndex -= 1;
  } else if (!isDeleting && charIndex === current.length) {
    isDeleting = true;
    setTimeout(typeLoop, 1200);
    return;
  } else {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }

  setTimeout(typeLoop, isDeleting ? 55 : 95);
}

typeLoop();

document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const counts = entry.target.querySelectorAll('.count');
        counts.forEach(animateCount);
      }
    });
  },
  { threshold: 0.18 }
);

document.querySelectorAll('.reveal, .reveal-delay').forEach((el) => observer.observe(el));

function animateCount(node) {
  if (node.dataset.animated === 'true') return;
  node.dataset.animated = 'true';
  const target = Number(node.dataset.target || 0);
  const duration = 1400;
  const startTime = performance.now();

  function step(timestamp) {
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    node.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else node.textContent = target;
  }

  requestAnimationFrame(step);
}

const sectionLinks = [...document.querySelectorAll('.site-nav a')];
const sectionMap = sectionLinks.map((link) => {
  const id = link.getAttribute('href');
  return { link, section: document.querySelector(id) };
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 180;
  sectionMap.forEach(({ link, section }) => {
    if (!section) return;
    const inView = scrollY >= section.offsetTop && scrollY < section.offsetTop + section.offsetHeight;
    link.classList.toggle('active', inView);
  });
});

navToggle?.addEventListener('click', () => {
  nav.classList.toggle('open');
  document.body.classList.toggle('menu-open');
});

sectionLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
  });
});

const hoverables = document.querySelectorAll('a, button, .tilt-card');
hoverables.forEach((el) => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
});

window.addEventListener('mousemove', (event) => {
  const { clientX, clientY } = event;
  if (cursorDot) {
    cursorDot.style.transform = `translate(${clientX}px, ${clientY}px)`;
  }
  if (cursorRing) {
    cursorRing.animate(
      { transform: `translate(${clientX}px, ${clientY}px)` },
      { duration: 180, fill: 'forwards' }
    );
  }
});

function initTilt() {
  document.querySelectorAll('.tilt-card').forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      const rx = (0.5 - py) * 8;
      const ry = (px - 0.5) * 10;
      card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

initTilt();

document.querySelectorAll('.open-modal').forEach((btn) => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.project;
    const details = projectDetails[key];
    if (!details) return;
    modalTitle.textContent = details.title;
    modalDescription.textContent = details.description;
    modalFeatures.innerHTML = details.features.map((item) => `<li>${item}</li>`).join('');
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  });
});

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target.dataset.close === 'true') closeModal();
});
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
  const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
  window.location.href = `mailto:renukaskhopale@gmail.com?subject=${subject}&body=${body}`;
});

async function loadGitHub() {
  const repoGrid = document.getElementById('repoGrid');
  try {
    const [profileRes, repoRes] = await Promise.all([
      fetch('https://api.github.com/users/RenukaKhopale2023'),
      fetch('https://api.github.com/users/RenukaKhopale2023/repos?sort=updated&per_page=6')
    ]);

    if (!profileRes.ok || !repoRes.ok) throw new Error('GitHub API request failed');

    const profile = await profileRes.json();
    const repos = await repoRes.json();

    document.getElementById('ghName').textContent = profile.name || 'Renuka Khopale';
    document.getElementById('ghBio').textContent = profile.bio || 'AI / Data Science profile';
    document.getElementById('ghRepos').textContent = profile.public_repos ?? '--';
    document.getElementById('ghFollowers').textContent = profile.followers ?? '--';
    document.getElementById('ghFollowing').textContent = profile.following ?? '--';

    if (!Array.isArray(repos) || repos.length === 0) {
      repoGrid.innerHTML = '<div class="repo-placeholder">Public repositories are not visible yet. Add project repos to GitHub and this section will update automatically.</div>';
      return;
    }

    repoGrid.innerHTML = repos
      .map(
        (repo) => `
          <a class="repo-card" href="${repo.html_url}" target="_blank" rel="noreferrer">
            <h4>${repo.name}</h4>
            <p>${repo.description || 'Repository available on GitHub profile.'}</p>
            <div class="repo-meta">
              <span>★ ${repo.stargazers_count}</span>
              <span>${repo.language || 'Code'}</span>
              <span>Updated ${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
          </a>
        `
      )
      .join('');
  } catch (error) {
    repoGrid.innerHTML = '<div class="repo-placeholder">GitHub data could not be loaded at the moment. The profile link remains available above.</div>';
    document.getElementById('ghBio').textContent = 'Public GitHub integration unavailable right now.';
  }
}

loadGitHub();

function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    createParticles();
  }

  function createParticles() {
    const count = Math.max(36, Math.floor(window.innerWidth / 32));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2.2 + 0.6,
      dx: (Math.random() - 0.5) * 0.35,
      dy: (Math.random() - 0.5) * 0.35,
      c: Math.random() > 0.5 ? 'rgba(0,229,255,0.8)' : 'rgba(123,97,255,0.6)'
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

      ctx.beginPath();
      ctx.fillStyle = p.c;
      ctx.shadowBlur = 12;
      ctx.shadowColor = p.c;
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(140,180,255,${1 - dist / 110})`;
          ctx.lineWidth = 0.45;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', resize);
  resize();
  draw();
}

initParticles();

