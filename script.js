document.addEventListener('DOMContentLoaded', () => {
  // Loading spinner hide
  const loading = document.getElementById('loading');
  setTimeout(() => {
    loading.classList.add('hide');
  }, 1000);

  // Dark mode toggle
  const darkToggle = document.getElementById('darkModeToggle');
  const body = document.body;

  // Load theme from localStorage
  if(localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark');
  }

  darkToggle.addEventListener('click', () => {
    body.classList.toggle('dark');
    if(body.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.removeItem('theme');
    }
  });

  // Back to top button
  const backToTopBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
      backToTopBtn.style.display = 'block';
    } else {
      backToTopBtn.style.display = 'none';
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Scroll triggered fade-ins
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -80px 0px"
  };

  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if(!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);

  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Hover sound effect
  const hoverSound = new Audio('media/hover.mp3');
  document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
      hoverSound.currentTime = 0;
      hoverSound.play();
    });
  });

  // Recipe filter buttons on recipes.html
  const filterBtns = document.querySelectorAll('.filter-btn');
  const recipeCards = document.querySelectorAll('.recipe-cards .card');

  if(filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        recipeCards.forEach(card => {
          if(filter === 'all') {
            card.style.display = 'block';
          } else {
            card.style.display = (card.getAttribute('data-category') === filter) ? 'block' : 'none';
          }
        });
      });
    });
  }
  // Counter Animation
const counters = document.querySelectorAll('.count');
counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / 100;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 20);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
});

});
