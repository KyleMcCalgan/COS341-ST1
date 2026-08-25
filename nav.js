(() => {
  const topbar = document.querySelector('.topbar-inner');
  if (!topbar || document.querySelector('.nav-toggle')) return;
  const stylesheet = document.querySelector('link[href$="style.css"]');
  const root = stylesheet && stylesheet.getAttribute('href').startsWith('../') ? '../' : '';
  const link = (path, label) => `<a href="${root}${path}">${label}</a>`;
  const folder = (label, links, open = false) => `<details${open ? ' open' : ''}><summary>${label}</summary><div class="nav-tree-links">${links}</div></details>`;

  const toggle = document.createElement('button');
  toggle.className = 'nav-toggle';
  toggle.type = 'button';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-controls', 'course-menu');
  toggle.innerHTML = '<span></span><span></span><span></span><b>Menu</b>';
  topbar.insertBefore(toggle, topbar.querySelector('.topnav'));

  const drawer = document.createElement('aside');
  drawer.id = 'course-menu';
  drawer.className = 'nav-drawer';
  drawer.setAttribute('aria-label', 'Course navigation');
  drawer.innerHTML = `<div class="nav-drawer-head"><div><span class="nav-drawer-kicker">COS341</span><strong>Course map</strong></div><button type="button" class="nav-close" aria-label="Close menu">×</button></div>
    <div class="nav-tree">
      ${folder('Course home', link('index.html', 'Course index'), true)}
      ${folder('Topic-Area 1 · Lexical Analysis', link('lexical-analysis/lex-index.html', 'Overview') + link('lexical-analysis/regex.html', 'Regular expressions') + link('lexical-analysis/nfa.html', 'NFAs') + link('lexical-analysis/dfa-subset.html', 'DFA subset construction') + link('lexical-analysis/minimization.html', 'DFA minimization') + link('lexical-analysis/lexers.html', 'Lexers') + link('lexical-analysis/lexing-walkthrough.html', 'Lexing walkthrough') + link('lexical-analysis/subset-construction-walkthrough.html', 'Subset walkthrough') + link('lexical-analysis/minimization-walkthrough.html', 'Minimization walkthrough'))}
      ${folder('Topic-Area 2 · Parsing', link('parsing/index.html', 'Overview') + link('parsing/ll1.html', 'LL(1) parsing') + link('parsing/slr.html', 'SLR parsing') + link('parsing/compare.html', 'LL(1) vs SLR') + link('parsing/ll1-walkthrough.html', 'LL(1) walkthrough') + link('parsing/slr-walkthrough.html', 'SLR walkthrough') + link('parsing/ll0.html', 'On LL(0)'))}
      ${folder('Applied Practice · Past Papers', link('past-papers/past-papers-index.html', 'Past-paper index') + link('past-papers/paper-2024-test1.html', '2024 Test 1') + link('past-papers/paper-2023-semester-test.html', '2023 Semester Test'))}
      ${folder('Completed Homework', link('homework/index.html', 'Homework index') + link('homework/homework-2.html', 'Homework 2 · SLR parsing') + link('homework/gotos-to-dfa-walkthrough.html', 'Homework 2 · GOTOs to DFA'))}
    </div>
    <button type="button" class="nav-view-all">View all course content</button>`;
  document.body.appendChild(drawer);
  const veil = document.createElement('div'); veil.className = 'nav-veil'; document.body.appendChild(veil);
  const close = () => { document.body.classList.remove('nav-open'); toggle.setAttribute('aria-expanded', 'false'); };
  const open = () => { document.body.classList.remove('nav-hidden'); document.body.classList.add('nav-open'); toggle.setAttribute('aria-expanded', 'true'); };
  toggle.addEventListener('click', () => document.body.classList.contains('nav-open') ? close() : open());
  drawer.querySelector('.nav-close').addEventListener('click', close); veil.addEventListener('click', close);
  drawer.querySelector('.nav-view-all').addEventListener('click', () => drawer.querySelectorAll('details').forEach(item => item.open = true));
  drawer.querySelectorAll('a').forEach(item => item.addEventListener('click', close));
  const pageY = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
  let previousY = pageY();
  const revealTopbar = () => {
    if (!document.body.classList.contains('nav-open')) document.body.classList.remove('nav-hidden');
  };
  const handleDirection = () => {
    const currentY = pageY();
    if (!document.body.classList.contains('nav-open')) {
      if (currentY <= 8 || currentY < previousY) revealTopbar();
      else if (currentY > previousY + 2) document.body.classList.add('nav-hidden');
    }
    previousY = currentY;
  };
  window.addEventListener('scroll', handleDirection, { passive: true });
  document.addEventListener('scroll', handleDirection, { passive: true, capture: true });
  if (window.visualViewport) window.visualViewport.addEventListener('scroll', handleDirection, { passive: true });
  window.addEventListener('wheel', event => {
    if (event.deltaY < 0) revealTopbar();
  }, { passive: true });
  let touchY = null;
  window.addEventListener('touchstart', event => { touchY = event.touches[0].clientY; }, { passive: true });
  window.addEventListener('touchmove', event => {
    const nextY = event.touches[0].clientY;
    if (touchY !== null && nextY > touchY) revealTopbar();
    touchY = nextY;
  }, { passive: true });
})();
