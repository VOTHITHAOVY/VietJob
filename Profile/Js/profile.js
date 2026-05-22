const SESSION_KEY = 'vietjob_session';
const PROFILE_KEY = 'vietjob_profile';

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

function getProfile(email) {
  try {
    const data = localStorage.getItem(PROFILE_KEY + ':' + email);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
}

function calcCompletion(session, profile) {
  let score = 0;
  const checks = [
    session.hoten,
    session.email,
    profile.phone,
    profile.dob,
    profile.address,
    profile.title,
    profile.bio,
    (profile.skills && profile.skills.length > 0),
  ];
  checks.forEach(c => { if (c) score += 1; });
  return Math.round((score / checks.length) * 100);
}

function getInitials(name) {
  if (!name) return '?';
  const parts = name.trim().split(' ');
  return parts[parts.length - 1][0].toUpperCase();
}

function getFirstName(name) {
  if (!name) return 'bạn';
  const parts = name.trim().split(' ');
  return parts[parts.length - 1];
}

// ── INIT ──
const session = getSession();

if (!session) {
  document.getElementById('auth-guard').style.display = 'flex';
  setTimeout(() => location.href = '../dangnhap.html', 2000);
} else {
  const profile = getProfile(session.email);
  const completion = calcCompletion(session, profile);
  const initials = getInitials(session.hoten);
  const firstName = getFirstName(session.hoten);

  // Sidebar
  document.getElementById('sb-avatar').textContent = initials;
  document.getElementById('sb-name').textContent = session.hoten || 'Người dùng';
  document.getElementById('sb-id').textContent = '#' + (session.id || session.email.slice(0, 6).toUpperCase());
  document.getElementById('sb-email').textContent = session.email;
  document.getElementById('sb-progress-val').textContent = completion + '%';
  document.getElementById('sb-progress-bar').style.width = completion + '%';

  // Welcome
  document.getElementById('welcome-firstname').textContent = firstName;

  // Stats — lấy từ localStorage nếu có
  const savedJobs = JSON.parse(localStorage.getItem('vietjob_saved:' + session.email) || '[]');
  const appliedJobs = JSON.parse(localStorage.getItem('vietjob_applied:' + session.email) || '[]');
  document.getElementById('stat-views').textContent = profile.views || Math.floor(Math.random()*50 + 10);
  document.getElementById('stat-saved').textContent = savedJobs.length;
  document.getElementById('stat-applied').textContent = appliedJobs.length;

  // Completion
  document.getElementById('completion-val').textContent = completion + '%';
  document.getElementById('completion-badge').textContent = completion + '%';
  document.getElementById('completion-bar').style.width = completion + '%';

  // CV name
  const cvName = session.hoten ? session.hoten + ' - CV' : 'CV chính';
  document.getElementById('cv-name-1').textContent = cvName;

  // Applications table
  const tbody = document.getElementById('applications-tbody');
  if (appliedJobs.length > 0) {
    tbody.innerHTML = appliedJobs.map(j => `
      <tr>
        <td><a class="job-link" href="#">${j.title}</a></td>
        <td>${j.company}</td>
        <td>${j.date || 'N/A'}</td>
        <td><span class="status-badge ${j.status === 'Phỏng vấn' ? 'status-interview' : j.status === 'Từ chối' ? 'status-rejected' : 'status-submitted'}">${j.status || 'Đã nộp'}</span></td>
      </tr>
    `).join('');
  }

  // Navbar
  const navActions = document.getElementById('nav-actions');
  navActions.innerHTML = `
    <div class="user-menu" id="user-menu">
      <button class="user-btn" id="user-btn">
        <div class="user-avatar">${initials}</div>
        <span class="user-name">${session.hoten}</span>
        <i class="ti ti-chevron-down" style="font-size:14px;color:var(--purple)"></i>
      </button>
      <div class="user-dropdown" id="user-dropdown">
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
