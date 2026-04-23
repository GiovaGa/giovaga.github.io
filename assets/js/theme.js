// theme.js: handle the theme toggle and persist choice to localStorage
(function(){
  const storageKey = 'site-theme';
  const root = document.documentElement;
  const toggle = document.getElementById('theme-toggle');
  if(!toggle) return;

  function applyTheme(theme){
    if(theme === 'dark'){
      root.classList.add('theme-dark');
      root.classList.remove('theme-default');
      toggle.setAttribute('aria-pressed','true');
      toggle.setAttribute('aria-label','Switch to light mode');
    } else {
      root.classList.remove('theme-dark');
      root.classList.add('theme-default');
      toggle.setAttribute('aria-pressed','false');
      toggle.setAttribute('aria-label','Switch to dark mode');
    }
  }

  // read saved state (if any) to initialize
  let saved = null;
  try { saved = localStorage.getItem(storageKey); } catch(e) { saved = null; }
  if(saved === 'dark' || (!saved && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)){
    applyTheme('dark');
  } else {
    applyTheme('light');
  }

  toggle.addEventListener('click', function(){
    const isDark = root.classList.contains('theme-dark');
    const next = isDark ? 'light' : 'dark';
    applyTheme(next);
    try{ localStorage.setItem(storageKey, next); }catch(e){}
  });
})();
