// Define modal functions FIRST (globally accessible)
window.openModal = function(src) {
  console.log('Opening modal:', src);
  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImage');
  
  if (!modal || !modalImg) {
    console.error('Modal elements not found!');
    return;
  }
  
  modalImg.src = src;
  modal.classList.add('active');
  setTimeout(() => {
    modal.style.opacity = '1';
  }, 10);
};

window.closeModal = function() {
  console.log('Closing modal');
  const modal = document.getElementById('certModal');
  
  if (!modal) return;
  
  modal.style.opacity = '0';
  setTimeout(() => {
    modal.classList.remove('active');
    modal.style.opacity = '';
  }, 250);
};

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

  // Theme toggle
  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = document.getElementById('themeIcon');
  const body = document.body;
  
  function setTheme(theme) {
    if (theme === 'dark') { 
      body.classList.add('dark'); 
      if (themeIcon) {
        themeIcon.classList.remove('fa-moon'); 
        themeIcon.classList.add('fa-sun'); 
      }
    } else { 
      body.classList.remove('dark'); 
      if (themeIcon) {
        themeIcon.classList.remove('fa-sun'); 
        themeIcon.classList.add('fa-moon'); 
      }
    }
    localStorage.setItem('theme', theme);
  }
  
  const saved = localStorage.getItem('theme') || 'light';
  setTheme(saved);
  
  if (themeToggle) {
    themeToggle.addEventListener('click', () => setTheme(body.classList.contains('dark') ? 'light' : 'dark'));
  }

  // Mobile menu
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDropdown = document.getElementById('mobileDropdown');
  
  if (mobileBtn && mobileDropdown) {
    mobileBtn.addEventListener('click', (e) => { 
      e.stopPropagation(); 
      mobileDropdown.classList.toggle('hidden'); 
    });
    
    document.addEventListener('click', (e) => { 
      if (!mobileBtn.contains(e.target) && !mobileDropdown.contains(e.target)) {
        mobileDropdown.classList.add('hidden'); 
      }
    });
  }

  // Smooth scroll
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target) { 
        target.scrollIntoView({ behavior: 'smooth', block: 'start' }); 
        if (mobileDropdown) mobileDropdown.classList.add('hidden'); 
      }
    });
  });

  // Parallax
  const layer1 = document.getElementById('layer1');
  const layer2 = document.getElementById('layer2');
  const shape1 = document.getElementById('shape1');
  const shape2 = document.getElementById('shape2');
  
  window.addEventListener('scroll', function() {
    const scrollY = window.scrollY;
    const translate1 = scrollY * 0.15;
    const translate2 = scrollY * 0.08;
    const translateShape = scrollY * 0.03;
    
    if (layer1) layer1.style.transform = `translateY(${translate1}px)`;
    if (layer2) layer2.style.transform = `translateY(${translate2}px)`;
    if (shape1) shape1.style.transform = `translateY(${translateShape}px)`;
    if (shape2) shape2.style.transform = `translateY(${-translateShape * 0.5}px)`;
  });
});