const body=document.body;
const menu=document.querySelector('.aperture-toggle');
const nav=document.querySelector('.aperture-nav');
function setMenu(open){body.classList.toggle('menu-open',open);menu?.setAttribute('aria-expanded',String(open));nav?.setAttribute('aria-hidden',String(!open))}
menu?.addEventListener('click',()=>setMenu(!body.classList.contains('menu-open')));
nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>setMenu(false)));
addEventListener('keydown',event=>{if(event.key==='Escape')setMenu(false)});

const clock=document.querySelector('[data-site-time]');
function paintTime(){if(!clock)return;clock.textContent=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/London',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())}
paintTime();setInterval(paintTime,1000);

const reduceMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
body.classList.add('motion-ready');
const targets=[...document.querySelectorAll('main > section,.long-article > section')];
targets.forEach(target=>target.classList.add('motion-section'));
if(!reduceMotion&&'IntersectionObserver'in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');observer.unobserve(entry.target)}}),{threshold:.07,rootMargin:'0px 0px -4%'});targets.forEach(target=>observer.observe(target))}else targets.forEach(target=>target.classList.add('in-view'));

const calibers={
 manual:{ref:'CPL / M-01',title:'Manual wind',rate:'Daily engagement',copy:'Direct winding keeps the relationship between stored energy and daily routine visible. Case profiles can remain comparatively lean.',use:'Winding feel',check:'Crown and reserve'},
 automatic:{ref:'CPL / A-02',title:'Automatic',rate:'Motion-assisted winding',copy:'A rotor replenishes energy through wear, while reserve and winding efficiency still depend on movement design and activity.',use:'Wearing pattern',check:'Rotor, reserve, crown'},
 chrono:{ref:'CPL / C-03',title:'Chronograph',rate:'Elapsed-time control',copy:'Additional levers, wheels and controls support timing intervals while increasing mechanical and visual complexity.',use:'Timing sequence',check:'Pushers and reset'},
 gmt:{ref:'CPL / G-04',title:'GMT',rate:'Second time reference',copy:'A 24-hour indication separates reference time from local time; setting behaviour differs between movement architectures.',use:'Travel routine',check:'Hand adjustment'}
};
const display=document.querySelector('[data-caliber-display]');
document.querySelectorAll('[data-caliber]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-caliber]').forEach(item=>item.classList.remove('active'));button.classList.add('active');const key=button.dataset.caliber,data=calibers[key];if(!display)return;display.dataset.caliberDisplay=key;const map={'[data-caliber-ref]':data.ref,'[data-caliber-title]':data.title,'[data-caliber-rate]':data.rate,'[data-caliber-copy]':data.copy,'[data-caliber-use]':data.use,'[data-caliber-check]':data.check};Object.entries(map).forEach(([selector,value])=>{const node=document.querySelector(selector);if(node)node.textContent=value})}));

const range=document.querySelector('[data-rate-range]');
range?.addEventListener('input',()=>{const value=Number(range.value),sign=value>=0?'+':'−',absolute=String(Math.abs(value)).padStart(2,'0');const output=document.querySelector('[data-rate-output]'),signNode=document.querySelector('[data-rate-sign]'),number=document.querySelector('[data-rate-number]');if(output)output.textContent=`${sign}${Math.abs(value)} s/day`;if(signNode)signNode.textContent=sign;if(number)number.textContent=absolute;document.querySelectorAll('[data-week-track] i').forEach((bar,index)=>{const drift=Math.max(12,50+value*2+Math.sin(index*1.3)*10);bar.style.setProperty('--h',`${Math.min(92,drift)}%`)})});

const profiles={
 daily:{mm:'39',title:'Balanced case and clear dial',copy:'Review lug-to-lug length, thickness, crown clearance and bracelet adjustment alongside diameter.'},
 travel:{mm:'40',title:'Reference time without crowding',copy:'Prioritise legible local and home-time displays, easy setting and comfort across long wear intervals.'},
 formal:{mm:'37',title:'Low profile and restrained contrast',copy:'Consider cuff clearance, total thickness, lug curvature and whether finishing stays quiet in softer light.'},
 active:{mm:'41',title:'Secure fit and protected controls',copy:'Review clasp adjustment, crown position, impact exposure and the manufacturer’s current resistance guidance.'}
};
document.querySelectorAll('[data-profile]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-profile]').forEach(item=>item.classList.remove('active'));button.classList.add('active');const data=profiles[button.dataset.profile];document.querySelector('[data-profile-mm]').textContent=data.mm;document.querySelector('[data-profile-title]').textContent=data.title;document.querySelector('[data-profile-copy]').textContent=data.copy}));

document.querySelectorAll('[data-filter]').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('[data-filter]').forEach(item=>item.classList.remove('active'));button.classList.add('active');document.querySelectorAll('.collection-grid article').forEach(card=>{const visible=button.dataset.filter==='all'||card.dataset.cat===button.dataset.filter;card.classList.toggle('hide',!visible);card.classList.remove('filter-pop');if(visible)requestAnimationFrame(()=>card.classList.add('filter-pop'))})}));

document.querySelector('.contact-copy form')?.addEventListener('submit',event=>{event.preventDefault();const status=event.currentTarget.querySelector('.form-status');if(status)status.textContent='Your message is prepared. Chrono Prime Line will reply by email.';event.currentTarget.reset()});

const consent=document.querySelector('.consent');if(localStorage.getItem('cpl-consent'))consent?.classList.add('hidden');
document.querySelectorAll('[data-consent]').forEach(button=>button.addEventListener('click',()=>{const analytics=button.dataset.consent==='accept'?'granted':'denied';if(typeof gtag==='function')gtag('consent','update',{analytics_storage:analytics,ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied'});localStorage.setItem('cpl-consent',analytics);consent?.classList.add('hidden')}));
