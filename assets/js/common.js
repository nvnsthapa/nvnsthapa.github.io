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

  /* --------------------------------------------------
     6. Homepage highlights spotlight
     -------------------------------------------------- */
  var highlightRoot = document.querySelector('[data-highlight-spotlight]');
  if (highlightRoot) {
    var highlightFeature = highlightRoot.querySelector('.highlight-feature');
    var featureImage = highlightRoot.querySelector('[data-highlight-feature-image]');
    var featureCategory = highlightRoot.querySelector('[data-highlight-feature-category]');
    var featureSource = highlightRoot.querySelector('[data-highlight-feature-source]');
    var featureTitle = highlightRoot.querySelector('[data-highlight-feature-title]');
    var featureDescription = highlightRoot.querySelector('[data-highlight-feature-description]');
    var featureLink = highlightRoot.querySelector('[data-highlight-feature-link]');
    var previewButton = highlightRoot.querySelector('[data-highlight-preview]');
    var highlightItems = Array.prototype.slice.call(highlightRoot.querySelectorAll('[data-highlight-item]'));
    var activeHighlight = highlightItems[0] || null;

    var lightbox = document.querySelector('[data-highlight-lightbox]');
    var lightboxImage = lightbox ? lightbox.querySelector('[data-highlight-lightbox-image]') : null;
    var lightboxCaption = lightbox ? lightbox.querySelector('[data-highlight-lightbox-caption]') : null;
    var lightboxCloseControls = lightbox ? Array.prototype.slice.call(lightbox.querySelectorAll('[data-highlight-lightbox-close]')) : [];
    var lastFocusedElement = null;

    function setHighlight(item, shouldFocus) {
      if (!item || item === activeHighlight && item.classList.contains('is-active')) {
        return;
      }

      activeHighlight = item;

      highlightItems.forEach(function (otherItem) {
        var isActive = otherItem === item;
        otherItem.classList.toggle('is-active', isActive);
        otherItem.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      if (featureImage) {
        featureImage.src = item.getAttribute('data-image') || '';
        featureImage.alt = item.getAttribute('data-alt') || '';
      }
      if (featureCategory) {
        featureCategory.textContent = item.getAttribute('data-category') || '';
      }
      if (featureSource) {
        featureSource.textContent = item.getAttribute('data-source') || '';
      }
      if (featureTitle) {
        featureTitle.textContent = item.getAttribute('data-title') || '';
      }
      if (featureDescription) {
        featureDescription.textContent = item.getAttribute('data-description') || '';
      }

      var url = item.getAttribute('data-url');
      var cta = item.getAttribute('data-cta') || 'Read story';

      if (url && featureLink) {
        featureLink.hidden = false;
        featureLink.href = url;
        featureLink.textContent = cta;
      } else if (featureLink) {
        featureLink.hidden = true;
        featureLink.removeAttribute('href');
      }

      if (previewButton) {
        previewButton.hidden = !!url;
        previewButton.textContent = cta;
      }

      if (highlightFeature) {
        highlightFeature.classList.remove('is-updating');
        highlightFeature.offsetWidth;
        highlightFeature.classList.add('is-updating');
        window.setTimeout(function () {
          highlightFeature.classList.remove('is-updating');
        }, 260);
      }

      if (shouldFocus) {
        item.focus();
      }
    }

    function openHighlightPreview() {
      if (!lightbox || !activeHighlight || !lightboxImage || !lightboxCaption) {
        return;
      }

      lastFocusedElement = document.activeElement;
      lightboxImage.src = activeHighlight.getAttribute('data-image') || '';
      lightboxImage.alt = activeHighlight.getAttribute('data-alt') || '';
      lightboxCaption.textContent = activeHighlight.getAttribute('data-title') || '';
      lightbox.hidden = false;
      document.body.classList.add('highlight-lightbox-open');

      var closeButton = lightbox.querySelector('.highlight-lightbox__close');
      if (closeButton) {
        closeButton.focus();
      }
    }

    function closeHighlightPreview() {
      if (!lightbox || lightbox.hidden) {
        return;
      }

      lightbox.hidden = true;
      document.body.classList.remove('highlight-lightbox-open');

      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
      }
    }

    highlightItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        setHighlight(item, false);
      });

      item.addEventListener('keydown', function (event) {
        var key = event.key;
        if (key !== 'ArrowDown' && key !== 'ArrowRight' && key !== 'ArrowUp' && key !== 'ArrowLeft') {
          return;
        }

        event.preventDefault();
        var direction = key === 'ArrowDown' || key === 'ArrowRight' ? 1 : -1;
        var nextIndex = (index + direction + highlightItems.length) % highlightItems.length;
        setHighlight(highlightItems[nextIndex], true);
      });
    });

    if (previewButton) {
      previewButton.addEventListener('click', openHighlightPreview);
    }

    lightboxCloseControls.forEach(function (control) {
      control.addEventListener('click', closeHighlightPreview);
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        closeHighlightPreview();
      }
    });
  }

  /* --------------------------------------------------
     7. Research focus spotlight
     -------------------------------------------------- */
  var researchRoot = document.querySelector('[data-research-spotlight]');
  if (researchRoot) {
    var researchFeature = researchRoot.querySelector('.research-spotlight__feature');
    var researchNumber = researchRoot.querySelector('[data-research-feature-number]');
    var researchArea = researchRoot.querySelector('[data-research-feature-area]');
    var researchTitle = researchRoot.querySelector('[data-research-feature-title]');
    var researchTagline = researchRoot.querySelector('[data-research-feature-tagline]');
    var researchDescription = researchRoot.querySelector('[data-research-feature-description]');
    var researchScale = researchRoot.querySelector('[data-research-feature-scale]');
    var researchItems = Array.prototype.slice.call(researchRoot.querySelectorAll('[data-research-item]'));
    var activeResearch = researchItems[0] || null;

    function setResearchFocus(item, shouldFocus) {
      if (!item || item === activeResearch && item.classList.contains('is-active')) {
        return;
      }

      activeResearch = item;

      researchItems.forEach(function (otherItem) {
        var isActive = otherItem === item;
        otherItem.classList.toggle('is-active', isActive);
        otherItem.setAttribute('aria-pressed', isActive ? 'true' : 'false');
      });

      if (researchNumber) {
        researchNumber.textContent = item.getAttribute('data-number') || '';
      }
      if (researchArea) {
        researchArea.textContent = item.getAttribute('data-area') || '';
      }
      if (researchTitle) {
        researchTitle.textContent = item.getAttribute('data-title') || '';
      }
      if (researchTagline) {
        researchTagline.textContent = item.getAttribute('data-tagline') || '';
      }
      if (researchDescription) {
        researchDescription.textContent = item.getAttribute('data-description') || '';
      }
      if (researchScale) {
        researchScale.textContent = item.getAttribute('data-scale') || '';
      }

      if (researchFeature) {
        researchFeature.classList.remove('is-updating');
        researchFeature.offsetWidth;
        researchFeature.classList.add('is-updating');
        window.setTimeout(function () {
          researchFeature.classList.remove('is-updating');
        }, 260);
      }

      if (shouldFocus) {
        item.focus();
      }
    }

    researchItems.forEach(function (item, index) {
      item.addEventListener('click', function () {
        setResearchFocus(item, false);
      });

      item.addEventListener('keydown', function (event) {
        var key = event.key;
        if (key !== 'ArrowDown' && key !== 'ArrowRight' && key !== 'ArrowUp' && key !== 'ArrowLeft') {
          return;
        }

        event.preventDefault();
        var direction = key === 'ArrowDown' || key === 'ArrowRight' ? 1 : -1;
        var nextIndex = (index + direction + researchItems.length) % researchItems.length;
        setResearchFocus(researchItems[nextIndex], true);
      });
    });
  }

});
