(function () {
  'use strict';
  document.documentElement.classList.add('js');

  // Scroll reveal (skipped when reduced motion is preferred)
  var els = document.querySelectorAll('.reveal');
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) {
    els.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Close mobile menu after choosing a link
  var menu = document.getElementById('navMenu');
  document.querySelectorAll('#navMenu .nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      if (menu.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(menu).hide();
      }
    });
  });

  // Contact form: opens the visitor's email app. Nothing is sent by this site.
  var form = document.getElementById('contactForm');
  var status = document.getElementById('formStatus');
  form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    status.className = 'form-status';
    var to = form.getAttribute('data-email');
    var val = function (id) { return document.getElementById(id).value.trim(); };

    if (!val('name') || !val('matter') || !val('message')) {
      status.className = 'form-status error';
      status.textContent = 'Please fill in your name, matter / query and message.';
      return;
    }
    if (!to || to.indexOf('[') !== -1 || to.indexOf('@') === -1) {
      status.className = 'form-status error';
      status.textContent = 'This form is not connected yet. Set an email address in the form\'s data-email attribute in index.html.';
      return;
    }
    var body = 'Name: ' + val('name') + '\nPhone: ' + val('phone') + '\nEmail: ' + val('email') +
               '\n\nMessage:\n' + val('message');
    window.location.href = 'mailto:' + to +
      '?subject=' + encodeURIComponent('Enquiry: ' + val('matter')) +
      '&body=' + encodeURIComponent(body);
    status.textContent = 'Your email application should now open. Please review and send the message from there.';
  });
})();
