const SESSION_KEY = 'vietjob_session';
const SAVED_KEY_PREFIX = 'vietjob_saved:';

/* ── DEMO jobs (khi user chưa có job đã lưu nào, thêm mẫu) ── */
const DEMO_JOBS = [
  { id: 1, title: 'Senior Product Designer', company: 'Spotify', location: 'Stockholm, Sweden (Remote)', salary: '$80,000 - $120,000', type: 'Full-time', savedDate: '12/10/2024', logo: 'https://logo.clearbit.com/spotify.com?size=80' },
  { id: 2, title: 'UI/UX Architect', company: 'Airbnb', location: 'San Francisco, USA', salary: '$110,000 - $150,000', type: 'Contract', savedDate: '10/10/2024', logo: 'https://logo.clearbit.com/airbnb.com?size=80' },
  { id: 3, title: 'Visual Brand Lead', company: 'Notion', location: 'Remote (Worldwide)', salary: 'Thỏa thuận', type: 'Full-time', savedDate: '08/10/2024', logo: 'https://logo.clearbit.com/notion.so?size=80' },
];

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
  localStorage.removeItem(SESSION_KEY); sessionStorage.removeItem(SESSION_KEY);
}
function getSavedJobs(email) {
  try {
    const data = localStorage.getItem(SAVED_KEY_PREFIX + email);
    return data ? JSON.parse(data) : null;
  } catch { return null; }
}
function setSavedJobs(email, jobs) {
  localStorage.setItem(SAVED_KEY_PREFIX + email, JSON.stringify(jobs));
}
function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return parts[parts.length - 1][0].toUpperCase();
}
function calcCompletion(session) {
  let s = 0, total = 4;
  if (session.hoten) s++;
  if (session.email) s++;
  if (session.phone) s++;
  if (session.dob) s++;
  return Math.round((s / total) * 100);
}

let currentJobs = [];
let currentEmail = '';

function renderJobs() {
  const search = document.getElementById('search-input').value.toLowerCase();
  const typeFilter = document.getElementById('type-filter').value;

  let filtered = currentJobs.filter(j => {
    const matchSearch = !search || j.title.toLowerCase().includes(search) || j.company.toLowerCase().includes(search);
    const matchType = !typeFilter || j.type === typeFilter;
    return matchSearch && matchType;
  });

  document.getElementById('jobs-count').textContent = filtered.length;
  const container = document.getElementById('jobs-container');
  const emptyState = document.getElementById('empty-state');

  if (filtered.length === 0) {
    container.innerHTML = '';
    emptyState.style.display = 'flex';
    return;
  }
  emptyState.style.display = 'none';

  container.innerHTML = filtered.map(job => `
    <div class="job-card" data-id="${job.id}">
      <div class="job-logo">
        <img src="${job.logo}" alt="${job.company}"
          onerror="this.src='https://ui-avatars.com/api/?background=7C3AED&color=fff&name=${encodeURIComponent(job.company)}&size=64'">
      </div>
      <div class="job-body">
        <div class="job-title-row">
          <span class="job-title">${job.title}</span>
          <span class="job-type-badge ${job.type === 'Full-time' ? 'type-fulltime' : job.type === 'Contract' ? 'type-contract' : 'type-parttime'}">${job.type}</span>
        </div>
        <div class="job-company">${job.company} · ${job.location}</div>
        <div class="job-meta">
          <span class="job-meta-item"><span class="mat-icon">payments</span> ${job.salary}</span>
          <span class="job-meta-item"><span class="mat-icon">bookmark</span> Đã lưu: ${job.savedDate}</span>
        </div>
      </div>
      <div class="job-actions">
        <button class="apply-btn" onclick="applyJob(${job.id})">Ứng tuyển ngay</button>
        <button class="delete-btn" onclick="deleteJob(${job.id})" title="Xoá khỏi danh sách"><span class="mat-icon">delete_outline</span></button>
      </div>
    </div>
  `).join('');
}

function deleteJob(id) {
  const card = document.querySelector(`.job-card[data-id="${id}"]`);
  if (card) {
    card.classList.add('removing');
    setTimeout(() => {
      currentJobs = currentJobs.filter(j => j.id !== id);
      setSavedJobs(currentEmail, currentJobs);
      renderJobs();
    }, 280);
  }
}

function applyJob(id) {
  const job = currentJobs.find(j => j.id === id);
  if (!job) return;
  const APPLIED_KEY = 'vietjob_applied:' + currentEmail;
  const applied = JSON.parse(localStorage.getItem(APPLIED_KEY) || '[]');
  if (!applied.find(a => a.id === job.id)) {
    applied.push({ ...job, date: new Date().toLocaleDateString('vi-VN'), status: 'Đã nộp' });
    localStorage.setItem(APPLIED_KEY, JSON.stringify(applied));
  }
  const btn = document.querySelector(`.job-card[data-id="${id}"] .apply-btn`);
  if (btn) { btn.textContent = '✓ Đã ứng tuyển'; btn.style.background = '#DCFCE7'; btn.style.color = '#16A34A'; btn.disabled = true; }
}

// ── INIT ──
const session = getSession();
if (!session) {
  document.getElementById('auth-guard').style.display = 'flex';
  setTimeout(() => location.href = '../dangnhap.html', 2000);
} else {
  currentEmail = session.email;
  const initials = getInitials(session.hoten);
  const completion = calcCompletion(session);

  // Load saved jobs — nếu chưa có thì dùng demo
  let saved = getSavedJobs(session.email);
  if (saved === null) {
    saved = DEMO_JOBS;
    setSavedJobs(session.email, saved);
  }
  currentJobs = saved;

  // Sidebar
  document.getElementById('sb-avatar').textContent = initials;
  document.getElementById('sb-name').textContent = session.hoten || 'Người dùng';
  document.getElementById('sb-id').textContent = '#' + (session.id || session.email.slice(0,6).toUpperCase());
  document.getElementById('sb-email').textContent = session.email;
  document.getElementById('sb-progress-val').textContent = completion + '%';
  document.getElementById('sb-progress-bar').style.width = completion + '%';

  renderJobs();

  // Navbar
  const navActions = document.getElementById('nav-actions');
  navActions.innerHTML = `
    <div class="user-menu" id="user-menu">
      <button class="user-btn" id="user-btn">
        <div class="user-avatar">${initials}</div>
        <span class="user-name">${session.hoten}</span>
        <i class="ti ti-chevron-down" style="font-size:14px;color:var(--purple)"></i>
      </button>
      <div class="user-dropdown">
        <div class="ud-header">
          <div class="ud-name">${session.hoten}</div>
          <div class="ud-email">${session.email}</div>
        </div>
        <a class="ud-link" href="profile.html"><i class="ti ti-user"></i> Hồ sơ của tôi</a>
        <a class="ud-link" href="Save-Jobs.html"><i class="ti ti-bookmark"></i> Việc làm đã lưu</a>
        <a class="ud-link" href="#"><i class="ti ti-send"></i> Việc làm đã ứng tuyển</a>
        <a class="ud-link" href="#"><i class="ti ti-file-text"></i> CV của tôi</a>
        <div class="ud-divider"></div>
        <a class="ud-link ud-logout" href="#" id="logout-btn"><i class="ti ti-logout"></i> Đăng xuất</a>
      </div>
    </div>
    <button class="btn-ntd">NHÀ TUYỂN DỤNG</button>
  `;

  document.getElementById('user-btn').addEventListener('click', e => {
    e.stopPropagation();
    document.getElementById('user-menu').classList.toggle('open');
  });
  document.addEventListener('click', () => {
    const m = document.getElementById('user-menu');
    if (m) m.classList.remove('open');
  });
  document.getElementById('logout-btn').addEventListener('click', e => {
    e.preventDefault(); clearSession(); location.href = '../index.html';
  });
  document.getElementById('sidebar-logout').addEventListener('click', e => {
    e.preventDefault(); clearSession(); location.href = '../index.html';
  });
}
