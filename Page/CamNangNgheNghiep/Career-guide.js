/* ================================================================
   script.js — Career Guide Page
================================================================ */

/* ── Back to top ───────────────────────────────────────────────── */
window.addEventListener('scroll', () => {
  const btn = document.getElementById('back-top');
  if (btn) btn.classList.toggle('show', window.scrollY > 400);
}, { passive: true });

document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Hero tabs ─────────────────────────────────────────────────── */
document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', function () {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    this.classList.add('active');
  });
});

/* ── Scroll reveal ─────────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.topic-card, .feat-main, .feat-card, .article-card, .tool-card, .testi-card, .ai-card, .section-head'
);
revealEls.forEach((el, i) => {
  el.classList.add('fade-in');
  el.style.transitionDelay = `${(i % 4) * 0.08}s`;
});
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

/* ── Score ring animation ──────────────────────────────────────── */
const scoreArc = document.querySelector('.score-arc');
if (scoreArc) {
  const scoreObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      const score = 75;
      const circumference = 2 * Math.PI * 40;
      scoreArc.style.strokeDasharray = circumference;
      scoreArc.style.strokeDashoffset = circumference * (1 - score / 100);
      scoreObserver.disconnect();
    }
  }, { threshold: 0.3 });
  scoreObserver.observe(document.querySelector('.tool-score-ring'));
}

/* ── Load more articles ────────────────────────────────────────── */
const moreArticles = [
  {
    img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=500&q=80',
    cat: 'Kỹ năng mềm',
    title: 'Nghệ thuật lắng nghe chủ động: Chìa khóa thành công trong giao tiếp',
    desc: 'Hầu hết chúng ta nghe nhưng không thực sự lắng nghe. Đây là cách thay đổi điều đó.',
    avatar: 'https://i.pravatar.cc/28?img=60', author: 'Lê Văn Bình', views: '1.2K', likes: '54',
  },
  {
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80',
    cat: 'Công nghệ',
    title: 'Top 10 kỹ năng IT được săn đón nhất năm 2026',
    desc: 'AI, Cloud, và Cybersecurity đang thay đổi thị trường tuyển dụng IT theo cách bạn chưa ngờ tới.',
    avatar: 'https://i.pravatar.cc/28?img=15', author: 'Trần Quang Huy', views: '4.7K', likes: '203',
  },
  {
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&q=80',
    cat: 'Freelance',
    title: 'Freelance vs Full-time: Cái nào phù hợp với bạn hơn năm 2026?',
    desc: 'Phân tích thực tế về thu nhập, sự linh hoạt và sự nghiệp khi chọn hai con đường khác nhau này.',
    avatar: 'https://i.pravatar.cc/28?img=22', author: 'Nguyễn Hà Phương', views: '2.9K', likes: '88',
  },
];

let loaded = false;
const loadMoreBtn = document.getElementById('load-more');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', function () {
    if (loaded) return;
    loaded = true;
    this.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="spin"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg> Đang tải...`;
    this.disabled = true;

    setTimeout(() => {
      const grid = document.getElementById('articles-grid');
      moreArticles.forEach((a, i) => {
        const card = document.createElement('article');
        card.className = 'article-card fade-in';
        card.style.transitionDelay = `${i * 0.1}s`;
        card.innerHTML = `
          <div class="article-img">
            <img src="${a.img}" alt="" loading="lazy"/>
            <span class="article-cat">${a.cat}</span>
          </div>
          <div class="article-body">
            <h3>${a.title}</h3>
            <p>${a.desc}</p>
            <div class="article-footer">
              <div class="article-author">
                <img src="${a.avatar}" alt="" />
                <span>${a.author}</span>
              </div>
              <div class="article-stats">
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg> ${a.views}</span>
                <span><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg> ${a.likes}</span>
              </div>
            </div>
          </div>`;
        grid.appendChild(card);
        requestAnimationFrame(() => requestAnimationFrame(() => card.classList.add('visible')));
      });
      this.style.display = 'none';
    }, 800);
  });
}

/* ── CTA email validation ──────────────────────────────────────── */
const ctaBtn = document.querySelector('.btn-cta');
if (ctaBtn) {
  ctaBtn.addEventListener('click', function () {
    const input = document.querySelector('.cta-form input');
    const email = input.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      input.style.outline = '2px solid #F43F5E';
      input.focus();
      setTimeout(() => { input.style.outline = ''; }, 2000);
      return;
    }
    this.textContent = '✓ Đã đăng ký!';
    this.style.background = 'linear-gradient(135deg, #10B981, #059669)';
    this.style.color = '#fff';
    input.value = '';
    setTimeout(() => {
      this.innerHTML = 'Đăng ký miễn phí <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      this.style.background = '';
      this.style.color = '';
    }, 3000);
  });
}