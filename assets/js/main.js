document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const revealElements = document.querySelectorAll('.reveal');

  // --- Navbar scroll effect ---
  function updateNavbar() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('top');
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.add('top');
    }
  }

  updateNavbar();
  window.addEventListener('scroll', updateNavbar, { passive: true });

  // --- Mobile menu toggle ---
  menuToggle.addEventListener('click', function () {
    mobileMenu.classList.toggle('active');
    const icon = menuToggle.querySelector('i');
    if (mobileMenu.classList.contains('active')) {
      icon.className = 'fas fa-times text-xl';
    } else {
      icon.className = 'fas fa-bars text-xl';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('active');
      menuToggle.querySelector('i').className = 'fas fa-bars text-xl';
    });
  });

  // --- Scroll reveal animations using Intersection Observer ---
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  revealElements.forEach(function (el) {
    observer.observe(el);
  });

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    var scrollPos = window.scrollY + 200;

    sections.forEach(function (section) {
      var sectionTop = section.offsetTop;
      var sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPos >= sectionTop && scrollPos < sectionBottom) {
        var id = section.getAttribute('id');
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink, { passive: true });
  updateActiveLink();

  // --- Smooth scroll for anchor links (fallback) ---
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    });
  });

  // --- Timeline staggered animation ---
  var timelineItems = document.querySelectorAll('#timeline .reveal');
  var timelineObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          timelineObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  timelineItems.forEach(function (el, index) {
    el.style.transitionDelay = index * 0.15 + 's';
    timelineObserver.observe(el);
  });
});