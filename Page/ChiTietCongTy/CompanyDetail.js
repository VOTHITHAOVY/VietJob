/* ═══════════════════════════════════════════════════════════════
   CompanyDetail.js
   Đọc dữ liệu công ty từ sessionStorage (set bởi Companies.js)
   hoặc fallback về URL param ?id=X rồi tìm trong COMPANIES array.
   Sau đó populate toàn bộ trang CompanyDetail.html.
   ═══════════════════════════════════════════════════════════════ */

/* ── 1. LẤY DỮ LIỆU CÔNG TY ─────────────────────────────────── */
function getCompanyData() {
    /* Ưu tiên 1: sessionStorage (nhanh, không cần re-parse) */
    const stored = sessionStorage.getItem('selectedCompany');
    if (stored) {
        try {
            const c = JSON.parse(stored);
            /* Xác nhận id khớp với URL param */
            const urlId = parseInt(new URLSearchParams(window.location.search).get('id'));
            if (!urlId || c.id === urlId) return c;
        } catch (e) { /* fall through */ }
    }

    /* Ưu tiên 2: tìm trong COMPANIES array qua URL param */
    const urlId = parseInt(new URLSearchParams(window.location.search).get('id'));
    if (urlId && typeof COMPANIES !== 'undefined') {
        return COMPANIES.find(c => c.id === urlId) || null;
    }

    return null;
}

/* ── 2. HELPERS ──────────────────────────────────────────────── */
function starsHTML(rating, size = 18) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        const icon = i <= Math.floor(rating)
            ? 'ti-star-filled'
            : (i - rating < 1 ? 'ti-star-half-filled' : 'ti-star');
        html += `<i class="ti ${icon}" style="font-size:${size}px;color:#F59E0B"></i>`;
    }
    return html;
}

function badgeLabel(badge) {
    const map = { hot: '🔥 Hot', new: '✨ New', top: '⭐ Top', urgent: '⚡ Gấp', ai: '✦ AI Match' };
    return map[badge] || '';
}

function badgeClass(badge) {
    const map = { hot: 'badge-hot', new: 'badge-new', top: 'badge-top', urgent: 'badge-urgent', ai: 'badge-ai' };
    return map[badge] || '';
}

function jobTypeLabel(type) {
    const map = { fulltime: 'Full-time', hybrid: 'Hybrid', remote: 'Remote' };
    return map[type] || type;
}

/* ── 3. POPULATE PAGE ────────────────────────────────────────── */
function populatePage(c) {
    /* ── TITLE & BREADCRUMB ── */
    document.title = `${c.name} | VietJob`;

    const bcCur = document.querySelector('.bc-cur');
    if (bcCur) bcCur.textContent = c.name;

    /* ── HERO ── */
    /* Logo */
    const heroLogo = document.querySelector('.hero-logo');
    if (heroLogo) {
        heroLogo.innerHTML = `<img src="${c.logo}" alt="${c.name}" style="width:56px;height:56px;object-fit:contain;border-radius:10px;"/>`;
    }

    /* Tên + tagline */
    const heroName = document.querySelector('.hero-company-name');
    if (heroName) heroName.textContent = c.name;

    const heroTagline = document.querySelector('.hero-company-tagline');
    if (heroTagline) heroTagline.textContent = `${c.type} · ${c.location}, Vietnam`;

    /* Stats chips */
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        heroStats.innerHTML = `
            <div class="stat-chip"><span class="mat-icon">groups</span> <strong>${c.size}</strong></div>
            <div class="stat-chip"><span class="mat-icon">business_center</span> ${c.sector}</div>
            <div class="stat-chip"><span class="mat-icon">language</span> <a href="https://${c.website}" target="_blank" style="color:var(--purple);font-weight:600">${c.website}</a></div>
            <div class="stat-chip"><span class="mat-icon">star</span> <strong style="color:var(--amber)">${c.rating}</strong>&nbsp;/ 5 &nbsp;<span style="color:var(--gray-400);font-size:12px">(${c.reviews.toLocaleString()} reviews)</span></div>
            <div class="stat-chip"><span class="mat-icon">work</span> <strong>${c.jobs}</strong>&nbsp;open positions</div>
            <div class="stat-chip"><span class="mat-icon">calendar_today</span> Founded <strong>${c.founded}</strong></div>
        `;
    }

    /* Badge trên jobs tab */
    const jobsTabBadge = document.querySelector('[data-tab="jobs"] span');
    if (jobsTabBadge) jobsTabBadge.textContent = c.jobs;

    /* Badge trên reviews tab */
    const reviewsTabBadge = document.querySelector('[data-tab="reviews"] span');
    if (reviewsTabBadge) reviewsTabBadge.textContent = c.reviews;

    /* ── SIDEBAR quick-info ── */
    populateSidebar(c);

    /* ── OVERVIEW TAB ── */
    populateOverview(c);

    /* ── JOBS TAB ── */
    populateJobs(c);

    /* ── REVIEWS TAB ── */
    populateReviews(c);

    /* ── SIMILAR COMPANIES ── */
    populateSimilar(c);

    /* ── CTA card ── */
    const ctaH4 = document.querySelector('.cta-s-card h4');
    if (ctaH4) ctaH4.textContent = `${c.jobs} Open Positions`;

    const ctaP = document.querySelector('.cta-s-card p');
    if (ctaP) ctaP.textContent = `Từ junior đến senior, ${c.name} đang mở rộng team. Tìm vị trí phù hợp với bạn.`;
}

/* ── SIDEBAR ── */
function populateSidebar(c) {
    const infoRows = document.querySelector('.info-rows');
    if (!infoRows) return;
    infoRows.innerHTML = `
        <div class="info-row">
            <div class="ir-icon"><span class="mat-icon">groups</span></div>
            <div><div class="ir-label">Quy mô</div><div class="ir-value">${c.size}</div></div>
        </div>
        <div class="info-row">
            <div class="ir-icon"><span class="mat-icon">business_center</span></div>
            <div><div class="ir-label">Lĩnh vực</div><div class="ir-value">${c.sector}</div></div>
        </div>
        <div class="info-row">
            <div class="ir-icon"><span class="mat-icon">location_on</span></div>
            <div><div class="ir-label">Địa chỉ</div><div class="ir-value">${c.location}</div></div>
        </div>
        <div class="info-row">
            <div class="ir-icon"><span class="mat-icon">calendar_today</span></div>
            <div><div class="ir-label">Thành lập</div><div class="ir-value">${c.founded}</div></div>
        </div>
        <div class="info-row">
            <div class="ir-icon"><span class="mat-icon">language</span></div>
            <div><div class="ir-label">Website</div><div class="ir-value"><a href="https://${c.website}" target="_blank" style="color:var(--purple);font-weight:600">${c.website}</a></div></div>
        </div>
        <div class="info-row">
            <div class="ir-icon"><span class="mat-icon">star</span></div>
            <div><div class="ir-label">Đánh giá</div><div class="ir-value" style="color:var(--amber);">★ ${c.rating} <span style="color:var(--gray-400);font-weight:400;font-size:12px;">(${c.reviews.toLocaleString()} reviews)</span></div></div>
        </div>
    `;

    /* Sidebar company name + tagline */
    const scName = document.querySelector('.s-card .ir-icon')?.closest('.s-card')?.querySelector('div[style*="font-size:14px"]');
    const sCardTitle = document.querySelectorAll('.s-card div')[2];
    /* Tìm đúng element tên công ty trong sidebar card */
    const sCardNameEl = document.querySelector('.s-card div[style*="font-weight:800"]');
    if (sCardNameEl) sCardNameEl.textContent = c.name;
    const sCardSubEl = document.querySelector('.s-card div[style*="font-size:12px"][style*="gray-500"]');
    if (sCardSubEl) sCardSubEl.textContent = `${c.type} · ${c.companyType}`;
}

/* ── OVERVIEW TAB ── */
function populateOverview(c) {
    /* About text */
    const aboutText = document.querySelector('.about-text');
    if (aboutText && c.about) {
        aboutText.innerHTML = c.about.map(p => `<p>${p}</p>`).join('');
    }

    /* Benefits */
    const benefitList = document.querySelector('.benefit-list');
    if (benefitList && c.benefits) {
        benefitList.innerHTML = c.benefits.map(b =>
            `<div class="benefit-row"><strong>${b.title}</strong> — ${b.desc}</div>`
        ).join('');
    }

    /* Culture tags */
    const cultureTags = document.querySelector('.culture-tags');
    if (cultureTags && c.cultureTags) {
        const colors = ['', 'green', 'green', 'amber', 'amber', '', '', 'green'];
        cultureTags.innerHTML = c.cultureTags.map((tag, i) =>
            `<span class="culture-tag ${colors[i % colors.length]}">${tag}</span>`
        ).join('');
    }

    /* Photos */
    const photoGrid = document.querySelector('.photo-grid');
    if (photoGrid && c.photos) {
        photoGrid.innerHTML = c.photos.map((src, i) =>
            `<img src="${src}" alt="${c.name} photo ${i + 1}" loading="lazy"/>`
        ).join('');
    }

    /* Card heading "About" */
    const firstCardHeading = document.querySelector('.card-heading');
    if (firstCardHeading) firstCardHeading.textContent = `Về ${c.name}`;
}

/* ── JOBS TAB ── */
function populateJobs(c) {
    const jobsList = document.getElementById('jobsList');
    if (!jobsList || !c.openJobs) return;

    /* Cập nhật jobs count trong filter bar */
    const jobsCount = document.querySelector('.jobs-count strong');
    if (jobsCount) jobsCount.textContent = c.openJobs.length;

    jobsList.innerHTML = c.openJobs.map((job, i) => `
        <div class="job-card-c fade-up ${i > 0 ? 'fu-' + i : ''}" data-type="${job.type}">
            <div class="jc-left">
                <div class="jc-title">${job.title}</div>
                <div class="jc-meta">
                    <span><span class="mat-icon">payments</span> ${job.salary}</span>
                    <span><span class="mat-icon">location_on</span> ${job.location}</span>
                    <span><span class="mat-icon">home_work</span> ${jobTypeLabel(job.type)}</span>
                    <span><span class="mat-icon">work_history</span> ${job.exp}</span>
                </div>
            </div>
            <div class="jc-right">
                <span class="jc-salary">${job.salary}</span>
                ${job.badge ? `<span class="jc-badge ${badgeClass(job.badge)}">${badgeLabel(job.badge)}</span>` : ''}
            </div>
        </div>
    `).join('');
}

/* ── REVIEWS TAB ── */
function populateReviews(c) {
    if (!c.employeeReviews) return;

    /* Rating overview score */
    const scoreEl = document.querySelector('.score');
    if (scoreEl) scoreEl.textContent = c.rating;

    const outOfEl = document.querySelector('.out-of');
    if (outOfEl) outOfEl.textContent = `out of 5 · ${c.reviews.toLocaleString()} reviews`;

    /* Rating stars in overview */
    const ratingStars = document.querySelector('.rating-stars');
    if (ratingStars) ratingStars.innerHTML = starsHTML(c.rating, 22);

    /* Rating bars — giữ nguyên (static) vì không có breakdown data */

    /* Review cards */
    const firstReview = document.querySelector('.review-card');
    if (!firstReview) return;

    /* Xoá hết review cũ */
    const reviewsContainer = firstReview.closest('.card');
    const allOldReviews = reviewsContainer ? reviewsContainer.querySelectorAll('.review-card') : [];
    allOldReviews.forEach(r => r.remove());

    /* Load more button tạm ẩn nếu ít reviews */
    const loadMoreWrap = reviewsContainer ? reviewsContainer.querySelector('#loadMoreReviews')?.parentElement : null;

    /* Insert new reviews */
    const insertTarget = reviewsContainer?.querySelector('.rating-overview');
    if (!insertTarget) return;

    const reviewsHTML = c.employeeReviews.map((rv, i) => `
        <div class="review-card ${i > 1 ? 'hidden' : ''}" ${i > 1 ? 'style="display:none"' : ''}>
            <div class="review-top">
                <div class="reviewer-info">
                    <div class="reviewer-avatar" style="background:${rv.color}">${rv.avatar}</div>
                    <div>
                        <div class="reviewer-name">${rv.name}</div>
                        <div class="reviewer-role">${rv.role}</div>
                    </div>
                </div>
                <div>
                    <div class="review-stars">${starsHTML(rv.rating, 16)}</div>
                </div>
            </div>
            <div class="review-text">${rv.text}</div>
            <div class="review-pros-cons">
                <div class="pros-box"><strong>👍 Pros</strong>${rv.pros}</div>
                <div class="cons-box"><strong>👎 Cons</strong>${rv.cons}</div>
            </div>
            <div class="review-date">Posted ${rv.date}</div>
        </div>
    `).join('');

    insertTarget.insertAdjacentHTML('afterend', reviewsHTML);

    /* Ẩn load more nếu ≤ 2 reviews */
    if (loadMoreWrap && c.employeeReviews.length <= 2) {
        loadMoreWrap.style.display = 'none';
    }
}

/* ── SIMILAR COMPANIES ── */
function populateSimilar(c) {
    const container = document.querySelector('.s-card:last-of-type .s-card-body');
    if (!container || typeof COMPANIES === 'undefined') return;

    /* Lấy 4 công ty cùng sector hoặc ngẫu nhiên, không trùng công ty hiện tại */
    const sectorMatch = COMPANIES.filter(co => co.id !== c.id && co.sector === c.sector);
    const others = COMPANIES.filter(co => co.id !== c.id && co.sector !== c.sector);
    const similar = [...sectorMatch, ...others].slice(0, 4);

    const colors = ['#EDE9FE', '#FEF3C7', '#DCFCE7', '#FEF2F2'];
    const textColors = ['#6D28D9', '#D97706', '#16A34A', '#EF4444'];

    const title = container.querySelector('.s-title');
    const existingItems = container.querySelectorAll('.related-company');
    existingItems.forEach(el => el.remove());

    similar.forEach((co, i) => {
        const initial = co.name.charAt(0).toUpperCase();
        const item = document.createElement('div');
        item.className = 'related-company';
        item.style.cursor = 'pointer';
        item.innerHTML = `
            <div class="rc-logo" style="background:${colors[i]};color:${textColors[i]}">${initial}</div>
            <div>
                <div class="rc-name">${co.name}</div>
                <div class="rc-jobs">${co.jobs} vị trí đang tuyển</div>
            </div>
            <span class="mat-icon rc-arrow">chevron_right</span>
        `;
        item.addEventListener('click', () => {
            sessionStorage.setItem('selectedCompany', JSON.stringify(co));
            window.location.href = `CompanyDetail.html?id=${co.id}`;
        });
        container.appendChild(item);
    });
}

/* ── 4. TAB SWITCHING ────────────────────────────────────────── */
function initTabs() {
    const tabBtns   = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panel = document.getElementById('tab-' + target);
            if (panel) {
                panel.classList.add('active');
                panel.querySelectorAll('.rbar-fill').forEach(bar => {
                    const w = bar.dataset.width;
                    bar.style.width = '0';
                    requestAnimationFrame(() => {
                        requestAnimationFrame(() => { bar.style.width = w; });
                    });
                });
            }
        });
    });
}

/* ── 5. JOB FILTER CHIPS ─────────────────────────────────────── */
function initJobFilters() {
    document.querySelector('#tab-jobs')?.addEventListener('click', e => {
        const chip = e.target.closest('.filter-chip[data-filter]');
        if (!chip) return;

        document.querySelectorAll('.filter-chip[data-filter]').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');

        const filter = chip.dataset.filter;
        let visible = 0;
        document.querySelectorAll('.job-card-c[data-type]').forEach(card => {
            const match = filter === 'all' || card.dataset.type === filter;
            card.style.display = match ? '' : 'none';
            if (match) visible++;
        });
        const countEl = document.querySelector('.jobs-count strong');
        if (countEl) countEl.textContent = visible;
    });
}

/* ── 6. FOLLOW BUTTON ────────────────────────────────────────── */
function initFollowBtn() {
    const btn = document.getElementById('followBtn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const following = btn.classList.toggle('active');
        btn.innerHTML = following
            ? '<span class="mat-icon" style="font-size:16px">bookmark_added</span> Đang theo dõi'
            : '<span class="mat-icon" style="font-size:16px">bookmark_border</span> Theo dõi';
    });
}

/* ── 7. RATING BARS ANIMATE ──────────────────────────────────── */
function initRatingBars() {
    document.querySelectorAll('.rbar-fill').forEach(bar => {
        const w = bar.dataset.width;
        bar.style.width = '0';
        setTimeout(() => { bar.style.width = w; }, 300);
    });
}

/* ── 8. LOAD MORE REVIEWS ────────────────────────────────────── */
function initLoadMore() {
    const btn = document.getElementById('loadMoreReviews');
    if (!btn) return;
    btn.addEventListener('click', () => {
        document.querySelectorAll('.review-card.hidden').forEach(c => {
            c.classList.remove('hidden');
            c.style.display = '';
        });
        btn.style.display = 'none';
    });
}

/* ── 9. PHOTO LIGHTBOX ───────────────────────────────────────── */
function initPhotos() {
    document.querySelectorAll('.photo-grid img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => {
            const overlay = document.createElement('div');
            overlay.style.cssText = `
                position:fixed;inset:0;background:rgba(0,0,0,.85);
                display:flex;align-items:center;justify-content:center;
                z-index:9999;cursor:zoom-out;`;
            const bigImg = document.createElement('img');
            bigImg.src = img.src;
            bigImg.style.cssText = 'max-width:90vw;max-height:85vh;border-radius:10px;box-shadow:0 20px 60px rgba(0,0,0,.5);';
            overlay.appendChild(bigImg);
            overlay.addEventListener('click', () => overlay.remove());
            document.body.appendChild(overlay);
        });
    });
}

/* ── 10. BACK BUTTON (nếu có) ────────────────────────────────── */
function initBackBtn() {
    document.querySelectorAll('[data-action="back"], .back-btn').forEach(btn => {
        btn.addEventListener('click', () => history.back());
    });
}

/* ── 11. VIEW JOBS BUTTON ────────────────────────────────────── */
function initViewJobsBtn() {
    const btn = document.querySelector('.btn-apply-hero');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const jobsTab = document.querySelector('[data-tab="jobs"]');
        if (jobsTab) jobsTab.click();
        document.querySelector('.company-tabs')?.scrollIntoView({ behavior: 'smooth' });
    });
}

/* ── 12. CTA BROWSE JOBS BUTTON ─────────────────────────────── */
function initCtaBtn() {
    const btn = document.querySelector('.cta-s-btn');
    if (!btn) return;
    btn.addEventListener('click', () => {
        const jobsTab = document.querySelector('[data-tab="jobs"]');
        if (jobsTab) jobsTab.click();
        document.querySelector('.company-tabs')?.scrollIntoView({ behavior: 'smooth' });
    });
}

/* ═══════════════════════════════════════════════════════════════
   INIT — chạy khi DOM sẵn sàng
   ═══════════════════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
    /* Lấy data và populate trước, sau đó init interactions */
    const company = getCompanyData();

    if (company) {
        populatePage(company);
    } else {
        /* Fallback: không tìm thấy công ty — hiển thị thông báo */
        const heroName = document.querySelector('.hero-company-name');
        if (heroName) heroName.textContent = 'Công ty không tồn tại';
        document.title = 'Không tìm thấy | VietJob';
        console.warn('[CompanyDetail] Không tìm thấy dữ liệu công ty. Kiểm tra sessionStorage hoặc URL param ?id=');
    }

    /* Init interactions */
    initTabs();
    initJobFilters();
    initFollowBtn();
    initRatingBars();
    initLoadMore();
    initPhotos();
    initBackBtn();
    initViewJobsBtn();
    initCtaBtn();
});