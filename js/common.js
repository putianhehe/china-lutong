/* ============================================================
   China-Lutong Parts Plant - Global Common JavaScript
   Language routing, mobile menu, scroll animations, counters
   ============================================================ */

(function() {
  'use strict';

  // ==========================================================
  // Language Configuration
  // ==========================================================
  const LANGS = ['en', 'cn', 'ru', 'es'];

  // Detect base path (supports both root deploy and subdirectory like /china-lutong/)
  const BASE_PATH = (function() {
    var p = window.location.pathname.replace(/\/$/, '');
    var parts = p.split('/');
    // 1) Extract subpath before lang directory (e.g., /china-lutong from /china-lutong/en/...)
    for (var i = 0; i < LANGS.length; i++) {
      var idx = p.indexOf('/' + LANGS[i] + '/');
      if (idx !== -1) return p.substring(0, idx);
      if (p.endsWith('/' + LANGS[i]) && parts[parts.length - 1] === LANGS[i]) {
        return p.substring(0, p.length - LANGS[i].length - 1);
      }
    }
    // 2) Root index page under subpath (e.g., /china-lutong/ or /china-lutong)
    if (parts.length >= 2) {
      var candidate = parts[1];
      if (candidate && LANGS.indexOf(candidate) === -1 && candidate.indexOf('.') === -1) {
        return '/' + candidate;
      }
    }
    return '';
  })();

  var CURRENT_LANG = (function() {
    var path = window.location.pathname;
    var rel = BASE_PATH ? path.substring(BASE_PATH.length) : path;
    for (var i = 0; i < LANGS.length; i++) {
      if (rel.startsWith('/' + LANGS[i] + '/') || rel === '/' + LANGS[i]) return LANGS[i];
    }
    return 'en';
  })();

  var CURRENT_PAGE = (function() {
    var path = window.location.pathname;
    var rel = BASE_PATH ? path.substring(BASE_PATH.length) : path;
    var parts = rel.replace(/\/$/, '').split('/');
    var page = parts[parts.length - 1] || 'index.html';
    if (page.indexOf('.html') === -1) page = 'index.html';
    return page;
  })();

  // ==========================================================
  // DOM Ready
  // ==========================================================
  function ready(fn) {
    if (document.readyState !== 'loading') { fn(); }
    else { document.addEventListener('DOMContentLoaded', fn); }
  }

  ready(function() {
    initMobileMenu();
    initLanguageDropdown();
    initScrollAnimations();
    initCountUp();
    initSmoothScroll();
    initLazyImages();
    initNavScroll();
    initActiveNavLink();
    initFilterTabs();
    initContactForm();
  });

  // ==========================================================
  // Navigation Scroll Effect
  // ==========================================================
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }, { passive: true });
  }

  // ==========================================================
  // Active Navigation Link
  // ==========================================================
  function initActiveNavLink() {
    const links = document.querySelectorAll('.nav-links a, .mobile-nav a');
    const page = CURRENT_PAGE.replace('.html', '');
    links.forEach(function(link) {
      const href = link.getAttribute('href') || '';
      if (href === page || (page === 'index' && href === 'index')) {
        link.classList.add('active');
      }
    });
  }

  // ==========================================================
  // Mobile Menu
  // ==========================================================
  function initMobileMenu() {
    const btn = document.querySelector('.mobile-menu-btn');
    const panel = document.querySelector('.mobile-nav');
    if (!btn || !panel) return;

    btn.addEventListener('click', function() {
      const isOpen = btn.classList.contains('open');
      if (isOpen) {
        btn.classList.remove('open');
        panel.classList.remove('open');
        document.body.style.overflow = '';
      } else {
        btn.classList.add('open');
        panel.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    });

    // Close on link click
    panel.querySelectorAll('a').forEach(function(link) {
      link.addEventListener('click', function() {
        btn.classList.remove('open');
        panel.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ==========================================================
  // Language Dropdown
  // ==========================================================
  function initLanguageDropdown() {
    const toggle = document.querySelector('.lang-toggle');
    const btn = document.querySelector('.lang-btn');
    if (!toggle || !btn) return;

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle.classList.toggle('open');
    });

    document.addEventListener('click', function() {
      toggle.classList.remove('open');
    });

    // Mark current language as active in dropdown
    const currentLink = toggle.querySelector('a[data-lang="' + CURRENT_LANG + '"]');
    if (currentLink) currentLink.classList.add('active');

    // Set language switch hrefs
    toggle.querySelectorAll('a').forEach(function(link) {
      const lang = link.getAttribute('data-lang');
      if (lang && lang !== CURRENT_LANG) {
        const basePath = BASE_PATH + '/' + lang + '/' + CURRENT_PAGE;
        link.setAttribute('href', basePath);
      } else if (lang === CURRENT_LANG) {
        link.setAttribute('href', '#');
        link.addEventListener('click', function(e) { e.preventDefault(); });
      }
    });
  }

  // ==========================================================
  // Intersection Observer - Scroll Animations
  // ==========================================================
  function initScrollAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
      observer.observe(el);
    });
  }

  // ==========================================================
  // Count Up Animation (Stats)
  // ==========================================================
  function initCountUp() {
    const statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (!statNumbers.length) return;

    const observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.getAttribute('data-count'), 10);
          const suffix = el.getAttribute('data-suffix') || '';
          const duration = 2000;
          const start = performance.now();

          function update(now) {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);
            el.textContent = current + suffix;
            if (progress < 1) {
              requestAnimationFrame(update);
            } else {
              el.textContent = target + suffix;
            }
          }

          requestAnimationFrame(update);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.5 });

    statNumbers.forEach(function(el) {
      observer.observe(el);
    });
  }

  // ==========================================================
  // Smooth Scroll for Anchor Links
  // ==========================================================
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(link) {
      link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
          const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // Hero scroll indicator
    const heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
      heroScroll.addEventListener('click', function() {
        const nextSection = document.querySelector('.hero').nextElementSibling;
        if (nextSection) {
          const navHeight = document.querySelector('.nav')?.offsetHeight || 72;
          const top = nextSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    }
  }

  // ==========================================================
  // Lazy Image Loading
  // ==========================================================
  function initLazyImages() {
    if ('IntersectionObserver' in window) {
      const imgObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');
            if (src) {
              img.src = src;
              img.removeAttribute('data-src');
              img.classList.add('loaded');
            }
            imgObserver.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });

      document.querySelectorAll('img[data-src]').forEach(function(img) {
        imgObserver.observe(img);
      });
    } else {
      // Fallback: load all
      document.querySelectorAll('img[data-src]').forEach(function(img) {
        img.src = img.getAttribute('data-src');
        img.removeAttribute('data-src');
      });
    }
  }

  // ==========================================================
  // Filter Tabs (News Page)
  // ==========================================================
  function initFilterTabs() {
    const tabs = document.querySelectorAll('.filter-tab');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');
        const cards = document.querySelectorAll('.news-card[data-category], .product-card[data-category]');

        cards.forEach(function(card) {
          if (filter === 'all' || card.getAttribute('data-category') === filter) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // ==========================================================
  // Contact Form
  // ==========================================================
  function initContactForm() {
    const form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const btn = form.querySelector('.btn-submit');
      const successMsg = form.querySelector('.form-success');
      const errorMsg = form.querySelector('.form-error');

      if (successMsg) successMsg.classList.remove('show');
      if (errorMsg) errorMsg.classList.remove('show');

      btn.classList.add('btn-loading');
      btn.disabled = true;

      // Using Web3Forms - replace with your access key
      const formData = new FormData(form);
      formData.append('access_key', 'YOUR_WEB3FORMS_KEY'); // TODO: Replace with actual key

      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      })
      .then(function(response) { return response.json(); })
      .then(function(data) {
        btn.classList.remove('btn-loading');
        btn.disabled = false;

        if (data.success) {
          if (successMsg) successMsg.classList.add('show');
          form.reset();
        } else {
          if (errorMsg) {
            errorMsg.textContent = data.message || 'Submission failed. Please try again.';
            errorMsg.classList.add('show');
          }
        }
      })
      .catch(function() {
        btn.classList.remove('btn-loading');
        btn.disabled = false;
        if (errorMsg) {
          errorMsg.textContent = 'Network error. Please try again later.';
          errorMsg.classList.add('show');
        }
      });
    });
  }

})();
