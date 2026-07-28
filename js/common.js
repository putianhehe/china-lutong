/* ============================================================
   China-Lutong Parts Plant - Global Common JavaScript
   Language routing, mobile menu, scroll animations, counters
   ============================================================ */

(function() {
  'use strict';

  // ==========================================================
  // Language Configuration
  // ==========================================================
  var LANGS = ['en', 'cn', 'ru', 'es'];

  // English is now at root level. Other languages are subdirectories.
  // Root path (no /lang/ prefix) = English
  // /cn/xxx or /ru/xxx or /es/xxx = other languages

  var CURRENT_LANG = (function() {
    var path = window.location.pathname;
    for (var i = 0; i < LANGS.length; i++) {
      var lang = LANGS[i];
      if (lang === 'en') continue; // Skip en — it's at root
      if (path.indexOf('/' + lang + '/') !== -1 || path.endsWith('/' + lang)) {
        return lang;
      }
    }
    // No lang prefix found → root = English
    return 'en';
  })();

  var CURRENT_PAGE = (function() {
    var path = window.location.pathname.replace(/\/$/, '');
    var parts = path.split('/');
    var page = parts[parts.length - 1] || 'index.html';
    if (page.indexOf('.html') === -1) {
      // Check if last part is a language directory (e.g., /cn or /ru)
      if (LANGS.indexOf(page) !== -1) page = 'index.html';
    }
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
    var nav = document.querySelector('.nav');
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
    var links = document.querySelectorAll('.nav-links a, .mobile-nav a');
    var page = CURRENT_PAGE.replace('.html', '');
    links.forEach(function(link) {
      var href = link.getAttribute('href') || '';
      if (href === page || (page === 'index' && (href === 'index' || href === 'index.html'))) {
        link.classList.add('active');
      }
    });
  }

  // ==========================================================
  // Mobile Menu
  // ==========================================================
  function initMobileMenu() {
    var btn = document.querySelector('.mobile-menu-btn');
    var panel = document.querySelector('.mobile-nav');
    if (!btn || !panel) return;

    btn.addEventListener('click', function() {
      var isOpen = btn.classList.contains('open');
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
  // Language Dropdown — relative paths, root = English
  // ==========================================================
  function initLanguageDropdown() {
    var toggle = document.querySelector('.lang-toggle');
    var btn = document.querySelector('.lang-btn');
    if (!toggle || !btn) return;

    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      toggle.classList.toggle('open');
    });

    document.addEventListener('click', function() {
      toggle.classList.remove('open');
    });

    // Mark current language as active in dropdown
    var currentLink = toggle.querySelector('a[data-lang="' + CURRENT_LANG + '"]');
    if (currentLink) currentLink.classList.add('active');

    // Set language switch hrefs — all relative paths, no absolute
    toggle.querySelectorAll('a').forEach(function(link) {
      var lang = link.getAttribute('data-lang');
      if (lang && lang !== CURRENT_LANG) {
        var href;
        if (CURRENT_LANG === 'en') {
          // From root (English) → subdirectory language: e.g., cn/about.html
          href = lang + '/' + CURRENT_PAGE;
        } else if (lang === 'en') {
          // From subdirectory language → root (English): e.g., ../about.html
          href = '../' + CURRENT_PAGE;
        } else {
          // Between subdirectory languages (e.g., cn → ru): e.g., ../ru/about.html
          href = '../' + lang + '/' + CURRENT_PAGE;
        }
        link.setAttribute('href', href);
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
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        el.classList.add('visible');
      });
      return;
    }

    var observer = new IntersectionObserver(function(entries) {
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
    var statNumbers = document.querySelectorAll('.stat-number[data-count]');
    if (!statNumbers.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute('data-count'), 10);
          var suffix = el.getAttribute('data-suffix') || '';
          var duration = 2000;
          var start = performance.now();

          function update(now) {
            var elapsed = now - start;
            var progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            var eased = 1 - Math.pow(1 - progress, 3);
            var current = Math.floor(eased * target);
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
        var targetId = this.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 72;
          var top = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
      });
    });

    // Hero scroll indicator
    var heroScroll = document.querySelector('.hero-scroll');
    if (heroScroll) {
      heroScroll.addEventListener('click', function() {
        var nextSection = document.querySelector('.hero').nextElementSibling;
        if (nextSection) {
          var navHeight = document.querySelector('.nav') ? document.querySelector('.nav').offsetHeight : 72;
          var top = nextSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
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
      var imgObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            var img = entry.target;
            var src = img.getAttribute('data-src');
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
    var tabs = document.querySelectorAll('.filter-tab');
    if (!tabs.length) return;

    tabs.forEach(function(tab) {
      tab.addEventListener('click', function() {
        tabs.forEach(function(t) { t.classList.remove('active'); });
        this.classList.add('active');

        var filter = this.getAttribute('data-filter');
        var cards = document.querySelectorAll('.news-card[data-category], .product-card[data-category]');

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
    var form = document.querySelector('.contact-form');
    if (!form) return;

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      var btn = form.querySelector('.btn-submit');
      var successMsg = form.querySelector('.form-success');
      var errorMsg = form.querySelector('.form-error');

      if (successMsg) successMsg.classList.remove('show');
      if (errorMsg) errorMsg.classList.remove('show');

      btn.classList.add('btn-loading');
      btn.disabled = true;

      // Using Web3Forms - replace with your access key
      var formData = new FormData(form);
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