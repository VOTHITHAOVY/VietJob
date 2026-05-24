const JOBS = [
    {
        id: 1, title: 'Senior Frontend Developer (ReactJS / Next.js)',
        company: 'VNG Corporation', sector: 'Công nghệ',
        logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124996.png',
        salary: '20 – 35 triệu', location: 'Quận 7, TP.HCM',
        workType: 'Hybrid', exp: '3 – 5 năm', size: '1000+ nhân viên',
        tags: ['ReactJS', 'TypeScript', 'Next.js'],
        badge: 'top', ai: 98, deadline: 5, posted: '1 ngày trước'
    },
    {
        id: 2, title: 'Frontend Developer (VueJS / JavaScript)',
        company: 'FPT Software', sector: 'Công nghệ',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png',
        salary: '15 – 25 triệu', location: 'Cầu Giấy, Hà Nội',
        workType: 'Toàn thời gian', exp: '1 – 3 năm', size: '5000+ nhân viên',
        tags: ['VueJS', 'JavaScript', 'REST API'],
        badge: null, ai: null, deadline: 12, posted: '2 ngày trước'
    },
    {
        id: 3, title: 'Web Frontend Engineer – UI/UX Focused',
        company: 'MoMo E-Wallet', sector: 'Fintech',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
        salary: '18 – 30 triệu', location: 'Quận 1, TP.HCM',
        workType: 'Toàn thời gian', exp: '2 – 4 năm', size: '500–1000 nhân viên',
        tags: ['CSS/SCSS', 'ReactJS', 'Figma'],
        badge: 'ai', ai: 92, deadline: 8, posted: '3 ngày trước'
    },
    {
        id: 4, title: 'Frontend Developer (Angular / NodeJS)',
        company: 'KMS Technology', sector: 'Outsourcing',
        logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
        salary: '14 – 22 triệu', location: 'Tân Bình, TP.HCM',
        workType: 'Toàn thời gian', exp: '1 – 3 năm', size: '200–500 nhân viên',
        tags: ['Angular', 'NodeJS', 'English'],
        badge: null, ai: null, deadline: 20, posted: '5 ngày trước'
    },
    {
        id: 5, title: 'React Native Developer – Mobile App',
        company: 'Tiki Corporation', sector: 'E-commerce',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
        salary: '22 – 38 triệu', location: 'Quận 3, TP.HCM',
        workType: 'Hybrid', exp: '2 – 5 năm', size: '1000+ nhân viên',
        tags: ['React Native', 'TypeScript', 'Redux'],
        badge: 'hot', ai: null, deadline: 3, posted: 'Hôm nay'
    },
    {
        id: 6, title: 'UX/UI Designer & Frontend Implementer',
        company: 'Grab Vietnam', sector: 'Công nghệ',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111628.png',
        salary: '25 – 40 triệu', location: 'Bình Thạnh, TP.HCM',
        workType: 'Remote', exp: '3 – 5 năm', size: '500–1000 nhân viên',
        tags: ['Figma', 'ReactJS', 'Tailwind'],
        badge: 'ai', ai: 88, deadline: 15, posted: '1 ngày trước'
    },
    {
        id: 7, title: 'JavaScript Engineer (Node + Frontend)',
        company: 'Shopee Vietnam', sector: 'E-commerce',
        logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124966.png',
        salary: '28 – 45 triệu', location: 'Quận 4, TP.HCM',
        workType: 'Toàn thời gian', exp: '3 – 5 năm', size: '5000+ nhân viên',
        tags: ['NodeJS', 'React', 'AWS'],
        badge: 'top', ai: 95, deadline: 7, posted: '2 ngày trước'
    },
    {
        id: 8, title: 'Frontend Lead – Fintech Product',
        company: 'VPBank Digital', sector: 'Ngân hàng',
        logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        salary: '35 – 55 triệu', location: 'Ba Đình, Hà Nội',
        workType: 'Toàn thời gian', exp: '5+ năm', size: '1000+ nhân viên',
        tags: ['ReactJS', 'Leadership', 'Agile'],
        badge: 'urgent', ai: null, deadline: 2, posted: 'Hôm nay'
    },
    {
        id: 9, title: 'Mobile Frontend Developer (Flutter / Dart)',
        company: 'Zalo – VNG', sector: 'Công nghệ',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968672.png',
        salary: '18 – 32 triệu', location: 'Quận 10, TP.HCM',
        workType: 'Hybrid', exp: '1 – 3 năm', size: '1000+ nhân viên',
        tags: ['Flutter', 'Dart', 'Firebase'],
        badge: null, ai: null, deadline: 18, posted: '3 ngày trước'
    },
    {
        id: 10, title: 'Frontend Developer – E-commerce Platform',
        company: 'Lazada Vietnam', sector: 'E-commerce',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732228.png',
        salary: '16 – 26 triệu', location: 'Quận 1, TP.HCM',
        workType: 'Remote', exp: '1 – 3 năm', size: '1000+ nhân viên',
        tags: ['VueJS', 'GraphQL', 'Jest'],
        badge: 'new', ai: null, deadline: 10, posted: '4 ngày trước'
    },
    {
        id: 11, title: 'Fresher Frontend Developer (ReactJS)',
        company: 'Base.vn', sector: 'SaaS',
        logo: 'https://cdn-icons-png.flaticon.com/512/6124/6124996.png',
        salary: '8 – 15 triệu', location: 'Cầu Giấy, Hà Nội',
        workType: 'Toàn thời gian', exp: 'Chưa có KN', size: '100–200 nhân viên',
        tags: ['ReactJS', 'HTML/CSS', 'Git'],
        badge: 'new', ai: null, deadline: 25, posted: '6 ngày trước'
    },
    {
        id: 12, title: 'Senior React Developer – SaaS B2B Product',
        company: 'Axon Active Vietnam', sector: 'Outsourcing',
        logo: 'https://cdn-icons-png.flaticon.com/512/0/747.png',
        salary: '30 – 50 triệu', location: 'Quận 7, TP.HCM',
        workType: 'Hybrid', exp: '3 – 5 năm', size: '200–500 nhân viên',
        tags: ['React', 'Redux', 'English'],
        badge: 'top', ai: 91, deadline: 6, posted: '2 ngày trước'
    },
    {
        id: 13, title: 'Frontend Developer – Gaming Platform',
        company: 'Garena Vietnam', sector: 'Gaming',
        logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111612.png',
        salary: '20 – 35 triệu', location: 'Quận 1, TP.HCM',
        workType: 'Toàn thời gian', exp: '2 – 4 năm', size: '500–1000 nhân viên',
        tags: ['JavaScript', 'WebGL', 'Three.js'],
        badge: 'hot', ai: null, deadline: 4, posted: 'Hôm nay'
    },
    {
        id: 14, title: 'Web Developer (ReactJS + Laravel)',
        company: 'VNPT Technology', sector: 'Viễn thông',
        logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968705.png',
        salary: '12 – 20 triệu', location: 'Đống Đa, Hà Nội',
        workType: 'Toàn thời gian', exp: '1 – 3 năm', size: '1000+ nhân viên',
        tags: ['ReactJS', 'PHP', 'Laravel'],
        badge: null, ai: null, deadline: 14, posted: '5 ngày trước'
    },
    {
        id: 15, title: 'UI Developer – Banking App (ReactJS)',
        company: 'Techcombank', sector: 'Ngân hàng',
        logo: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
        salary: '22 – 38 triệu', location: 'Hoàn Kiếm, Hà Nội',
        workType: 'Toàn thời gian', exp: '2 – 4 năm', size: '5000+ nhân viên',
        tags: ['ReactJS', 'Figma', 'Agile'],
        badge: 'ai', ai: 85, deadline: 9, posted: '3 ngày trước'
    },
    {
        id: 16, title: 'Fullstack JS Developer (Next.js + NestJS)',
        company: 'Nashtech Vietnam', sector: 'Outsourcing',
        logo: 'https://cdn-icons-png.flaticon.com/512/732/732221.png',
        salary: '25 – 42 triệu', location: 'Quận 3, TP.HCM',
        workType: 'Hybrid', exp: '3 – 5 năm', size: '200–500 nhân viên',
        tags: ['Next.js', 'NestJS', 'TypeScript'],
        badge: null, ai: null, deadline: 22, posted: '1 tuần trước'
    },
];

const PER_PAGE = 8;
let currentPage = 1;
let currentJobs = [...JOBS];

function deadlineLabel(d) {
    if (d <= 2) return { text: `Còn ${d} ngày`, urgent: true };
    if (d <= 7) return { text: `Còn ${d} ngày`, urgent: false };
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

function renderJobs() {
    const grid = document.getElementById('jobsGrid');
    const start = (currentPage - 1) * PER_PAGE;
    const slice = currentJobs.slice(start, start + PER_PAGE);

    grid.innerHTML = slice.map(job => {
        const dl = deadlineLabel(job.deadline);
        return `
    <div class="job-card ${cardClass(job)}">
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
        <button class="save-btn" onclick="event.stopPropagation();toggleSave(this)"><i class="ti ti-bookmark"></i></button>
      </div>
      <div class="card-deadline-row">
        <span class="deadline-chip ${dl.urgent ? 'urgent' : ''}">
          <i class="ti ti-${dl.urgent ? 'alarm' : 'calendar'}"></i>${dl.text}
        </span>
      </div>
    </div>`;
    }).join('');

    renderPagination();
}

function renderPagination() {
    const total = Math.ceil(currentJobs.length / PER_PAGE);
    const pg = document.getElementById('pagination');
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
    renderJobs();
    document.querySelector('.results-area').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function toggleSave(btn) {
    btn.classList.toggle('saved');
    btn.innerHTML = btn.classList.contains('saved')
        ? '<i class="ti ti-bookmark-filled"></i>'
        : '<i class="ti ti-bookmark"></i>';
}

function sortJobs(v) {
    if (v === 'newest') currentJobs = [...currentJobs].sort((a, b) => b.id - a.id);
    else if (v === 'salary-desc') currentJobs = [...currentJobs].sort((a, b) => parseInt(b.salary) - parseInt(a.salary));
    else if (v === 'salary-asc') currentJobs = [...currentJobs].sort((a, b) => parseInt(a.salary) - parseInt(b.salary));
    else currentJobs = [...JOBS];
    currentPage = 1; renderJobs();
}

function setView(v) {
    const grid = document.getElementById('jobsGrid');
    document.getElementById('btnGrid').classList.toggle('active', v === 'grid');
    document.getElementById('btnList').classList.toggle('active', v === 'list');
    if (v === 'list') {
        grid.style.gridTemplateColumns = '1fr';
    } else {
        grid.style.gridTemplateColumns = 'repeat(2,1fr)';
    }
}

function quickSearch(kw) {
    document.getElementById('searchInput').value = kw;
    doSearch();
}

function doSearch() {
    const kw = document.getElementById('searchInput').value.toLowerCase().trim();
    currentJobs = kw
        ? JOBS.filter(j => j.title.toLowerCase().includes(kw) || j.company.toLowerCase().includes(kw) || j.tags.some(t => t.toLowerCase().includes(kw)))
        : [...JOBS];
    document.getElementById('totalCount').textContent = currentJobs.length.toLocaleString();
    currentPage = 1; renderJobs();
}

function resetGroup(id) {
    document.querySelectorAll(`#${id} input`).forEach(cb => cb.checked = false);
}
function resetAll() {
    document.querySelectorAll('.sidebar-scroll input[type="checkbox"]').forEach(cb => cb.checked = false);
}

renderJobs();