// ========== SESSION ==========
const SESSION_KEY = 'vietjob_session';

function getSession() {
    try {
        const ls = localStorage.getItem(SESSION_KEY);
        if (ls) return JSON.parse(ls);
        const ss = sessionStorage.getItem(SESSION_KEY);
        if (ss) return JSON.parse(ss);
    } catch(e) { return null; }
}

function clearSession() {
    localStorage.removeItem(SESSION_KEY);
    sessionStorage.removeItem(SESSION_KEY);
}

function updateNavActions() {
    const navActions = document.getElementById('nav-actions');
    if (!navActions) return;
    const session = getSession();
    if (session) {
        const initials = session.hoten ? session.hoten.trim().split(' ').slice(-1)[0][0].toUpperCase() : '?';
        navActions.innerHTML = `
            <div class="user-menu" id="user-menu">
                <button class="user-btn" id="user-btn">
                    <div class="user-avatar">${initials}</div>
                    <span class="user-name">${escapeHtml(session.hoten)}</span>
                    <i class="ti ti-chevron-down" style="font-size:14px;color:var(--purple)"></i>
                </button>
                <div class="user-dropdown" id="user-dropdown">
                    <div class="ud-header">
                        <div class="ud-name">${escapeHtml(session.hoten)}</div>
                        <div class="ud-email">${escapeHtml(session.email)}</div>
                    </div>
                    <!-- Không hiển thị Thông tin cá nhân khi đang ở profile -->
                    <a class="ud-link" href="#" id="settings-link"><i class="ti ti-settings"></i> Cài đặt</a>
                    <div class="ud-divider"></div>
                    <a class="ud-link ud-logout" href="#" id="logout-btn"><i class="ti ti-logout"></i> Đăng xuất</a>
                </div>
            </div>
            <button class="btn-ntd">NHÀ TUYỂN DỤNG</button>
        `;
        const userBtn = document.getElementById('user-btn');
        if(userBtn) {
            userBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                document.getElementById('user-menu').classList.toggle('open');
            });
        }
        document.addEventListener('click', () => {
            const m = document.getElementById('user-menu');
            if(m) m.classList.remove('open');
        });
        const logoutBtn = document.getElementById('logout-btn');
        if(logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                clearSession();
                window.location.href = '../index.html';
            });
        }
        // Xử lý click Cài đặt từ dropdown khi đang ở profile
        const settingsLink = document.getElementById('settings-link');
        if (settingsLink) {
            settingsLink.addEventListener('click', (e) => {
                e.preventDefault();
                // Chuyển hướng đến profile với query param tab=settings
                window.location.href = './profile.html?tab=settings';
            });
        }
    } else {
        navActions.innerHTML = `
            <button class="btn-outline" onclick="location.href='../dangky.html'">Đăng ký</button>
            <button class="btn-solid" onclick="location.href='../dangnhap.html'">Đăng nhập</button>
            <button class="btn-ntd">NHÀ TUYỂN DỤNG</button>
        `;
    }
}

function updateSidebarUserInfo() {
    const session = getSession();
    if (session) {
        const avatarEl = document.getElementById('sidebar-avatar');
        const nameEl = document.getElementById('sidebar-name');
        const emailEl = document.getElementById('sidebar-email');
        if (avatarEl) {
            const initial = session.hoten ? session.hoten.trim().split(' ').slice(-1)[0][0].toUpperCase() : '?';
            avatarEl.textContent = initial;
        }
        if (nameEl) nameEl.textContent = session.hoten || 'Người dùng';
        if (emailEl) emailEl.textContent = session.email || '';
    }
}

function escapeHtml(str) {
    if(!str) return '';
    return str.replace(/[&<>]/g, function(m) {
        if(m === '&') return '&amp;';
        if(m === '<') return '&lt;';
        if(m === '>') return '&gt;';
        return m;
    });
}

// ========== LOAD NỘI DUNG TỪ FILE CON (SỬA LỖI contentArea) ==========
function loadContent(page) {
    const contentArea = document.getElementById('content-area'); // ✅ PHẢI CÓ
    if (!contentArea) return;

    let file = '';
    switch(page) {
        case 'dashboard': file = 'Dashboard.html'; break;
        case 'saved-jobs': file = 'Save-Jobs.html'; break;
        case 'applied-jobs': file = 'Applied-Jobs.html'; break;
        case 'manage-cv': file = 'Manage-CV.html'; break;
        case 'employer-views': file = 'Employer-Views.html'; break;
        case 'settings': file = 'Setting.html'; break;
        default: file = 'Dashboard.html';
    }

    console.log('Đang tải:', file);

    contentArea.innerHTML = `<div class="placeholder-message"><span class="mat-icon">hourglass_empty</span><p>Đang tải...</p></div>`;

    fetch(file)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP ${response.status} - Không tìm thấy ${file}`);
            return response.text();
        })
        .then(html => {
            contentArea.innerHTML = html;
        })
        .catch(error => {
            console.error('Lỗi tải file:', error);
            contentArea.innerHTML = `
                <div class="placeholder-message">
                    <span class="mat-icon" style="font-size:48px;color:var(--gray-300);">error</span>
                    <h3>Không thể tải nội dung</h3>
                    <p>File <strong>${file}</strong> không tồn tại hoặc có lỗi.<br>Chi tiết: ${error.message}</p>
                </div>
            `;
        });
}

function initSidebar() {
    const menuItems = document.querySelectorAll('.sidebar-menu li[data-page]');
    const logoutSidebar = document.getElementById('logout-sidebar');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            menuItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            const page = item.getAttribute('data-page');
            loadContent(page);
        });
    });

    if(logoutSidebar) {
        logoutSidebar.addEventListener('click', (e) => {
            e.preventDefault();
            clearSession();
            window.location.href = '../index.html';
        });
    }

    // Chỉ load dashboard mặc định nếu không có tham số tab=settings trên URL
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tab') !== 'settings') {
        const defaultActive = document.querySelector('.sidebar-menu li[data-page="dashboard"]');
        if (defaultActive) {
            defaultActive.classList.add('active');
            loadContent('dashboard');
        }
    }
}

function initDropdownHover() {
    document.querySelectorAll('.nav-item').forEach(item => {
        let t;
        item.addEventListener('mouseenter', () => { clearTimeout(t); item.classList.add('open'); });
        item.addEventListener('mouseleave', () => { t = setTimeout(() => item.classList.remove('open'), 120); });
    });
}

// ========== KHỞI TẠO ==========
document.addEventListener('DOMContentLoaded', () => {
    updateNavActions();
    updateSidebarUserInfo();
    initSidebar();
    initDropdownHover();

    // Xử lý tham số URL để tự động mở cài đặt
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('tab') === 'settings') {
        // Nếu sidebar có mục settings thì active (hiện tại không có, nhưng vẫn load nội dung)
        const settingsMenuItem = document.querySelector('.sidebar-menu li[data-page="settings"]');
        if (settingsMenuItem) {
            document.querySelectorAll('.sidebar-menu li').forEach(i => i.classList.remove('active'));
            settingsMenuItem.classList.add('active');
        }
        loadContent('settings');
    }
});