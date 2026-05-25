const SESSION_KEY      = 'vietjob_session';
const APPLIED_KEY_PREFIX = 'vietjob_applied:';

// Dữ liệu mẫu cho việc làm đã ứng tuyển (giống ảnh)
const DEMO_APPLIED_JOBS = [
  {
    id: 1,
    title: 'Senior UI Designer',
    company: 'TechCore Solutions Ltd.',
    date: '15 Th05, 2024',
    status: 'interview',
    statusText: 'MỚI PHỎNG VẤN'
  },
  {
    id: 2,
    title: 'Product Architect',
    company: 'GreenLeaf Agency',
    date: '12 Th05, 2024',
    status: 'viewed',
    statusText: 'CV ĐÃ XEM'
  },
  {
    id: 3,
    title: 'UX Researcher',
    company: 'NextGen FinTech',
    date: '10 Th05, 2024',
    status: 'submitted',
    statusText: 'ĐÃ NỘP'
  },
  {
    id: 4,
    title: 'Visual Designer',
    company: 'SkyTrail Travel Co.',
    date: '08 Th05, 2024',
    status: 'submitted',
    statusText: 'ĐÃ NỘP'
  },
];

/* ── HELPERS ── */
function getSession() {
  try {
    const ls = localStorage.getItem(SESSION_KEY);
    if (ls) return JSON.parse(ls);
    const ss = sessionStorage.getItem(SESSION_KEY);
    if (ss) return JSON.parse(ss);
  } catch {}
  return null;
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  sessionStorage.removeItem(SESSION_KEY);
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return parts[parts.length - 1].charAt(0).toUpperCase();
}

function getAppliedJobs(email) {
  const key = APPLIED_KEY_PREFIX + email;
  const data = localStorage.getItem(key);
  if (!data) {
    // Lần đầu: lưu dữ liệu mẫu
    localStorage.setItem(key, JSON.stringify(DEMO_APPLIED_JOBS));
    return DEMO_APPLIED_JOBS;
  }
  return JSON.parse(data);
}

function saveAppliedJobs(email, jobs) {
  localStorage.setItem(APPLIED_KEY_PREFIX + email, JSON.stringify(jobs));
}

/* ── RENDER FUNCTIONS ── */
function renderAppliedJobs(filter = 'all') {
  const session = getSession();
  if (!session) return;

  const email = session.email;
  const allJobs = getAppliedJobs(email);
  
  let filteredJobs = allJobs;
  if (filter === 'submitted') {
    filteredJobs = allJobs.filter(job => job.status === 'submitted');
  } else if (filter === 'viewed') {
    filteredJobs = allJobs.filter(job => job.status === 'viewed');
  } else if (filter === 'interview') {
    filteredJobs = allJobs.filter(job => job.status === 'interview');
  }

  const container = document.getElementById('applied-jobs-list');
  if (!container) return;

  if (filteredJobs.length === 0) {
    container.innerHTML = `<div class="empty-state">Bạn chưa ứng tuyển công việc nào.</div>`;
    return;
  }

  container.innerHTML = filteredJobs.map(job => {
    let statusClass = '';
    if (job.status === 'interview') statusClass = 'status-interview';
    else if (job.status === 'viewed') statusClass = 'status-viewed';
    else statusClass = 'status-submitted';

    return `
      <div class="applied-job-item">
        <div class="job-info">
          <h4>${job.title}</h4>
          <p>${job.company} • ${job.date}</p>
        </div>
        <div class="job-status">
          <span class="status-badge ${statusClass}">${job.statusText}</span>
          <button class="btn-detail" data-id="${job.id}">Chi tiết</button>
        </div>
      </div>
    `;
  }).join('');

  // Gắn sự kiện cho nút Chi tiết
  document.querySelectorAll('.btn-detail').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const id = parseInt(btn.getAttribute('data-id'));
      alert(`Xem chi tiết công việc ID: ${id}`);
      // Có thể chuyển hướng đến trang chi tiết job
    });
  });
}

/* ── FILTER BUTTONS ── */
function initFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');
      // Cập nhật active class
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Render lại theo filter
      renderAppliedJobs(filter);
    });
  });
}

/* ── LOGOUT & SIDEBAR ── */
function handleLogout(e) {
  e.preventDefault();
  clearSession();
  location.href = '../index.html';
}

/* ── MAIN ── */
document.addEventListener('DOMContentLoaded', () => {
  const session = getSession();

  // Kiểm tra đăng nhập
  if (!session) {
    const guard = document.getElementById('auth-guard');
    if (guard) guard.style.display = 'flex';
    setTimeout(() => { location.href = '../index.html'; }, 1500);
    return;
  }

  const email = session.email;
  const fullName = session.hoten || 'Thành viên';

  // RENDER NAVBAR (giống index, chỉ 3 mục + nút NTD)
  const navActions = document.getElementById('nav-actions');
  if (navActions) {
    const initials = getInitials(fullName);
    navActions.innerHTML = `
      <div class="user-menu" id="user-menu">
        <button class="user-btn" id="user-btn">
          <div class="user-avatar">${initials}</div>
          <span class="user-name">${fullName}</span>
          <i class="ti ti-chevron-down" style="font-size:14px;color:var(--purple)"></i>
        </button>
        <div class="user-dropdown" id="user-dropdown">
          <div class="ud-header">
            <div class="ud-name">${fullName}</div>
            <div class="ud-email">${email}</div>
          </div>
          <a class="ud-link" href="profile.html"><i class="ti ti-user"></i> Hồ sơ cá nhân</a>
          <a class="ud-link" href="profile.html?tab=settings"><i class="ti ti-settings"></i> Cài đặt</a>
          <div class="ud-divider"></div>
          <a class="ud-link ud-logout" href="#" id="logout-btn-nav"><i class="ti ti-logout"></i> Đăng xuất</a>
        </div>
      </div>
      <button class="btn-ntd">NHÀ TUYỂN DỤNG</button>
    `;

    document.getElementById('user-btn').addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('user-menu').classList.toggle('open');
    });
    document.addEventListener('click', () => {
      const m = document.getElementById('user-menu');
      if (m) m.classList.remove('open');
    });
    document.getElementById('logout-btn-nav')?.addEventListener('click', handleLogout);
  }

  // SIDEBAR
  document.getElementById('sidebar-avatar-box').textContent = getInitials(fullName);
  document.getElementById('sidebar-fullname').textContent = fullName;
  document.getElementById('sidebar-email').textContent = email;
  document.getElementById('sidebar-logout')?.addEventListener('click', handleLogout);

  // MEGA DROPDOWN HOVER
  document.querySelectorAll('.nav-item').forEach(item => {
    let t;
    item.addEventListener('mouseenter', () => { clearTimeout(t); item.classList.add('open'); });
    item.addEventListener('mouseleave', () => { t = setTimeout(() => item.classList.remove('open'), 120); });
  });

  // Khởi tạo filters và render
  initFilters();
  renderAppliedJobs('all');

  // Cập nhật số lượng trên các nút filter (tuỳ chọn)
  const allJobs = getAppliedJobs(email);
  const countSubmitted = allJobs.filter(j => j.status === 'submitted').length;
  const countViewed = allJobs.filter(j => j.status === 'viewed').length;
  const countInterview = allJobs.filter(j => j.status === 'interview').length;
  
  const filterAll = document.querySelector('.filter-btn[data-filter="all"]');
  const filterSub = document.querySelector('.filter-btn[data-filter="submitted"]');
  const filterView = document.querySelector('.filter-btn[data-filter="viewed"]');
  const filterInt = document.querySelector('.filter-btn[data-filter="interview"]');
  
  if (filterAll) filterAll.innerHTML = `Tất cả (${allJobs.length})`;
  if (filterSub) filterSub.innerHTML = `Đã nộp (${countSubmitted})`;
  if (filterView) filterView.innerHTML = `Đã xem hồ sơ (${countViewed})`;
  if (filterInt) filterInt.innerHTML = `Mời phỏng vấn (${countInterview})`;
});