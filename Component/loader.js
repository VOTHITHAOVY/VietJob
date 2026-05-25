// component/loader.js
async function loadComponent(placeholderId, filePath) {
  const el = document.getElementById(placeholderId);
  if (!el) return;
  try {
    const res = await fetch(filePath);
    if (!res.ok) throw new Error(`Không tải được ${filePath}: ${res.status}`);
    el.innerHTML = await res.text();
  } catch (err) {
    console.error('[Loader]', err);
  }
}

function initNavAuth() {
  const SESSION_KEY = 'vietjob_session';
  function getSession() {
    try {
      const ls = localStorage.getItem(SESSION_KEY);
      if (ls) return JSON.parse(ls);
      const ss = sessionStorage.getItem(SESSION_KEY);
      if (ss) return JSON.parse(ss);
    } catch { return null; }
  }
  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
  }
  const navActions = document.getElementById('nav-actions');
  if (!navActions) {
    console.warn('[initNavAuth] Không tìm thấy #nav-actions');
    return;
  }
  const session = getSession();
  const currentPath = window.location.pathname;
  const isProfilePage = currentPath.includes('profile.html') || currentPath.includes('Save-Jobs.html') || currentPath.includes('Setting.html');
  console.log('[initNavAuth] isProfilePage:', isProfilePage, 'session:', !!session);

  if (session) {
    if (isProfilePage) {
      navActions.innerHTML = `<button class="btn-ntd">NHÀ TUYỂN DỤNG</button>`;
      console.log('[initNavAuth] Ẩn user-btn (trang profile)');
    } else {
      const initials = session.hoten ? session.hoten.trim().split(' ').slice(-1)[0][0].toUpperCase() : '?';
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
            <a class="ud-link" href="/Page/Profile/Setting.html"><i class="ti ti-settings"></i> Cài đặt</a>
            <a class="ud-link" href="/Page/Profile/profile.html"><i class="ti ti-user"></i> Hồ sơ cá nhân</a>
            <div class="ud-divider"></div>
            <a class="ud-link ud-logout" href="#" id="logout-btn"><i class="ti ti-logout"></i> Đăng xuất</a>
          </div>
        </div>
        <button class="btn-ntd">NHÀ TUYỂN DỤNG</button>
      `;
      console.log('[initNavAuth] Hiển thị user-btn');
      const userBtn = document.getElementById('user-btn');
      if (userBtn) {
        userBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const menu = document.getElementById('user-menu');
          if (menu) menu.classList.toggle('open');
        });
      }
      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
          e.preventDefault();
          clearSession();
          window.location.href = '/index.html';
        });
      }
    }
  } else {
    navActions.innerHTML = `
      <button class="btn-outline" onclick="location.href='/Page/auth/dangky.html'">Đăng ký</button>
      <button class="btn-solid" onclick="location.href='/Page/auth/dangnhap.html'">Đăng nhập</button>
      <button class="btn-ntd">NHÀ TUYỂN DỤNG</button>
    `;
    console.log('[initNavAuth] Chưa đăng nhập');
  }
  document.addEventListener('click', () => {
    const menu = document.getElementById('user-menu');
    if (menu) menu.classList.remove('open');
  });
}

function initNavDropdowns() {
  document.querySelectorAll('.nav-item').forEach(item => {
    let t;
    item.addEventListener('mouseenter', () => { clearTimeout(t); item.classList.add('open'); });
    item.addEventListener('mouseleave', () => { t = setTimeout(() => item.classList.remove('open'), 120); });
  });
}

function initActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  function setActive(clickedLink) {
    document.querySelectorAll('.nav-links .nav-link').forEach(l => l.classList.remove('active'));
    clickedLink.classList.add('active');
  }

  document.querySelectorAll('.nav-links .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href || href === '#') return;

    // Lấy tên file từ href (bỏ dấu / ở đầu nếu có)
    const hrefPage = href.replace(/^\//, '').split('/').pop();

    // Tô màu theo trang hiện tại khi load
    const isHome = (hrefPage === 'index.html' || href === './') && (currentPage === 'index.html' || currentPage === '');
    const isMatch = hrefPage && hrefPage !== 'index.html' && currentPage === hrefPage;
    if (isHome || isMatch) {
      link.classList.add('active');
    }

    // Tô màu khi click
    link.addEventListener('click', () => setActive(link));
  });
}

(async function () {
  console.log('[loader] Đang tải header/footer...');
  await Promise.all([
    loadComponent('header-placeholder', '/Component/Header.html'),
    loadComponent('footer-placeholder', '/Component/Footer.html')
  ]);
  console.log('[loader] Tải xong, khởi tạo...');
  initNavAuth();
  initNavDropdowns();
  initActiveNavLink();
  document.dispatchEvent(new CustomEvent('componentsReady'));
})();