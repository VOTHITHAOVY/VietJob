/* ================================================================
   ArticleDetail.js — JobsGO Career Handbook Article Detail
   ĐÃ SỬA: tất cả selector khớp đúng với class trong HTML/CSS
================================================================ */

/* ── Reading Progress Bar ── */
const progressBar = document.getElementById('reading-progress');
function updateProgress() {
  const article = document.querySelector('.ad-article'); /* ✅ sửa: '.ad-article' */
  if (!article || !progressBar) return;
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  progressBar.style.width = Math.min(pct, 100) + '%';
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ── Back to Top ── */
const backTop = document.getElementById('back-top');
window.addEventListener('scroll', () => {
  if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
}, { passive: true });
if (backTop) {
  backTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Active TOC Highlight ── */
const tocLinks = document.querySelectorAll('.ad-toc-list a'); /* ✅ sửa: '.ad-toc-list a' */
const sections = Array.from(tocLinks).map(link => {
  const id = link.getAttribute('href').slice(1);
  return document.getElementById(id);
}).filter(Boolean);

const tocObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const link = document.querySelector(`.ad-toc-list a[href="#${id}"]`); /* ✅ sửa */
    if (link) link.classList.toggle('active', entry.isIntersecting);
  });
}, { rootMargin: '-20% 0% -70% 0%', threshold: 0 });
sections.forEach(s => tocObserver.observe(s));

/* ── Scroll Reveal (fade-up) ── */
const revealEls = document.querySelectorAll('.fade-up'); /* ✅ sửa: '.fade-up' (khớp CSS) */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

/* ── Vote Buttons ── */
document.querySelectorAll('.ad-vote-btn').forEach(btn => { /* ✅ sửa: '.ad-vote-btn' */
  btn.addEventListener('click', function () {
    document.querySelectorAll('.ad-vote-btn').forEach(b => b.classList.remove('active')); /* ✅ sửa */
    this.classList.add('active');
    if (this.dataset.vote === 'up') {
      const countEl = this.querySelector('.ad-vote-count'); /* ✅ sửa: '.ad-vote-count' */
      if (countEl) countEl.textContent = parseInt(countEl.textContent || '0') + 1;
    }
  });
});

/* ── Share Buttons ── */
const articleUrl = encodeURIComponent(window.location.href);
const articleTitle = encodeURIComponent(document.querySelector('.ad-title')?.textContent || ''); /* ✅ sửa: '.ad-title' */

document.querySelectorAll('[data-share]').forEach(btn => {
  btn.addEventListener('click', function () {
    const platform = this.dataset.share;
    let url = '';
    if (platform === 'facebook') url = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;
    if (platform === 'linkedin') url = `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`;
    if (platform === 'twitter') url = `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`;
    if (platform === 'copy') {
      navigator.clipboard.writeText(window.location.href).then(() => {
        const orig = btn.innerHTML;
        btn.innerHTML = '<i class="ti ti-check"></i>';
        setTimeout(() => { btn.innerHTML = orig; }, 2000);
      });
      return;
    }
    if (url) window.open(url, '_blank', 'width=600,height=400');
  });
});

/* ── Comment Form ── */
const commentForm = document.getElementById('comment-form');
const commentList = document.getElementById('comment-list');
if (commentForm) {
  commentForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const textarea = this.querySelector('textarea');
    const text = textarea.value.trim();
    if (!text) {
      textarea.style.borderColor = '#ba1a1a';
      setTimeout(() => { textarea.style.borderColor = ''; }, 2000);
      return;
    }
    const now = new Date();
    const dateStr = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const item = document.createElement('div');
    item.className = 'ad-comment-item fade-up'; /* ✅ sửa: class đúng */
    item.innerHTML = `
      <img src="https://i.pravatar.cc/36?img=99" alt="You" class="ad-comment-avatar-img" />
      <div>
        <p class="ad-comment-name">Bạn</p>
        <p class="ad-comment-text">${text}</p>
        <p class="ad-comment-date">${dateStr}</p>
      </div>`;
    commentList.prepend(item);
    /* Trigger fade-up animation */
    requestAnimationFrame(() => requestAnimationFrame(() => item.classList.add('visible')));
    textarea.value = '';
    const btn = commentForm.querySelector('.ad-btn-submit'); /* ✅ sửa: '.ad-btn-submit' */
    if (btn) {
      const orig = btn.textContent;
      btn.textContent = '✓ Đã gửi!';
      setTimeout(() => { btn.textContent = orig; }, 2000);
    }
  });
}