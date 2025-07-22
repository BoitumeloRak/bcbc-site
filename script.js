// Smooth scroll for nav links

document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Simple quote rotator for founder section (can add more quotes)
const quotes = [
  '“For we walk by faith, not by sight.” – 2 Corinthians 5:7',
  '“Commit your work to the Lord, and your plans will be established.” – Proverbs 16:3',
  '“The Lord is my shepherd; I shall not want.” – Psalm 23:1',
  '“I can do all things through Christ who strengthens me.” – Philippians 4:13',
  '“Trust in the Lord with all your heart and lean not on your own understanding.” – Proverbs 3:5',
  '“But seek first the kingdom of God and his righteousness, and all these things will be added to you.” – Matthew 6:33',
  '“Be strong and courageous. Do not be afraid; do not be discouraged, for the Lord your God will be with you wherever you go.” – Joshua 1:9',
  '“For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.” – Jeremiah 29:11',
  // Life quotes
  '“The best way to get started is to quit talking and begin doing.” – Walt Disney',
  '“Success is not final, failure is not fatal: It is the courage to continue that counts.” – Winston Churchill',
  '“What lies behind us and what lies before us are tiny matters compared to what lies within us.” – Ralph Waldo Emerson',
  '“The only limit to our realization of tomorrow will be our doubts of today.” – Franklin D. Roosevelt',
  '“You are never too old to set another goal or to dream a new dream.” – C.S. Lewis',
  '“Act as if what you do makes a difference. It does.” – William James',
  '“Happiness is not something ready made. It comes from your own actions.” – Dalai Lama',
  '“The future belongs to those who believe in the beauty of their dreams.” – Eleanor Roosevelt'
];

const quoteBlock = document.querySelector('#about-founder blockquote');
if (quoteBlock) {
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % quotes.length;
    quoteBlock.textContent = quotes[idx];
  }, 5000);
}

// Scroll-triggered fade-in animation for sections
const sections = document.querySelectorAll('section, #about-founder');
const observer = new window.IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

sections.forEach(section => {
  section.classList.add('fade-init');
  observer.observe(section);
});

// Read More toggle for founder bio
const toggleBtn = document.getElementById('toggle-founder');
if (toggleBtn) {
  toggleBtn.addEventListener('click', function() {
    const more = document.getElementById('founder-more');
    if (more.style.display === 'none' || more.style.display === '') {
      more.style.display = 'block';
      toggleBtn.textContent = 'Show Less';
    } else {
      more.style.display = 'none';
      toggleBtn.textContent = 'Read More';
    }
  });
}

// Floating Back to Top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});
backToTop && backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
