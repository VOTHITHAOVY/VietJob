const COMPANIES = [
    {
        id: 1,
        name: 'TechCorp Solution',
        type: 'Outsourcing',
        sector: 'IT – Phần mềm',
        logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124996.png',
        rating: 4.8,
        reviews: 120,
        location: 'Quận 1, TP. HCM',
        size: '150–200 nhân sự',
        companyType: 'Nước ngoài',
        tags: ['ReactJS', 'Node.JS', 'AWS'],
        badge: 'top',
        jobs: 42,
        founded: '2015',
        posted: '1 ngày trước'
    },
    {
        id: 2,
        name: 'Vingroup JSC',
        type: 'Tập đoàn lớn',
        sector: 'Đa ngành nghề',
        logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        rating: 4.5,
        reviews: 2450,
        location: 'Long Biên, Hà Nội',
        size: '10,000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['Management', 'Sales', 'E-Commerce'],
        badge: 'top',
        jobs: 128,
        founded: '1993',
        posted: '2 ngày trước'
    },
    {
        id: 3,
        name: 'Grab Vietnam',
        type: 'MNC / Singapore',
        sector: 'Dịch vụ vận tải',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111628.png',
        rating: 4.9,
        reviews: 890,
        location: 'Quận 7, TP. HCM',
        size: '500–1000 nhân sự',
        companyType: 'MNC',
        tags: ['Product', 'Go-Lang', 'Swift'],
        badge: 'top',
        jobs: 15,
        founded: '2012',
        posted: 'Hôm nay'
    },
    {
        id: 4,
        name: 'Sapo Technology',
        type: 'Sản phẩm công nghệ',
        sector: 'E-commerce / Retail',
        logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
        rating: 4.2,
        reviews: 312,
        location: 'Thanh Xuân, Hà Nội',
        size: '200–500 nhân sự',
        companyType: 'Trong nước',
        tags: ['PHP', 'Vue.JS', 'Laravel'],
        badge: null,
        jobs: 28,
        founded: '2008',
        posted: '3 ngày trước'
    },
    {
        id: 5,
        name: 'FPT Software',
        type: 'Outsourcing',
        sector: 'IT – Phần mềm',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png',
        rating: 4.3,
        reviews: 1800,
        location: 'Cầu Giấy, Hà Nội',
        size: '5000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['Java', 'ReactJS', '.NET'],
        badge: null,
        jobs: 87,
        founded: '1999',
        posted: '1 tuần trước'
    },
    {
        id: 6,
        name: 'MoMo E-Wallet',
        type: 'Fintech',
        sector: 'Tài chính / Ngân hàng',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
        rating: 4.6,
        reviews: 650,
        location: 'Quận 1, TP. HCM',
        size: '1000+ nhân sự',
        companyType: 'Startup',
        tags: ['ReactJS', 'Figma', 'Python'],
        badge: 'hot',
        jobs: 33,
        founded: '2010',
        posted: 'Hôm nay'
    },
    {
        id: 7,
        name: 'Shopee Vietnam',
        type: 'E-commerce',
        sector: 'Bán lẻ / FMCG',
        logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124966.png',
        rating: 4.1,
        reviews: 3200,
        location: 'Quận 4, TP. HCM',
        size: '5000+ nhân sự',
        companyType: 'MNC',
        tags: ['NodeJS', 'React', 'AWS'],
        badge: 'top',
        jobs: 64,
        founded: '2015',
        posted: '2 ngày trước'
    },
    {
        id: 8,
        name: 'Tiki Corporation',
        type: 'E-commerce',
        sector: 'Bán lẻ / FMCG',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
        rating: 4.0,
        reviews: 980,
        location: 'Quận 3, TP. HCM',
        size: '1000+ nhân sự',
        companyType: 'Startup',
        tags: ['React Native', 'TypeScript', 'Redux'],
        badge: 'new',
        jobs: 21,
        founded: '2010',
        posted: '5 ngày trước'
    },
    {
        id: 9,
        name: 'VNG Corporation',
        type: 'Công nghệ / Gaming',
        sector: 'Gaming / IT',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png',
        rating: 4.4,
        reviews: 1540,
        location: 'Quận 10, TP. HCM',
        size: '1000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['Golang', 'Flutter', 'Kafka'],
        badge: null,
        jobs: 55,
        founded: '2004',
        posted: '3 ngày trước'
    },
    {
        id: 10,
        name: 'KMS Technology',
        type: 'Outsourcing / SaaS',
        sector: 'IT – Phần mềm',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732228.png',
        rating: 4.7,
        reviews: 430,
        location: 'Tân Bình, TP. HCM',
        size: '200–500 nhân sự',
        companyType: 'Nước ngoài',
        tags: ['Angular', 'NodeJS', 'QA'],
        badge: null,
        jobs: 19,
        founded: '2009',
        posted: '4 ngày trước'
    },
    {
        id: 11,
        name: 'VPBank Digital',
        type: 'Ngân hàng số',
        sector: 'Tài chính / Ngân hàng',
        logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        rating: 4.3,
        reviews: 760,
        location: 'Ba Đình, Hà Nội',
        size: '1000+ nhân sự',
        companyType: 'Trong nước',
        tags: ['ReactJS', 'Java', 'Agile'],
        badge: 'urgent',
        jobs: 39,
        founded: '1993',
        posted: 'Hôm nay'
    },
    {
        id: 12,
        name: 'Garena Vietnam',
        type: 'Gaming / Entertainment',
        sector: 'Gaming',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png',
        rating: 4.2,
        reviews: 590,
        location: 'Quận 1, TP. HCM',
        size: '500–1000 nhân sự',
        companyType: 'MNC',
        tags: ['JavaScript', 'WebGL', 'Three.js'],
        badge: 'hot',
        jobs: 12,
        founded: '2009',
        posted: 'Hôm nay'
    },
];

/* ── STATE ── */
const PER_PAGE = 8;
let currentPage = 1;
let currentCompanies = [...COMPANIES];

/* ── HELPERS ── */
function starsHTML(rating) {
    let html = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(rating)) {
            html += '<i class="ti ti-star-filled"></i>';
        } else if (i - rating < 1) {
            html += '<i class="ti ti-star-half-filled"></i>';
        } else {
            html += '<i class="ti ti-star"></i>';
        }
    }
    return html;
}

function badgesHTML(company) {
    let b = '';
    if (company.badge === 'top')    b += '<span class="badge badge-top">⭐ TOP NTD</span>';
    if (company.badge === 'hot')    b += '<span class="badge badge-hot">🔥 HOT</span>';
    if (company.badge === 'new')    b += '<span class="badge badge-new">✨ Mới</span>';
    if (company.badge === 'urgent') b += '<span class="badge badge-urgent">⚡ Gấp</span>';
    return b;
}

function cardClass(company) {
    const map = { top: 'is-top', hot: 'is-hot', new: 'is-new', urgent: 'is-urgent' };
    return map[company.badge] || '';
}

/* ── RENDER ── */
function renderCompanies() {
    const grid = document.getElementById('companiesGrid');
    const start = (currentPage - 1) * PER_PAGE;
    const slice = currentCompanies.slice(start, start + PER_PAGE);

    grid.innerHTML = slice.map(c => `
    <div class="company-card ${cardClass(c)}" onclick="openCompany(${c.id})">

      <div class="card-strip">
        <div class="card-badges">${badgesHTML(c)}</div>
        <span style="font-size:10px;color:var(--gray-400)">${c.posted}</span>
      </div>

      <div class="card-main">
        <div class="company-logo">
          <img src="${c.logo}" alt="${c.name}" loading="lazy"/>
        </div>
        <div class="card-info">
          <div class="company-name">${c.name}</div>
          <div class="company-type">${c.type} · ${c.sector}</div>
          <div class="company-rating">
            <span class="rating-val">${c.rating}</span>
            <div class="stars">${starsHTML(c.rating)}</div>
            <span class="review-count">(${c.reviews.toLocaleString()} đánh giá)</span>
          </div>
        </div>
      </div>

      <div class="card-meta">
        <div class="meta-item"><i class="ti ti-map-pin"></i><span>${c.location}</span></div>
        <div class="meta-item"><i class="ti ti-users"></i><span>${c.size}</span></div>
        <div class="meta-item"><i class="ti ti-building"></i><span>${c.companyType}</span></div>
        <div class="meta-item"><i class="ti ti-calendar"></i><span>Từ năm ${c.founded}</span></div>
      </div>

      <div class="card-divider"></div>

      <div class="card-tags">
        ${c.tags.map((t, i) => `<span class="card-tag ${i === 0 ? 'hl' : ''}">${t}</span>`).join('')}
      </div>

      <div class="card-footer">
        <span class="jobs-open">
          <i class="ti ti-briefcase"></i>${c.jobs} việc làm đang tuyển
        </span>
        <button class="view-btn-company" onclick="event.stopPropagation(); openCompany(${c.id})">
          Xem công ty <i class="ti ti-arrow-right"></i>
        </button>
      </div>

    </div>`).join('');

    renderPagination();
}

function renderPagination() {
    const total = Math.ceil(currentCompanies.length / PER_PAGE);
    const pg = document.getElementById('pagination');
    if (total <= 1) { pg.innerHTML = ''; return; }

    let html = `<button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
        <i class="ti ti-chevron-left"></i></button>`;

    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || Math.abs(i - currentPage) <= 1)
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
        else if (Math.abs(i - currentPage) === 2)
            html += `<span class="page-dots">…</span>`;
    }

    html += `<button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage === total ? 'disabled' : ''}>
        <i class="ti ti-chevron-right"></i></button>`;
    pg.innerHTML = html;
}

/* ── ACTIONS ── */
function goPage(p) {
    const total = Math.ceil(currentCompanies.length / PER_PAGE);
    if (p < 1 || p > total) return;
    currentPage = p;
    renderCompanies();
    document.querySelector('.results-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function openCompany(id) {
    // Navigate to company detail page
    // window.location.href = `CompanyDetail.html?id=${id}`;
    console.log('Open company:', id);
}

function sortCompanies(v) {
    if (v === 'rating') {
        currentCompanies = [...currentCompanies].sort((a, b) => b.rating - a.rating);
    } else if (v === 'jobs') {
        currentCompanies = [...currentCompanies].sort((a, b) => b.jobs - a.jobs);
    } else if (v === 'newest') {
        currentCompanies = [...currentCompanies].sort((a, b) => b.id - a.id);
    } else {
        currentCompanies = [...COMPANIES];
    }
    currentPage = 1;
    renderCompanies();
}

function setView(v) {
    const grid = document.getElementById('companiesGrid');
    document.getElementById('btnGrid').classList.toggle('active', v === 'grid');
    document.getElementById('btnList').classList.toggle('active', v === 'list');
    grid.classList.toggle('list-view', v === 'list');
}

function quickSearch(kw) {
    document.getElementById('searchInput').value = kw;
    doSearch();
}

function doSearch() {
    const kw = document.getElementById('searchInput').value.toLowerCase().trim();
    currentCompanies = kw
        ? COMPANIES.filter(c =>
            c.name.toLowerCase().includes(kw) ||
            c.sector.toLowerCase().includes(kw) ||
            c.type.toLowerCase().includes(kw) ||
            c.tags.some(t => t.toLowerCase().includes(kw))
          )
        : [...COMPANIES];
    document.getElementById('totalCount').textContent = currentCompanies.length.toLocaleString();
    currentPage = 1;
    renderCompanies();
}

function filterByLocation(loc) {
    currentCompanies = loc
        ? COMPANIES.filter(c => c.location.includes(loc))
        : [...COMPANIES];
    document.getElementById('totalCount').textContent = currentCompanies.length.toLocaleString();
    currentPage = 1;
    renderCompanies();
}

function resetGroup(id) {
    document.querySelectorAll(`#${id} input`).forEach(cb => cb.checked = false);
}

function resetSize() {
    document.querySelectorAll('.size-chip').forEach(c => c.classList.remove('active'));
}

function resetAll() {
    document.querySelectorAll('.sidebar-scroll input[type="checkbox"]').forEach(cb => cb.checked = false);
    resetSize();
    document.querySelector('.loc-select').value = '';
    currentCompanies = [...COMPANIES];
    document.getElementById('totalCount').textContent = currentCompanies.length.toLocaleString();
    currentPage = 1;
    renderCompanies();
}

function toggleSize(el) {
    el.classList.toggle('active');
}

function toggleMore(btn) {
    const group = btn.closest('.filter-group');
    const hiddenItems = group.querySelectorAll('.filter-more.hidden');
    const visibleMore = group.querySelectorAll('.filter-more:not(.hidden)');

    if (hiddenItems.length > 0) {
        hiddenItems.forEach(el => el.classList.remove('hidden'));
        btn.textContent = 'Thu gọn ↑';
    } else {
        visibleMore.forEach(el => el.classList.add('hidden'));
        btn.textContent = 'Xem thêm +';
    }
}

/* ── INIT ── */
renderCompanies();