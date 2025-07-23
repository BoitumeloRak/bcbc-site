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

// Initialize AOS (Animate On Scroll)
AOS.init();

// Toggle expandable details in Why Study with Us section
function toggleWhyDetail(idx) {
  const details = document.querySelectorAll('.why-detail');
  details.forEach((detail, i) => {
    if (i === idx) {
      detail.style.display = detail.style.display === 'block' ? 'none' : 'block';
    } else {
      detail.style.display = 'none';
    }
  });
}

// Improved Testimonial slider logic with touch support and debugging
(function() {
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots = document.querySelectorAll('.testimonial-dot');
  const left = document.querySelector('.testimonial-arrow.left');
  const right = document.querySelector('.testimonial-arrow.right');
  let current = 0;
  let autoSlide;

  function showSlide(idx) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === idx);
      dots[i].classList.toggle('active', i === idx);
    });
    current = idx;
    console.log('Showing slide:', idx);
  }

  function nextSlide() {
    showSlide((current + 1) % slides.length);
  }

  function prevSlide() {
    showSlide((current - 1 + slides.length) % slides.length);
  }

  function goToSlide(idx) {
    showSlide(idx);
  }

  if (right) right.addEventListener('click', () => {
    console.log('Right arrow clicked');
    nextSlide();
    resetAutoSlide();
  });
  if (left) left.addEventListener('click', () => {
    console.log('Left arrow clicked');
    prevSlide();
    resetAutoSlide();
  });
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      console.log('Dot clicked:', i);
      goToSlide(i);
      resetAutoSlide();
    });
  });

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(nextSlide, 7000);
  }

  // Touch swipe support for mobile
  let startX = 0;
  let isTouching = false;
  const slider = document.querySelector('.testimonial-slider');
  if (slider) {
    slider.addEventListener('touchstart', function(e) {
      if (e.touches.length === 1) {
        isTouching = true;
        startX = e.touches[0].clientX;
      }
    });
    slider.addEventListener('touchmove', function(e) {
      if (!isTouching) return;
      const moveX = e.touches[0].clientX;
      const diff = moveX - startX;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          console.log('Swipe right');
          prevSlide();
        } else {
          console.log('Swipe left');
          nextSlide();
        }
        isTouching = false;
        resetAutoSlide();
      }
    });
    slider.addEventListener('touchend', function() {
      isTouching = false;
    });
  }

  autoSlide = setInterval(nextSlide, 7000);
  showSlide(0);
})();

// SwiperJS initialization for testimonials
const testimonialSwiper = new Swiper('.testimonials-swiper', {
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  autoplay: {
    delay: 7000,
    disableOnInteraction: false
  }
});

document.addEventListener('DOMContentLoaded', function() {
  // Expandable testimonials list
  const showAllBtn = document.getElementById('show-all-testimonials');
  if (showAllBtn) {
    console.log('Show All Testimonials button found');
    showAllBtn.addEventListener('click', function() {
      console.log('Button clicked!');
      const allTestimonials = document.getElementById('all-testimonials');
      if (allTestimonials) {
        allTestimonials.style.display = 'block';
        showAllBtn.style.display = 'none';
      }
    });
  } else {
    console.log('Show All Testimonials button NOT found');
  }
});
