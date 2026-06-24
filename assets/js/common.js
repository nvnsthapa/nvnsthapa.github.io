/* common.js — shared utilities for nvnsthapa.github.io */

$(document).ready(function () {

  /* --------------------------------------------------
     1. Abstract / BibTeX toggles (Publications page)
     -------------------------------------------------- */
  $('a.abstract').click(function () {
    $(this).parent().parent().find('.abstract.hidden').toggleClass('open');
  });
  $('a.bibtex').click(function () {
    $(this).parent().parent().find('.bibtex.hidden').toggleClass('open');
  });

  /* --------------------------------------------------
     2. Scrolling Progress Bar (shared across all pages)
     -------------------------------------------------- */
  var navbarHeight = $('#navbar').outerHeight(true);
  $('body').css({ 'padding-top': navbarHeight });
  $('progress-container').css({ 'padding-top': navbarHeight });
  var progressBar = $('#progress');
  progressBar.css({ top: navbarHeight });

  var getMax = function () { return $(document).height() - $(window).height(); };
  var getValue = function () { return $(window).scrollTop(); };

  if ('max' in document.createElement('progress')) {
    progressBar.attr({ max: getMax(), value: getValue() });
    $(document).on('scroll', function () {
      progressBar.attr({ value: getValue() });
    });
    $(window).resize(function () {
      navbarHeight = $('#navbar').outerHeight(true);
      $('body').css({ 'padding-top': navbarHeight });
      $('progress-container').css({ 'padding-top': navbarHeight });
      progressBar.css({ top: navbarHeight });
      progressBar.attr({ max: getMax(), value: getValue() });
    });
  } else {
    var max = getMax(), value, width;
    var getWidth = function () {
      value = getValue();
      width = (value / max) * 100 + '%';
      return width;
    };
    var setWidth = function () { progressBar.css({ width: getWidth() }); };
    setWidth();
    $(document).on('scroll', setWidth);
    $(window).on('resize', function () { max = getMax(); setWidth(); });
  }

  /* --------------------------------------------------
     3. Dynamic footer year
     -------------------------------------------------- */
  var yearEl = document.getElementById('footer-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* --------------------------------------------------
     4. Dark mode toggle
     -------------------------------------------------- */
  var THEME_KEY = 'nt-theme';
  var toggle = document.getElementById('dark-mode-toggle');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  // Restore saved theme or default to 'light'
  var savedTheme = 'light';
  try { savedTheme = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) {}
  applyTheme(savedTheme);

  if (toggle) {
    toggle.addEventListener('click', function () {
      var current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* --------------------------------------------------
     5. Scroll-reveal (IntersectionObserver)
     -------------------------------------------------- */
  if ('IntersectionObserver' in window) {
    var revealOpts = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' };
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, revealOpts);

    document.querySelectorAll('.reveal, .reveal-group').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything immediately
    document.querySelectorAll('.reveal, .reveal-group').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

});