/* ================================================================
   Jobs.js – SPA thay nội dung chính, giữ header/footer
   ================================================================ */

// ─── DỮ LIỆU VIỆC LÀM ─────────────────────────────────────────
const JOBS = [
    { id: 1, title: 'Senior Frontend Developer (ReactJS / Next.js)', company: 'VNG Corporation', sector: 'Công nghệ', logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124996.png', salary: '20 – 35 triệu', location: 'Quận 7, TP.HCM', workType: 'Hybrid', exp: '3 – 5 năm', size: '1000+ nhân viên', tags: ['ReactJS', 'TypeScript', 'Next.js'], badge: 'top', ai: 98, deadline: 5, posted: '1 ngày trước' },
    { id: 2, title: 'Frontend Developer (VueJS / JavaScript)', company: 'FPT Software', sector: 'Công nghệ', logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png', salary: '15 – 25 triệu', location: 'Cầu Giấy, Hà Nội', workType: 'Toàn thời gian', exp: '1 – 3 năm', size: '5000+ nhân viên', tags: ['VueJS', 'JavaScript', 'REST API'], badge: null, ai: null, deadline: 12, posted: '2 ngày trước' },
    { id: 3, title: 'Web Frontend Engineer – UI/UX Focused', company: 'MoMo E-Wallet', sector: 'Fintech', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png', salary: '18 – 30 triệu', location: 'Quận 1, TP.HCM', workType: 'Toàn thời gian', exp: '2 – 4 năm', size: '500–1000 nhân viên', tags: ['CSS/SCSS', 'ReactJS', 'Figma'], badge: 'ai', ai: 92, deadline: 8, posted: '3 ngày trước' },
    { id: 4, title: 'Frontend Developer (Angular / NodeJS)', company: 'KMS Technology', sector: 'Outsourcing', logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png', salary: '14 – 22 triệu', location: 'Tân Bình, TP.HCM', workType: 'Toàn thời gian', exp: '1 – 3 năm', size: '200–500 nhân viên', tags: ['Angular', 'NodeJS', 'English'], badge: null, ai: null, deadline: 20, posted: '5 ngày trước' },
    { id: 5, title: 'React Native Developer – Mobile App', company: 'Tiki Corporation', sector: 'E-commerce', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png', salary: '22 – 38 triệu', location: 'Quận 3, TP.HCM', workType: 'Hybrid', exp: '2 – 5 năm', size: '1000+ nhân viên', tags: ['React Native', 'TypeScript', 'Redux'], badge: 'hot', ai: null, deadline: 3, posted: 'Hôm nay' },
    { id: 6, title: 'UX/UI Designer & Frontend Implementer', company: 'Grab Vietnam', sector: 'Công nghệ', logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111628.png', salary: '25 – 40 triệu', location: 'Bình Thạnh, TP.HCM', workType: 'Remote', exp: '3 – 5 năm', size: '500–1000 nhân viên', tags: ['Figma', 'ReactJS', 'Tailwind'], badge: 'ai', ai: 88, deadline: 15, posted: '1 ngày trước' },
    { id: 7, title: 'JavaScript Engineer (Node + Frontend)', company: 'Shopee Vietnam', sector: 'E-commerce', logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124966.png', salary: '28 – 45 triệu', location: 'Quận 4, TP.HCM', workType: 'Toàn thời gian', exp: '3 – 5 năm', size: '5000+ nhân viên', tags: ['NodeJS', 'React', 'AWS'], badge: 'top', ai: 95, deadline: 7, posted: '2 ngày trước' },
    { id: 8, title: 'Frontend Lead – Fintech Product', company: 'VPBank Digital', sector: 'Ngân hàng', logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png', salary: '35 – 55 triệu', location: 'Ba Đình, Hà Nội', workType: 'Toàn thời gian', exp: '5+ năm', size: '1000+ nhân viên', tags: ['ReactJS', 'Leadership', 'Agile'], badge: 'urgent', ai: null, deadline: 2, posted: 'Hôm nay' },
    { id: 9, title: 'Mobile Frontend Developer (Flutter / Dart)', company: 'Zalo – VNG', sector: 'Công nghệ', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png', salary: '18 – 32 triệu', location: 'Quận 10, TP.HCM', workType: 'Hybrid', exp: '1 – 3 năm', size: '1000+ nhân viên', tags: ['Flutter', 'Dart', 'Firebase'], badge: null, ai: null, deadline: 18, posted: '3 ngày trước' },
    { id: 10, title: 'Frontend Developer – E-commerce Platform', company: 'Lazada Vietnam', sector: 'E-commerce', logo: 'https://cdn-icons-png.flaticon.com/512/732/732228.png', salary: '16 – 26 triệu', location: 'Quận 1, TP.HCM', workType: 'Remote', exp: '1 – 3 năm', size: '1000+ nhân viên', tags: ['VueJS', 'GraphQL', 'Jest'], badge: 'new', ai: null, deadline: 10, posted: '4 ngày trước' },
    { id: 11, title: 'Fresher Frontend Developer (ReactJS)', company: 'Base.vn', sector: 'SaaS', logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124996.png', salary: '8 – 15 triệu', location: 'Cầu Giấy, Hà Nội', workType: 'Toàn thời gian', exp: 'Chưa có KN', size: '100–200 nhân viên', tags: ['ReactJS', 'HTML/CSS', 'Git'], badge: 'new', ai: null, deadline: 25, posted: '6 ngày trước' },
    { id: 12, title: 'Senior React Developer – SaaS B2B Product', company: 'Axon Active Vietnam', sector: 'Outsourcing', logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png', salary: '30 – 50 triệu', location: 'Quận 7, TP.HCM', workType: 'Hybrid', exp: '3 – 5 năm', size: '200–500 nhân viên', tags: ['React', 'Redux', 'English'], badge: 'top', ai: 91, deadline: 6, posted: '2 ngày trước' },
    { id: 13, title: 'Frontend Developer – Gaming Platform', company: 'Garena Vietnam', sector: 'Gaming', logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png', salary: '20 – 35 triệu', location: 'Quận 1, TP.HCM', workType: 'Toàn thời gian', exp: '2 – 4 năm', size: '500–1000 nhân viên', tags: ['JavaScript', 'WebGL', 'Three.js'], badge: 'hot', ai: null, deadline: 4, posted: 'Hôm nay' },
    { id: 14, title: 'Web Developer (ReactJS + Laravel)', company: 'VNPT Technology', sector: 'Viễn thông', logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png', salary: '12 – 20 triệu', location: 'Đống Đa, Hà Nội', workType: 'Toàn thời gian', exp: '1 – 3 năm', size: '1000+ nhân viên', tags: ['ReactJS', 'PHP', 'Laravel'], badge: null, ai: null, deadline: 14, posted: '5 ngày trước' },
    { id: 15, title: 'UI Developer – Banking App (ReactJS)', company: 'Techcombank', sector: 'Ngân hàng', logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png', salary: '22 – 38 triệu', location: 'Hoàn Kiếm, Hà Nội', workType: 'Toàn thời gian', exp: '2 – 4 năm', size: '5000+ nhân viên', tags: ['ReactJS', 'Figma', 'Agile'], badge: 'ai', ai: 85, deadline: 9, posted: '3 ngày trước' },
    { id: 16, title: 'Fullstack JS Developer (Next.js + NestJS)', company: 'Nashtech Vietnam', sector: 'Outsourcing', logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png', salary: '25 – 42 triệu', location: 'Quận 3, TP.HCM', workType: 'Hybrid', exp: '3 – 5 năm', size: '200–500 nhân viên', tags: ['Next.js', 'NestJS', 'TypeScript'], badge: null, ai: null, deadline: 22, posted: '1 tuần trước' }
];

const PER_PAGE = 8;
let currentPage = 1;
let currentJobs = [...JOBS];

// ─── QUẢN LÝ CSS ───────────────────────────────────────────────

/**
 * Tìm <link> Jobs.css trong <head> để disable/enable.
 * Jobs.css có nhiều class trùng tên (.page-wrap, .sidebar...) với
 * JobDetail.css / Apply.css → phải tắt nó khi vào trang con.
 */
function setJobsCSS(enabled) {
    document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
        if (link.href && link.href.includes('Jobs.css')) {
            link.disabled = !enabled;
        }
    });
}

/**
 * Inject CSS của trang con vào <head>, convert path tương đối → tuyệt đối.
 * Nếu đã inject rồi thì chỉ re-enable (không fetch lại).
 */
function injectPageCSS(nodes, basePath, styleId) {
    const existing = document.getElementById(styleId);
    if (existing) {
        existing.disabled = false;
        return;
    }
    nodes.forEach(node => {
        if (node.tagName === 'LINK' && node.rel === 'stylesheet') {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.id = styleId;
            link.href = new URL(node.getAttribute('href'), basePath).href;
            document.head.appendChild(link);
        } else if (node.tagName === 'STYLE') {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = node.textContent;
            document.head.appendChild(style);
        }
    });
}

/** Disable CSS trang con (không xóa để tránh re-fetch lần sau). */
function disablePageCSS(styleId) {
    const el = document.getElementById(styleId);
    if (el) el.disabled = true;
}

// ─── HELPER ────────────────────────────────────────────────────
function deadlineLabel(d) {
    if (d <= 2) return { text: `Còn ${d} ngày`, urgent: true };
    return { text: `Còn ${d} ngày`, urgent: false };
}
function cardClass(job) {
    if (job.badge === 'top') return 'is-top';
    if (job.badge === 'hot') return 'is-hot';
    if (job.badge === 'urgent') return 'is-urgent';
    if (job.badge === 'new') return 'is-new';
    if (job.ai) return 'is-ai';
    return '';
}
function badgesHTML(job) {
    let b = '';
    if (job.badge === 'top') b += '<span class="badge badge-top">⭐ TOP</span>';
    if (job.badge === 'hot') b += '<span class="badge badge-hot">🔥 HOT</span>';
    if (job.badge === 'new') b += '<span class="badge badge-new">✨ Mới</span>';
    if (job.badge === 'urgent') b += '<span class="badge badge-urgent">⚡ Gấp</span>';
    if (job.ai) b += `<span class="badge badge-ai"><i class="ti ti-sparkles"></i> AI ${job.ai}%</span>`;
    return b;
}
function toggleSave(btn) {
    btn.classList.toggle('saved');
    btn.innerHTML = btn.classList.contains('saved')
        ? '<i class="ti ti-bookmark-filled"></i>'
        : '<i class="ti ti-bookmark"></i>';
}

// ─── RENDER DANH SÁCH VIỆC LÀM ────────────────────────────────
function renderJobsGrid() {
    const grid = document.getElementById('jobsGrid');
    if (!grid) return;
    const start = (currentPage - 1) * PER_PAGE;
    const slice = currentJobs.slice(start, start + PER_PAGE);
    grid.innerHTML = slice.map(job => {
        const dl = deadlineLabel(job.deadline);
        return `
    <div class="job-card ${cardClass(job)}" onclick="openDetail(${job.id})">
      <div class="card-strip">
        <div class="card-badges">${badgesHTML(job)}</div>
        <span style="font-size:10px;color:var(--gray-400)">${job.posted}</span>
      </div>
      <div class="card-body">
        <div class="card-top">
          <div class="company-logo"><img src="${job.logo}" alt="${job.company}"/></div>
          <div class="card-info">
            <h4 class="job-title">${job.title}</h4>
            <p class="job-company">${job.company} · ${job.sector}</p>
          </div>
        </div>
      </div>
      <div class="card-meta">
        <div class="meta-item salary"><i class="ti ti-currency-dollar"></i><span class="meta-val">${job.salary}</span></div>
        <div class="meta-item"><i class="ti ti-map-pin"></i><span class="meta-val">${job.location}</span></div>
        <div class="meta-item"><i class="ti ti-clock"></i><span class="meta-val">${job.workType}</span></div>
        <div class="meta-item"><i class="ti ti-school"></i><span class="meta-val">${job.exp}</span></div>
      </div>
      <div class="card-divider"></div>
      <div class="card-footer">
        <div class="card-tags">
          ${job.tags.map((t, i) => `<span class="card-tag ${i === 0 ? 'hl' : ''}">${t}</span>`).join('')}
        </div>
        <div style="display:flex;gap:6px;align-items:center">
          <button class="apply-quick-btn" onclick="event.stopPropagation();openApply(${job.id})" title="Ứng tuyển">
            <i class="ti ti-send"></i>
          </button>
          <button class="save-btn" onclick="event.stopPropagation();toggleSave(this)">
            <i class="ti ti-bookmark"></i>
          </button>
        </div>
      </div>
      <div class="card-deadline-row">
        <span class="deadline-chip ${dl.urgent ? 'urgent' : ''}">
          <i class="ti ti-${dl.urgent ? 'alarm' : 'calendar'}"></i>${dl.text}
        </span>
      </div>
    </div>`;
    }).join('');
}

function renderPagination() {
    const total = Math.ceil(currentJobs.length / PER_PAGE);
    const pg = document.getElementById('pagination');
    if (!pg) return;
    if (total <= 1) { pg.innerHTML = ''; return; }
    let html = `<button class="page-btn" onclick="goPage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}><i class="ti ti-chevron-left"></i></button>`;
    for (let i = 1; i <= total; i++) {
        if (i === 1 || i === total || Math.abs(i - currentPage) <= 1)
            html += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goPage(${i})">${i}</button>`;
        else if (Math.abs(i - currentPage) === 2)
            html += `<span class="page-dots">…</span>`;
    }
    html += `<button class="page-btn" onclick="goPage(${currentPage + 1})" ${currentPage === total ? 'disabled' : ''}><i class="ti ti-chevron-right"></i></button>`;
    pg.innerHTML = html;
}

function goPage(p) {
    const total = Math.ceil(currentJobs.length / PER_PAGE);
    if (p < 1 || p > total) return;
    currentPage = p;
    renderJobsGrid();
    renderPagination();
    document.querySelector('.results-area')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function sortJobs(v) {
    if (v === 'newest') currentJobs = [...currentJobs].sort((a, b) => b.id - a.id);
    else if (v === 'salary-desc') currentJobs = [...currentJobs].sort((a, b) => parseInt(b.salary) - parseInt(a.salary));
    else if (v === 'salary-asc') currentJobs = [...currentJobs].sort((a, b) => parseInt(a.salary) - parseInt(b.salary));
    else currentJobs = [...JOBS];
    currentPage = 1;
    renderJobsGrid();
    renderPagination();
}

function setView(v) {
    const grid = document.getElementById('jobsGrid');
    const btnGrid = document.getElementById('btnGrid');
    const btnList = document.getElementById('btnList');
    if (btnGrid) btnGrid.classList.toggle('active', v === 'grid');
    if (btnList) btnList.classList.toggle('active', v === 'list');
    if (grid) grid.style.gridTemplateColumns = v === 'list' ? '1fr' : 'repeat(2,1fr)';
}

function doSearch() {
    const kw = document.getElementById('searchInput')?.value.toLowerCase().trim() || '';
    currentJobs = kw
        ? JOBS.filter(j => j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw) || j.tags.some(t => t.toLowerCase().includes(kw)))
        : [...JOBS];
    document.getElementById('totalCount').textContent = currentJobs.length.toLocaleString();
    currentPage = 1;
    renderJobsGrid();
    renderPagination();
}

function quickSearch(kw) {
    const inp = document.getElementById('searchInput');
    if (inp) inp.value = kw;
    doSearch();
}

function resetGroup(id) {
    document.querySelectorAll(`#${id} input`).forEach(cb => cb.checked = false);
}
function resetAll() {
    document.querySelectorAll('.sidebar-scroll input[type="checkbox"]').forEach(cb => cb.checked = false);
}

// ─── VIEW: DANH SÁCH VIỆC LÀM ─────────────────────────────────
function getJobListHTML() {
    return `
    <section class="search-section">
        <div class="search-wrap">
            <div class="search-bar">
                <div class="search-field">
                    <span class="mat-icon">search</span>
                    <input id="searchInput" placeholder="Tên công việc, vị trí, công ty..." type="text" />
                </div>
                <div class="search-field divider">
                    <span class="mat-icon">location_on</span>
                    <input placeholder="Tất cả địa điểm" type="text" />
                </div>
                <button class="search-btn" onclick="doSearch()">
                    <span class="mat-icon" style="font-size:18px">search</span>Tìm kiếm
                </button>
            </div>
            <div class="search-tags">
                <span class="search-tag" onclick="quickSearch('Frontend')">Frontend Developer</span>
                <span class="search-tag" onclick="quickSearch('Marketing')">Marketing</span>
                <span class="search-tag" onclick="quickSearch('Kế toán')">Kế toán</span>
                <span class="search-tag" onclick="quickSearch('Nhân sự')">Nhân sự</span>
                <span class="search-tag" onclick="quickSearch('Data')">Data Analyst</span>
                <span class="search-tag" onclick="quickSearch('Product')">Product Manager</span>
            </div>
        </div>
    </section>

    <div class="page-wrap">
        <aside class="filter-sidebar">
            <div class="sidebar-header">
                <span class="sidebar-title"><i class="ti ti-adjustments-horizontal"></i>Bộ lọc</span>
                <span class="sidebar-reset" onclick="resetAll()">Xoá tất cả</span>
            </div>
            <div class="sidebar-scroll">
                <div class="filter-section">
                    <div class="filter-head"><h3 class="filter-title"><i class="ti ti-award"></i>Cấp bậc</h3><span class="filter-reset" onclick="resetGroup('capBac')">Xoá</span></div>
                    <div class="filter-group" id="capBac">
                        <label class="filter-item"><input type="checkbox" value="Thực tập sinh" />Thực tập sinh</label>
                        <label class="filter-item"><input type="checkbox" value="Nhân viên" />Nhân viên</label>
                        <label class="filter-item"><input type="checkbox" value="Trưởng nhóm" />Trưởng nhóm</label>
                        <label class="filter-item"><input type="checkbox" value="Quản lý" />Quản lý / Giám đốc</label>
                        <label class="filter-item"><input type="checkbox" value="C-Level" />C-Level / Director</label>
                    </div>
                </div>
                <div class="filter-section">
                    <div class="filter-head"><h3 class="filter-title"><i class="ti ti-coin"></i>Mức lương</h3><span class="filter-reset" onclick="resetGroup('mucLuong')">Xoá</span></div>
                    <div class="filter-group" id="mucLuong">
                        <label class="filter-item"><input type="checkbox" value="Thoả thuận" />Thoả thuận</label>
                        <label class="filter-item"><input type="checkbox" value="Dưới 10tr" />Dưới 10 triệu</label>
                        <label class="filter-item"><input type="checkbox" value="10-20tr" />10 – 20 triệu</label>
                        <label class="filter-item"><input type="checkbox" value="20-35tr" />20 – 35 triệu</label>
                        <label class="filter-item"><input type="checkbox" value="35-50tr" />35 – 50 triệu</label>
                        <label class="filter-item"><input type="checkbox" value="Trên 50tr" />Trên 50 triệu</label>
                    </div>
                </div>
                <div class="filter-section">
                    <div class="filter-head"><h3 class="filter-title"><i class="ti ti-briefcase"></i>Kinh nghiệm</h3><span class="filter-reset" onclick="resetGroup('kinhNghiem')">Xoá</span></div>
                    <div class="filter-group" id="kinhNghiem">
                        <label class="filter-item"><input type="checkbox" value="Chưa có KN" />Chưa có kinh nghiệm</label>
                        <label class="filter-item"><input type="checkbox" value="Dưới 1 năm" />Dưới 1 năm</label>
                        <label class="filter-item"><input type="checkbox" value="1-3 năm" />1 – 3 năm</label>
                        <label class="filter-item"><input type="checkbox" value="3-5 năm" />3 – 5 năm</label>
                        <label class="filter-item"><input type="checkbox" value="Trên 5 năm" />Trên 5 năm</label>
                    </div>
                </div>
                <div class="filter-section">
                    <div class="filter-head"><h3 class="filter-title"><i class="ti ti-clock"></i>Hình thức làm việc</h3><span class="filter-reset" onclick="resetGroup('hinhThuc')">Xoá</span></div>
                    <div class="filter-group" id="hinhThuc">
                        <label class="filter-item"><input type="checkbox" value="Toàn thời gian" />Toàn thời gian</label>
                        <label class="filter-item"><input type="checkbox" value="Bán thời gian" />Bán thời gian</label>
                        <label class="filter-item"><input type="checkbox" value="Remote" />Remote / Từ xa</label>
                        <label class="filter-item"><input type="checkbox" value="Hybrid" />Hybrid</label>
                        <label class="filter-item"><input type="checkbox" value="Freelance" />Freelance</label>
                    </div>
                </div>
                <div class="filter-section">
                    <div class="filter-head"><h3 class="filter-title"><i class="ti ti-category"></i>Ngành nghề</h3><span class="filter-reset" onclick="resetGroup('nganhNghe')">Xoá</span></div>
                    <div class="filter-group" id="nganhNghe">
                        <label class="filter-item"><input type="checkbox" value="IT" />IT – Phần mềm</label>
                        <label class="filter-item"><input type="checkbox" value="Marketing" />Marketing</label>
                        <label class="filter-item"><input type="checkbox" value="Kế toán" />Kế toán / Tài chính</label>
                        <label class="filter-item"><input type="checkbox" value="Nhân sự" />Hành chính / Nhân sự</label>
                        <label class="filter-item"><input type="checkbox" value="Kinh doanh" />Kinh doanh / Bán hàng</label>
                        <label class="filter-item"><input type="checkbox" value="Thiết kế" />Thiết kế / Sáng tạo</label>
                        <label class="filter-item"><input type="checkbox" value="Kỹ thuật" />Kỹ thuật / Sản xuất</label>
                        <label class="filter-item"><input type="checkbox" value="Logistics" />Logistics / Vận tải</label>
                    </div>
                </div>
                <div class="filter-section">
                    <div class="filter-head"><h3 class="filter-title"><i class="ti ti-building"></i>Loại công ty</h3><span class="filter-reset" onclick="resetGroup('loaiCty')">Xoá</span></div>
                    <div class="filter-group" id="loaiCty">
                        <label class="filter-item"><input type="checkbox" value="Startup" />Startup</label>
                        <label class="filter-item"><input type="checkbox" value="Nước ngoài" />Công ty nước ngoài</label>
                        <label class="filter-item"><input type="checkbox" value="Trong nước" />Công ty trong nước</label>
                        <label class="filter-item"><input type="checkbox" value="Tập đoàn" />Tập đoàn lớn</label>
                    </div>
                </div>
            </div>
        </aside>
        <section class="results-area">
            <div class="results-header">
                <div class="results-count">Tìm thấy <strong id="totalCount">${currentJobs.length}</strong> việc làm</div>
                <div class="results-right">
                    <span class="sort-label">Sắp xếp:</span>
                    <select class="sort-select" onchange="sortJobs(this.value)">
                        <option value="relevant">Phù hợp nhất</option>
                        <option value="newest">Mới nhất</option>
                        <option value="salary-desc">Lương cao nhất</option>
                        <option value="salary-asc">Lương thấp nhất</option>
                    </select>
                    <div class="view-toggle">
                        <button class="view-btn active" id="btnGrid" onclick="setView('grid')" title="Lưới"><i class="ti ti-layout-grid"></i></button>
                        <button class="view-btn" id="btnList" onclick="setView('list')" title="Danh sách"><i class="ti ti-list"></i></button>
                    </div>
                </div>
            </div>
            <div class="jobs-grid" id="jobsGrid"></div>
            <div class="pagination" id="pagination"></div>
        </section>
    </div>`;
}

// ─── SET CONTENT (KHÔNG WRAP THÊM DIV THỪA) ───────────────────
// FIX: Bỏ wrapper div scope — chèn thẳng HTML gốc vào #app-content
function setContent(html) {
    const app = document.getElementById('app-content');
    if (!app) return;
    app.innerHTML = html;
    window.scrollTo(0, 0);
}

function showJobList() {
    // Tắt CSS trang con, bật lại Jobs.css
    disablePageCSS('css-jobdetail');
    disablePageCSS('css-apply');
    setJobsCSS(true);
    setContent(getJobListHTML());
    renderJobsGrid();
    renderPagination();
}

// ─── MỞ CHI TIẾT VIỆC LÀM ─────────────────────────────────────
async function openDetail(jobId) {
    const job = JOBS.find(j => j.id === jobId);
    if (!job) return;

    try {
        // Tắt Jobs.css (tránh xung đột .page-wrap, .sidebar...), tắt Apply.css nếu đang bật
        setJobsCSS(false);
        disablePageCSS('css-apply');
        const templateURL = new URL('../ChitietViecLam/JobDetail.html', location.href).href;
        const res = await fetch(templateURL);
        const html = await res.text();

        // Dùng DOMParser để parse toàn bộ document — giữ đúng cấu trúc <body>
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // ── INJECT CSS của trang con vào <head> ──
        const cssNodes = [...doc.querySelectorAll('link[rel="stylesheet"], style')];
        injectPageCSS(cssNodes, templateURL, 'css-jobdetail');

        // Lấy đúng <body> của trang con làm container thao tác
        const temp = doc.body;

        // Xóa header/footer placeholder
        temp.querySelector('#header-placeholder')?.remove();
        temp.querySelector('#footer-placeholder')?.remove();

        // ── Cập nhật dữ liệu job ──
        const heroTitle = temp.querySelector('.hero-title');
        if (heroTitle) {
            const span = heroTitle.querySelector('span');
            heroTitle.innerHTML = `${job.title}<br>${span ? span.outerHTML : `<span>${job.sector}</span>`}`;
        }
        const companyElem = temp.querySelector('.hero-company');
        if (companyElem) companyElem.innerHTML = `${job.company.toUpperCase()} <span class="mat-icon verified-icon">verified</span>`;

        const salaryVal = temp.querySelector('.hero-meta-item:first-child .meta-value');
        if (salaryVal) salaryVal.textContent = job.salary;
        const locationVal = temp.querySelector('.hero-meta-item:nth-child(2) .meta-value');
        if (locationVal) locationVal.textContent = job.location;
        const expVal = temp.querySelector('.hero-meta-item:nth-child(3) .meta-value');
        if (expVal) expVal.textContent = job.exp;
        const workTypeVal = temp.querySelector('.hero-meta-item:nth-child(4) .meta-value');
        if (workTypeVal) workTypeVal.textContent = job.workType;

        const deadlineStrong = temp.querySelector('.deadline-bar .dl-item:nth-child(2) strong');
        if (deadlineStrong) deadlineStrong.textContent = `Còn ${job.deadline} ngày`;
        const postedStrong = temp.querySelector('.deadline-bar .dl-item:first-child strong');
        if (postedStrong) postedStrong.textContent = job.posted;
        const aiPct = temp.querySelector('.dl-match .pct');
        if (aiPct) aiPct.textContent = `${job.ai || Math.floor(Math.random() * 15 + 80)}%`;

        const logoImg = temp.querySelector('.company-logo-box img');
        if (logoImg) logoImg.src = job.logo;

        const tagsContainer = temp.querySelector('.tags');
        if (tagsContainer) {
            tagsContainer.innerHTML = job.tags.map(t => `<span class="tag">${t}</span>`).join('');
        }

        const companyNameSide = temp.querySelector('.company-name');
        if (companyNameSide) companyNameSide.textContent = job.company;
        const sizeSpan = temp.querySelector('.cs-row:first-child .mat-icon + span');
        if (sizeSpan) sizeSpan.textContent = job.size;
        const sectorSpan = temp.querySelector('.cs-row:nth-child(2) .mat-icon + span');
        if (sectorSpan) sectorSpan.textContent = job.sector;

        const overviewExp = temp.querySelector('.info-card .info-row:nth-child(2) .ir-value');
        if (overviewExp) overviewExp.textContent = job.exp;
        const deadlineOverview = temp.querySelector('.info-card .info-row:last-child .ir-value');
        if (deadlineOverview) deadlineOverview.textContent = `Còn ${job.deadline} ngày`;

        const applyHeroBtn = temp.querySelector('.hero-actions .btn-apply');
        if (applyHeroBtn) applyHeroBtn.setAttribute('onclick', `openApply(${job.id})`);
        const stickyApplyBtn = temp.querySelector('.sticky-bar .btn-apply');
        if (stickyApplyBtn) stickyApplyBtn.setAttribute('onclick', `openApply(${job.id})`);

        temp.querySelectorAll('.hero-actions .btn-save').forEach(btn => {
            btn.setAttribute('onclick', `event.stopPropagation(); toggleSave(this);`);
        });

        // ── Chèn đúng nội dung <body> của trang con ──
        setContent(temp.innerHTML);

        // Gắn nút quay lại
        setTimeout(() => {
            const backBtn = document.querySelector('#app-content .back-to-list-btn, #app-content .spa-back-btn');
            if (backBtn) backBtn.onclick = () => showJobList();
        }, 50);

    } catch (err) {
        console.error('Lỗi tải JobDetail:', err);
        setContent('<div class="error">Không thể tải chi tiết công việc. Vui lòng thử lại.</div>');
    }
}

// ─── MỞ TRANG ỨNG TUYỂN ───────────────────────────────────────
async function openApply(jobId) {
    const job = JOBS.find(j => j.id === jobId);
    if (!job) return;

    try {
        // Tắt Jobs.css, tắt JobDetail.css nếu đang bật
        setJobsCSS(false);
        disablePageCSS('css-jobdetail');
        const templateURL = new URL('../UngTuyen/Apply.html', location.href).href;
        const res = await fetch(templateURL);
        const html = await res.text();

        // Dùng DOMParser để parse toàn bộ document
        const doc = new DOMParser().parseFromString(html, 'text/html');

        // ── INJECT CSS của trang con ──
        const cssNodes = [...doc.querySelectorAll('link[rel="stylesheet"], style')];
        injectPageCSS(cssNodes, templateURL, 'css-apply');

        // Lấy <body> làm container
        const temp = doc.body;

        temp.querySelector('#header-placeholder')?.remove();
        temp.querySelector('#footer-placeholder')?.remove();

        // ── Cập nhật dữ liệu job ──
        const heroTitle = temp.querySelector('.apply-hero-title');
        if (heroTitle) heroTitle.textContent = `Apply — ${job.title}`;
        const companyChip = temp.querySelector('.meta-chip:first-child span:last-child');
        if (companyChip) companyChip.textContent = job.company;
        const locationChip = temp.querySelector('.meta-chip:nth-child(2) span:last-child');
        if (locationChip) locationChip.textContent = job.location;
        const salaryChip = temp.querySelector('.meta-chip:nth-child(3) span:last-child');
        if (salaryChip) salaryChip.textContent = job.salary;
        const aiMatchSpan = temp.querySelector('.ai-match-badge .pct');
        if (aiMatchSpan) aiMatchSpan.textContent = ` ${job.ai || Math.floor(Math.random() * 15 + 80)}%`;

        const jsTitle = temp.querySelector('.js-title');
        if (jsTitle) jsTitle.textContent = job.title;
        const jsCompany = temp.querySelector('.js-company');
        if (jsCompany) jsCompany.textContent = `${job.company} · Verified`;
        const jsSalary = temp.querySelector('.js-row:first-child strong');
        if (jsSalary) jsSalary.textContent = job.salary;
        const jsLocation = temp.querySelector('.js-row:nth-child(2)');
        if (jsLocation) jsLocation.innerHTML = `<span class="mat-icon">location_on</span> ${job.location}`;
        const jsExp = temp.querySelector('.js-row:nth-child(3)');
        if (jsExp) jsExp.innerHTML = `<span class="mat-icon">work_history</span> ${job.exp}`;
        const jsWorkType = temp.querySelector('.js-row:nth-child(4)');
        if (jsWorkType) jsWorkType.innerHTML = `<span class="mat-icon">home_work</span> ${job.workType}`;
        const jsDeadline = temp.querySelector('.js-deadline');
        if (jsDeadline) jsDeadline.innerHTML = `<span class="mat-icon">hourglass_empty</span> Còn ${job.deadline} ngày để nộp hồ sơ`;

        const summaryLogo = temp.querySelector('.job-summary-logo img');
        if (summaryLogo) summaryLogo.src = job.logo;

        const viewJobBtn = temp.querySelector('.btn-view-job');
        if (viewJobBtn) viewJobBtn.setAttribute('onclick', `openDetail(${job.id}); return false;`);

        // ── Chèn đúng nội dung <body> của trang con ──
        setContent(temp.innerHTML);

        setTimeout(() => {
            if (typeof initApplyLogic === 'function') {
                initApplyLogic(job);
            } else {
                console.warn('initApplyLogic chưa được định nghĩa');
            }
            const backDetail = document.querySelector('#app-content .back-to-detail-btn');
            if (backDetail) backDetail.onclick = () => openDetail(job.id);
            const backList = document.querySelector('#app-content .back-to-list-btn');
            if (backList) backList.onclick = () => showJobList();
        }, 100);

    } catch (err) {
        console.error('Lỗi tải Apply:', err);
        setContent('<div class="error">Không thể tải trang ứng tuyển. Vui lòng thử lại.</div>');
    }
}

// ─── LOGIC FORM ỨNG TUYỂN ─────────────────────────────────────
function initApplyLogic(job) {
    const cvOptions = document.querySelectorAll('#app-content .cv-option');
    const uploadZone = document.getElementById('upload-zone');
    const viecjobZone = document.getElementById('viecjob-zone');
    cvOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            cvOptions.forEach(o => o.classList.remove('selected'));
            opt.classList.add('selected');
            const type = opt.dataset.type;
            if (uploadZone) uploadZone.style.display = type === 'upload' ? 'block' : 'none';
            if (viecjobZone) viecjobZone.style.display = type === 'viecjob' ? 'block' : 'none';
        });
    });
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const preview = document.getElementById('file-preview');
    const previewName = document.getElementById('preview-name');
    const previewSize = document.getElementById('preview-size');
    const removeBtn = document.getElementById('remove-file');
    function formatSize(bytes) {
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / 1048576).toFixed(1) + ' MB';
    }
    function showPreview(file) {
        if (!preview) return;
        previewName.textContent = file.name;
        previewSize.textContent = formatSize(file.size);
        preview.classList.add('show');
        if (dropZone) dropZone.style.display = 'none';
    }
    if (dropZone) {
        dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
        dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
        dropZone.addEventListener('drop', e => {
            e.preventDefault(); dropZone.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file) showPreview(file);
        });
    }
    if (fileInput) {
        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) showPreview(file);
        });
    }
    if (removeBtn) {
        removeBtn.addEventListener('click', () => {
            if (fileInput) fileInput.value = '';
            if (preview) preview.classList.remove('show');
            if (dropZone) dropZone.style.display = 'block';
        });
    }
    const textarea = document.getElementById('cover-letter');
    const counter = document.getElementById('char-count');
    if (textarea && counter) {
        textarea.addEventListener('input', () => {
            const len = textarea.value.length;
            counter.textContent = len + ' / 2000';
            counter.style.color = len > 1800 ? '#EF4444' : '';
        });
    }
    const form = document.getElementById('apply-form');
    const modal = document.getElementById('success-modal');
    const modalOk = document.getElementById('modal-ok');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const name = document.getElementById('full-name');
            const phone = document.getElementById('phone');
            const email = document.getElementById('email');
            let valid = true;
            [name, phone, email].forEach(el => {
                if (el && !el.value.trim()) {
                    el.style.borderColor = '#EF4444';
                    el.style.boxShadow = '0 0 0 3px rgba(239,68,68,.1)';
                    valid = false;
                    el.addEventListener('input', () => {
                        el.style.borderColor = '';
                        el.style.boxShadow = '';
                    }, { once: true });
                }
            });
            if (!valid) return;
            if (modal) modal.classList.add('show');
        });
    }
    if (modalOk) {
        modalOk.addEventListener('click', () => {
            if (modal) modal.classList.remove('show');
            showJobList();
        });
    }
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) modal.classList.remove('show');
        });
    }
    const applyBtn = document.getElementById('apply-btn');
    if (applyBtn) {
        applyBtn.addEventListener('mousedown', () => { applyBtn.style.transform = 'scale(0.97)'; });
        applyBtn.addEventListener('mouseup', () => { applyBtn.style.transform = ''; });
        applyBtn.addEventListener('mouseleave', () => { applyBtn.style.transform = ''; });
    }
}

// ─── KHỞI TẠO ──────────────────────────────────────────────────
window.addEventListener('load', () => {
    showJobList();
});