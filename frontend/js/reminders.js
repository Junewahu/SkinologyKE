// reminders.js: Save/check routine state in localStorage, show status

document.getElementById('routine-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const routine = {
    cleanse_am: document.getElementById('cleanse-am').checked,
    moisturize_am: document.getElementById('moisturize-am').checked,
    spf_am: document.getElementById('spf-am').checked,
    cleanse_pm: document.getElementById('cleanse-pm').checked,
    treat_pm: document.getElementById('treat-pm').checked,
    moisturize_pm: document.getElementById('moisturize-pm').checked
  };
  localStorage.setItem('skinologyke_routine', JSON.stringify(routine));
  document.getElementById('routine-status').textContent = 'Routine saved!';
});

window.addEventListener('DOMContentLoaded', function() {
  const saved = localStorage.getItem('skinologyke_routine');
  if (saved) {
    const routine = JSON.parse(saved);
    Object.keys(routine).forEach(key => {
      const el = document.getElementById(key.replace('_', '-'));
      if (el) el.checked = routine[key];
    });
    document.getElementById('routine-status').textContent = 'Routine loaded.';
  }
});
