/* ==========================================================================
   Mora — Sparkling Botanical Tonics
   Behavior: header state, mobile menu, bag counter, toast, newsletter
   validation, FAQ accordion, reveal hooks, stat counters
   ========================================================================== */

(function () {
  'use strict';

  var header = document.querySelector('[data-header]');
  var menuToggle = document.querySelector('[data-menu-toggle]');
  var mobileMenu = document.querySelector('[data-menu]');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     Sticky header state
     ------------------------------------------------------------------ */

  function updateHeader() {
    if (!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 12);
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------ */

  function setMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    mobileMenu.hidden = !open;
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
    document.body.classList.toggle('menu-open', open);
  }

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener('click', function () {
      setMenu(mobileMenu.hidden);
    });

    mobileMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        setMenu(false);
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && !mobileMenu.hidden) {
        setMenu(false);
        menuToggle.focus();
      }
    });

    var desktopQuery = window.matchMedia('(min-width: 961px)');
    var closeMenuAtDesktop = function (event) {
      if (event.matches) setMenu(false);
    };

    if (typeof desktopQuery.addEventListener === 'function') {
      desktopQuery.addEventListener('change', closeMenuAtDesktop);
    } else if (typeof desktopQuery.addListener === 'function') {
      desktopQuery.addListener(closeMenuAtDesktop);
    }
  }

  /* ------------------------------------------------------------------
     Bag counter + toast
     ------------------------------------------------------------------ */

  var cartCount = 0;
  var cartCountEl = document.querySelector('[data-cart-count]');
  var cartLink = document.querySelector('[data-cart-link]');
  var toast = document.querySelector('[data-toast]');
  var toastMessage = document.querySelector('[data-toast-message]');
  var toastTimer;

  function showToast(message) {
    if (!toast || !toastMessage) return;
    window.clearTimeout(toastTimer);
    toastMessage.textContent = message;
    toast.hidden = false;
    requestAnimationFrame(function () {
      toast.classList.add('is-visible');
    });
    toastTimer = window.setTimeout(function () {
      toast.classList.remove('is-visible');
      window.setTimeout(function () {
        toast.hidden = true;
      }, reducedMotion ? 0 : 240);
    }, 3200);
  }

  document.querySelectorAll('[data-add]').forEach(function (button) {
    button.addEventListener('click', function () {
      var product = button.getAttribute('data-add') || 'Your pick';
      cartCount += 1;

      if (cartCountEl) {
        cartCountEl.textContent = String(cartCount);
        cartCountEl.classList.remove('is-pulsing');
        void cartCountEl.offsetWidth;
        cartCountEl.classList.add('is-pulsing');
      }

      if (cartLink) {
        cartLink.setAttribute('aria-label', 'Shopping bag, ' + cartCount + (cartCount === 1 ? ' item' : ' items'));
      }

      showToast(product + ' added to your bag · ' + cartCount + (cartCount === 1 ? ' item' : ' items'));

      var original = button.innerHTML;
      button.innerHTML = 'Added to bag <span aria-hidden="true">✓</span>';
      button.disabled = true;
      window.setTimeout(function () {
        button.innerHTML = original;
        button.disabled = false;
      }, 1800);
    });
  });

  /* ------------------------------------------------------------------
     Newsletter validation
     ------------------------------------------------------------------ */

  var signupForm = document.querySelector('[data-signup-form]');
  if (signupForm) {
    signupForm.noValidate = true;
    var emailInput = signupForm.querySelector('input[type="email"]');
    var status = signupForm.querySelector('#signup-status');
    var submitButton = signupForm.querySelector('button[type="submit"]');
    var submitLabel = submitButton ? submitButton.textContent : 'Count me in';

    signupForm.addEventListener('submit', function (event) {
      event.preventDefault();
      var value = emailInput ? emailInput.value.trim() : '';
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

      if (!status) return;
      status.classList.remove('is-error', 'is-success');

      if (!valid) {
        status.textContent = value
          ? 'Hmm, that email doesn’t look quite right. Try again?'
          : 'Add your email and we’ll save you a spot.';
        status.classList.add('is-error');
        if (emailInput) {
          emailInput.setAttribute('aria-invalid', 'true');
          emailInput.focus();
        }
        return;
      }

      status.textContent = 'You’re in. Check your inbox for 10% off your first pack.';
      status.classList.add('is-success');
      if (emailInput) emailInput.removeAttribute('aria-invalid');
      signupForm.reset();
      if (submitButton) {
        submitButton.textContent = 'Welcome in';
        window.setTimeout(function () {
          submitButton.textContent = submitLabel;
        }, 3000);
      }
    });

    if (emailInput) {
      emailInput.addEventListener('input', function () {
        emailInput.removeAttribute('aria-invalid');
        if (status && status.classList.contains('is-error')) {
          status.textContent = '';
          status.classList.remove('is-error');
        }
      });
    }
  }

  /* ------------------------------------------------------------------
     FAQ accordion: keep one answer open at a time
     ------------------------------------------------------------------ */

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (!item.open) return;
      faqItems.forEach(function (other) {
        if (other !== item) other.open = false;
      });
    });
  });

  /* ------------------------------------------------------------------
     Reveal hooks (content is always visible; class is available for styling)
     ------------------------------------------------------------------ */

  var revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add('is-visible');
    });
  }

  /* ------------------------------------------------------------------
     Stat counters
     ------------------------------------------------------------------ */

  var counters = document.querySelectorAll('[data-counter]');

  function animateCounter(element) {
    var target = parseFloat(element.getAttribute('data-target'));
    var decimals = parseInt(element.getAttribute('data-decimals') || '0', 10);
    var suffix = element.getAttribute('data-suffix') || '';
    if (isNaN(target)) return;
    if (reducedMotion) {
      element.textContent = target.toFixed(decimals) + suffix;
      return;
    }

    var start = performance.now();
    var duration = 1100;
    function frame(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (counter) {
      counterObserver.observe(counter);
    });
  }

  /* ------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------ */

  var year = document.querySelector('[data-year]');
  if (year) year.textContent = String(new Date().getFullYear());
})();
