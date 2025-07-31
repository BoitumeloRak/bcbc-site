document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.warn(`Target ${this.getAttribute('href')} not found`);
    }
  });
});

const quotes = [
  '“For we walk by faith, not by sight.” – 2 Corinthians 5:7',
  '“Commit your work to the Lord, and your plans will be established.” – Proverbs 16:3',
  '“The Lord is my shepherd; I shall not want.” – Psalm 23:1',
  '“I can do all things through Christ who strengthens me.” – Philippians 4:13',
  '“Trust in the Lord with all your heart and lean not on your own understanding.” – Proverbs 3:5'
];

const quoteBlock = document.querySelector('#about-founder blockquote');
if (quoteBlock) {
  let idx = 0;
  setInterval(() => {
    idx = (idx + 1) % quotes.length;
    quoteBlock.textContent = quotes[idx];
  }, 5000);
} else {
  console.warn('Quote block not found in #about-founder');
}

const sections = document.querySelectorAll('section, #about-founder');
const observer = new IntersectionObserver((entries, obs) => {
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

const toggleBtn = document.getElementById('toggle-founder');
if (toggleBtn) {
  toggleBtn.addEventListener('click', function() {
    const more = document.getElementById('founder-more');
    if (more) {
      if (more.style.display === 'none' || more.style.display === '') {
        more.style.display = 'block';
        toggleBtn.textContent = 'Show Less';
      } else {
        more.style.display = 'none';
        toggleBtn.textContent = 'Read More About the Bishop';
      }
    } else {
      console.warn('Founder more section not found');
    }
  });
} else {
  console.warn('Toggle founder button not found');
}

const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.style.display = 'block';
    } else {
      backToTop.style.display = 'none';
    }
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
} else {
  console.warn('Back to top button not found');
}

try {
  AOS.init();
} catch (e) {
  console.warn('AOS initialization failed:', e);
}

function toggleWhyDetail(idx) {
  const details = document.querySelectorAll('.why-detail');
  if (details.length > 0) {
    details.forEach((detail, i) => {
      if (i === idx) {
        detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
      } else {
        detail.style.display = 'none';
      }
    });
  } else {
    console.warn('No why-detail elements found');
  }
}

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    try {
      const name = form.querySelector('#cf-name').value.trim();
      const email = form.querySelector('#cf-email').value.trim();
      if (!name || !email || !/^\S+@\S+\.\S+$/.test(email)) {
        e.preventDefault();
        alert('Please fill out all fields with a valid email.');
      } else {
        e.preventDefault(); // Prevent default for custom handling
        const formData = new FormData(form);
        fetch('/.netlify/functions/send-mail', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            message: form.querySelector('#cf-message').value.trim()
          })
        })
        .then(async (response) => {
          const data = await response.json();
          if (response.ok) {
            const success = document.getElementById('form-success');
            if (success) {
              success.style.display = 'block';
              form.reset();
              setTimeout(() => success.style.display = 'none', 5000);
            }
          } else {
            console.error('Error response from server:', data);
            alert('There was an issue submitting your form. Please try again.');
          }
        })
        .catch(error => {
          console.error('Form submission network error:', error);
          alert('There was a network error. Please check your connection and try again.');
        });
      }
    } catch (e) {
      console.warn('Form validation error:', e);
    }
  });
} else {
  console.warn('Contact form not found');
}

(function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.getElementById('nav-links');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function() {
      const isOpen = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen);
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', false);
      });
    });
  } else {
    console.warn('Navigation toggle or links not found');
  }
})();
// Optional: Dynamic WhatsApp link based on form inputs
const whatsappBtn = document.getElementById("whatsapp-button");
if (whatsappBtn) {
  form?.addEventListener("input", () => {
    const name = form.querySelector("#cf-name")?.value.trim();
    const message = form.querySelector("#cf-message")?.value.trim();

    const baseLink = "https://wa.me/27831234567";
    const query = `Hi, my name is ${name || "Anonymous"}. ${message || "I would like to learn more about your programs."}`;
    const encoded = encodeURIComponent(query);

    whatsappBtn.href = `${baseLink}?text=${encoded}`;
  });
}
