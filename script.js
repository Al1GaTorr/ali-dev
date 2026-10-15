const clients = [{"name":"MAG-QOLDAU01","url":"https://magqoldau01.kz","img":"assets/client-01.jpg","desc":"Regulatory consulting — agro & industrial product market entry in Kazakhstan and EAEU.","tags":["Landing","RU/EN","Consulting"]},{"name":"Tanu AI Test","url":"https://tanu-aida.vercel.app","img":"assets/client-02.jpg","desc":"Personality strength test — Gallup & MBTI style with AI-powered personal breakdown.","tags":["Landing","AI Product"]},{"name":"Tazau.kz","url":"https://tazau.kz","img":"assets/client-03.jpg","desc":"Water treatment company. Design, construction and maintenance of purification systems.","tags":["Corporate","CMS"]},{"name":"TOOMAG","url":"https://toomag.kz","img":"assets/client-04.jpg","desc":"Animal feed additives for cattle. Product catalog with dosage info.","tags":["Landing","Agro"]},{"name":"ARCMET","url":"https://arcmet.kz","img":"assets/client-05.jpg","desc":"Construction materials & insulation. Direct distributor from CIS and European factories.","tags":["Corporate","B2B"]},{"name":"Zhanibekov School","url":"https://zhanibekovschool.kz","img":"assets/client-06.jpg","desc":"Full school website in Kazakh — news, schedule, teacher profiles, photo gallery.","tags":["Education","Kazakh"]},{"name":"AlatauFlex","url":"https://alatauflex.kz","img":"assets/client-07.jpg","desc":"Technical insulation manufacturer. Product catalogue, certificates, cart & order form.","tags":["Manufacturing","KZ"]},{"name":"Expert Stroy","url":"https://expert-stroy-konsalting.vercel.app","img":"assets/client-08.jpg","desc":"Engineering consulting — building inspection, technical supervision.","tags":["Construction","RU/EN"]},{"name":"Mediki Astana","url":"https://medikiastana.kz","img":"assets/client-mediki.jpg","desc":"Home nursing and medical visits in Astana, available around the clock.","tags":["Medical","RU/KZ"]},{"name":"MamaTest.kz","url":"https://mamatest.kz","img":"assets/client-09-v2.png","desc":"A bilingual, 10-question quiz for expectant mothers in Kazakh and Russian.","tags":["Quiz","RU/KZ"]},{"name":"SteppeSoul","url":"https://steppesoul.kz","img":"assets/client-10.jpg","desc":"DMC for Kazakhstan — MICE events, unique tours, concierge. EN/RU bilingual.","tags":["Tourism","DMC"]}];
const rail = document.querySelector('#client-rail');
const galleryCurrent = document.querySelector('#gallery-current');
const previousButton = document.querySelector('#gallery-prev');
const nextButton = document.querySelector('#gallery-next');

clients.forEach((client, index) => {
  const card = document.createElement('a');
  card.className = 'client-card';
  card.href = client.url;
  card.target = '_blank';
  card.rel = 'noopener noreferrer';
  const imageBox = document.createElement('div');
  imageBox.className = 'client-image';
  const image = document.createElement('img');
  image.src = client.img;
  image.alt = `${client.name} website screenshot`;
  image.loading = 'lazy';
  const number = document.createElement('span');
  number.textContent = String(index + 1).padStart(2, '0');
  imageBox.append(image, number);
  const detail = document.createElement('div');
  detail.className = 'client-detail';
  const words = document.createElement('div');
  const name = document.createElement('h3');
  name.textContent = client.name;
  const description = document.createElement('p');
  description.textContent = client.desc;
  words.append(name, description);
  const arrow = document.createElement('b');
  arrow.setAttribute('aria-hidden', 'true');
  arrow.textContent = '↗';
  detail.append(words, arrow);
  card.append(imageBox, detail);
  rail.append(card);
});

function galleryStep() {
  const firstCard = rail.querySelector('.client-card');
  return firstCard ? firstCard.getBoundingClientRect().width + 18 : 1;
}
function updateGallery() {
  const current = Math.min(clients.length, Math.round(rail.scrollLeft / galleryStep()) + 1);
  galleryCurrent.textContent = String(current).padStart(2, '0');
  previousButton.disabled = rail.scrollLeft < 5;
  nextButton.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 5;
}
previousButton.addEventListener('click', () => rail.scrollBy({left: -galleryStep(), behavior: 'smooth'}));
nextButton.addEventListener('click', () => rail.scrollBy({left: galleryStep(), behavior: 'smooth'}));
rail.addEventListener('scroll', updateGallery, {passive: true});
rail.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
    event.preventDefault();
    rail.scrollBy({left: (event.key === 'ArrowRight' ? 1 : -1) * galleryStep(), behavior: 'smooth'});
  }
});
window.addEventListener('resize', updateGallery);
updateGallery();

const menuToggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeMenu() {
  mobileNav.hidden = true;
  menuToggle.setAttribute('aria-expanded', 'false');
  menuToggle.setAttribute('aria-label', 'Open menu');
}
menuToggle.addEventListener('click', () => {
  const opening = mobileNav.hidden;
  mobileNav.hidden = !opening;
  menuToggle.setAttribute('aria-expanded', String(opening));
  menuToggle.setAttribute('aria-label', opening ? 'Close menu' : 'Open menu');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });

const progressBar = document.querySelector('#progress-bar');
let progressScheduled = false;
function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = `${scrollable > 0 ? window.scrollY / scrollable * 100 : 0}%`;
  progressScheduled = false;
}
window.addEventListener('scroll', () => {
  if (!progressScheduled) {
    progressScheduled = true;
    requestAnimationFrame(updateProgress);
  }
}, {passive: true});
window.addEventListener('resize', updateProgress);
updateProgress();

document.querySelector('#year').textContent = new Date().getFullYear();
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reducedMotion) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold: 0.08});
  document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach(element => element.classList.add('is-visible'));
}
