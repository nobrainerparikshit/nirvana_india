document.documentElement.classList.add('js');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const motionButton = document.querySelector('#motion-toggle');
let paused = reducedMotion.matches;
function updateMotion(){document.documentElement.classList.toggle('motion-paused',paused);if(motionButton){motionButton.setAttribute('aria-pressed',String(paused));motionButton.textContent=paused?'RESUME MOTION ▶':'PAUSE MOTION Ⅱ';}}
updateMotion();
motionButton?.addEventListener('click',()=>{paused=!paused;updateMotion();});
reducedMotion.addEventListener('change',event=>{paused=event.matches;updateMotion();});
const menuButton=document.querySelector('.menu-toggle');
const nav=document.querySelector('#navigation');
function closeMenu(){nav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','Open navigation');menuButton.textContent='☰';}
menuButton.addEventListener('click',()=>{const open=nav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));menuButton.setAttribute('aria-label',open?'Close navigation':'Open navigation');menuButton.textContent=open?'×':'☰';});
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menuButton.focus();}});
const reveals=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');reveals.unobserve(entry.target);}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(element=>reveals.observe(element));
const counts=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;counts.unobserve(entry.target);const goal=Number(entry.target.dataset.count);if(paused)return;let start;function tick(now){start??=now;const progress=Math.min((now-start)/1200,1);entry.target.textContent=Math.round(goal*(1-Math.pow(1-progress,3)));if(progress<1)requestAnimationFrame(tick);}requestAnimationFrame(tick);}),{threshold:.8});
document.querySelectorAll('[data-count]').forEach(element=>counts.observe(element));
const panels=[...document.querySelectorAll('details')];
panels.forEach((panel,index)=>panel.addEventListener('toggle',()=>{if(!panel.open)return;panels.forEach(other=>{if(other!==panel)other.open=false;});document.querySelector('#program-glyph').textContent=panel.dataset.glyph;document.querySelector('#program-caption').textContent=panel.dataset.caption;document.querySelector('#program-number').textContent=String(index+1).padStart(2,'0');}));
let scheduled=false;
function updateScroll(){const height=document.documentElement.scrollHeight-innerHeight;document.querySelector('.progress').style.width=(height>0?scrollY/height*100:0)+'%';scheduled=false;}
addEventListener('scroll',()=>{if(!scheduled){requestAnimationFrame(updateScroll);scheduled=true;}},{passive:true});
addEventListener('resize',updateScroll);updateScroll();
