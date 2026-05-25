// Dashboard JS - hiển thị tổng quan hồ sơ cá nhân
(function() {
  const SESSION_KEY = 'vietjob_session';

  function getSession() {
    try {
      const ls = localStorage.getItem(SESSION_KEY);
      if (ls) return JSON.parse(ls);
      const ss = sessionStorage.getItem(SESSION_KEY);
      if (ss) return JSON.parse(ss);
    } catch(e) { return null; }
  }

  // Lấy tên người dùng từ session
  const session = getSession();
  if (session && session.hoten) {
    const nameSpan = document.getElementById('user-name-display');
    if (nameSpan) {
      let fullName = session.hoten.trim();
      let parts = fullName.split(' ');
      let displayName = parts.length > 1 ? parts.slice(-1)[0] : fullName;
      nameSpan.textContent = displayName;
    }
  }

  // Dữ liệu mẫu (sau này thay bằng API thật)
  const profileData = {
    stats: {
      views: 124,
      savedJobs: 18,
      appliedJobs: 5
    },
    personalInfo: {
      fullName: session?.hoten || 'Nguyễn Văn A',
      email: session?.email || 'vana@example.com',
      phone: '0901 234 567',
      address: 'Quận 1, TP. Hồ Chí Minh',
      birthday: '15/05/1995'
    },
    skills: ['JavaScript (React, Vue)', 'HTML5/CSS3', 'UI/UX Design', 'Node.js', 'Responsive Design', 'Git'],
    education: [
      { degree: 'Kỹ sư Công nghệ thông tin', major: 'Đại học Bách Khoa HCM', year: '2013 - 2018' },
      { degree: 'Chứng chỉ Frontend nâng cao', major: 'FPT Aptech', year: '2019' }
    ],
    careerGoal: 'Trở thành chuyên gia Frontend leader, đóng góp vào các sản phẩm công nghệ cao, xây dựng đội ngũ mạnh mẽ.',
    languages: [
      { name: 'Tiếng Việt', level: 'Bản địa' },
      { name: 'Tiếng Anh', level: 'IELTS 7.0 (Giao tiếp chuyên nghiệp)' }
    ]
  };

  // Cập nhật thống kê
  function updateStats(views, saved, applied) {
    const viewsEl = document.getElementById('stat-views');
    const savedEl = document.getElementById('stat-saved');
    const appliedEl = document.getElementById('stat-applied');
    if (viewsEl) viewsEl.innerText = views;
    if (savedEl) savedEl.innerText = saved;
    if (appliedEl) appliedEl.innerText = applied;
  }

  // Hiển thị thông tin cá nhân
  function renderPersonalInfo(info) {
    const container = document.getElementById('profile-info');
    if (!container) return;
    container.innerHTML = `
      <div class="info-item"><div class="info-label">Họ tên</div><div class="info-value">${escapeHtml(info.fullName)}</div></div>
      <div class="info-item"><div class="info-label">Email</div><div class="info-value">${escapeHtml(info.email)}</div></div>
      <div class="info-item"><div class="info-label">Số điện thoại</div><div class="info-value">${escapeHtml(info.phone)}</div></div>
      <div class="info-item"><div class="info-label">Địa chỉ</div><div class="info-value">${escapeHtml(info.address)}</div></div>
      <div class="info-item"><div class="info-label">Ngày sinh</div><div class="info-value">${escapeHtml(info.birthday)}</div></div>
    `;
  }

  // Render kỹ năng dạng tag
  function renderSkills(skills) {
    const container = document.getElementById('skills-list');
    if (!container) return;
    container.innerHTML = skills.map(skill => `<span class="skill-tag">${escapeHtml(skill)}</span>`).join('');
  }

  // Render học vấn
  function renderEducation(educations) {
    const container = document.getElementById('education-list');
    if (!container) return;
    container.innerHTML = educations.map(edu => `
      <div class="education-item">
        <div>
          <div class="edu-degree">${escapeHtml(edu.degree)}</div>
          <div class="edu-major">${escapeHtml(edu.major)}</div>
        </div>
        <div class="edu-year">${escapeHtml(edu.year)}</div>
      </div>
    `).join('');
  }

  // Render ngôn ngữ
  function renderLanguages(langs) {
    const container = document.getElementById('languages-list');
    if (!container) return;
    container.innerHTML = langs.map(lang => `
      <div class="lang-item">
        <span class="lang-name">${escapeHtml(lang.name)}</span>
        <span class="lang-level">${escapeHtml(lang.level)}</span>
      </div>
    `).join('');
  }

  // Helper bảo mật
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // Khởi tạo dashboard (có thể thay bằng async fetch sau)
  function initDashboard() {
    updateStats(profileData.stats.views, profileData.stats.savedJobs, profileData.stats.appliedJobs);
    renderPersonalInfo(profileData.personalInfo);
    renderSkills(profileData.skills);
    renderEducation(profileData.education);
    renderLanguages(profileData.languages);
    document.getElementById('career-goal').innerHTML = `<p>${escapeHtml(profileData.careerGoal)}</p>`;
  }

  initDashboard();
})();