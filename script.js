  (function() {
      AOS.init({ once: true, duration: 700, easing: 'ease-out-cubic' });

      // theme toggle
      const themeToggle = document.getElementById('themeToggle');
      const themeIcon = document.getElementById('themeIcon');
      const body = document.body;
      function setTheme(theme) {
        if (theme === 'dark') { body.classList.add('dark'); themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
        else { body.classList.remove('dark'); themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
        localStorage.setItem('theme', theme);
      }
      const saved = localStorage.getItem('theme') || 'light';
      setTheme(saved);
      themeToggle.addEventListener('click', () => setTheme(body.classList.contains('dark') ? 'light' : 'dark'));

      // mobile menu
      const mobileBtn = document.getElementById('mobileMenuBtn');
      const mobileDropdown = document.getElementById('mobileDropdown');
      mobileBtn.addEventListener('click', (e) => { e.stopPropagation(); mobileDropdown.classList.toggle('hidden'); });
      document.addEventListener('click', (e) => { if (!mobileBtn.contains(e.target) && !mobileDropdown.contains(e.target)) mobileDropdown.classList.add('hidden'); });

      // smooth scroll
      document.querySelectorAll('a[href^="#"]').forEach(a => a.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) { target.scrollIntoView({ behavior: 'smooth', block: 'start' }); mobileDropdown.classList.add('hidden'); }
      }));

      // parallax
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

      // ANIMATED MODAL functions
      window.openModal = function(src) {
        const modal = document.getElementById('certModal');
        const modalImg = document.getElementById('modalImage');
        modalImg.src = src;
        modal.classList.add('active');
        // small delay to ensure display:flex is applied before transition
        setTimeout(() => modal.style.opacity = '1', 10);
      };

      window.closeModal = function() {
        const modal = document.getElementById('certModal');
        modal.style.opacity = '0';
        // wait for fade out then remove active class (hide)
        setTimeout(() => {
          modal.classList.remove('active');
          // reset opacity for next open (otherwise it stays 0)
          modal.style.opacity = '';
        }, 250); // match transition duration
      };
    })();