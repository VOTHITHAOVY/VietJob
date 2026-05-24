// Profile/Js/Setting.js
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

function getProfile(email) {
  try {
    const data = localStorage.getItem(PROFILE_KEY + ':' + email);
    return data ? JSON.parse(data) : {};
  } catch { return {}; }
}

function saveProfile(email, profile) {
  localStorage.setItem(PROFILE_KEY + ':' + email, JSON.stringify(profile));
}

// Khởi tạo dữ liệu mẫu nếu chưa có
function initProfileData(session) {
  let profile = getProfile(session.email);
  if (Object.keys(profile).length === 0) {
    profile = {
      fullname: session.hoten || '',
      email: session.email || '',
      phone: session.phone || '',
      dob: session.dob || '',
      address: '',
      bio: '',
      jobTitle: '',
      company: '',
      notification_email: true,
      notification_job: true,
      notification_promotion: false,
      theme: 'light',
      language: 'vi',
      github: '',
      linkedin: '',
      facebook: ''
    };
    saveProfile(session.email, profile);
  }
  return profile;
}

// Render nội dung của từng category
function renderContent(category, profile) {
  const container = document.getElementById('settings-content');
  let html = '';
  switch(category) {
    case 'profile':
      html = `
        <div class="setting-section active" id="section-profile">
          <h2>Thông tin cá nhân</h2>
          <div class="form-group">
            <label>Họ và tên</label>
            <input type="text" id="fullname" value="${escapeHtml(profile.fullname || '')}">
          </div>
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="email" value="${escapeHtml(profile.email || '')}" disabled>
            <small style="color:var(--gray-500);">Email không thể thay đổi</small>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label>Số điện thoại</label>
              <input type="tel" id="phone" value="${escapeHtml(profile.phone || '')}">
            </div>
            <div class="form-group">
              <label>Ngày sinh</label>
              <input type="date" id="dob" value="${profile.dob || ''}">
            </div>
          </div>
          <div class="form-group">
            <label>Địa chỉ</label>
            <input type="text" id="address" value="${escapeHtml(profile.address || '')}">
          </div>
          <div class="form-group">
            <label>Giới thiệu bản thân</label>
            <textarea id="bio" rows="3">${escapeHtml(profile.bio || '')}</textarea>
          </div>
        </div>
      `;
      break;
    case 'security':
      html = `
        <div class="setting-section active" id="section-security">
          <h2>Bảo mật</h2>
          <div class="form-group">
            <label>Mật khẩu hiện tại</label>
            <input type="password" id="current-pwd" placeholder="Nhập mật khẩu hiện tại">
          </div>
          <div class="form-group">
            <label>Mật khẩu mới</label>
            <input type="password" id="new-pwd" placeholder="Nhập mật khẩu mới">
          </div>
          <div class="form-group">
            <label>Xác nhận mật khẩu mới</label>
            <input type="password" id="confirm-pwd" placeholder="Nhập lại mật khẩu mới">
          </div>
          <div class="form-group">
            <label>Xác thực 2 bước</label>
            <div class="toggle-switch">
              <div>
                <div class="toggle-label">Bật xác thực 2 bước</div>
                <div class="toggle-desc">Tăng cường bảo mật cho tài khoản của bạn</div>
              </div>
              <label class="switch">
                <input type="checkbox" id="twofactor" ${profile.twofactor ? 'checked' : ''}>
                <span class="slider"></span>
              </label>
            </div>
          </div>
        </div>
      `;
      break;
    case 'privacy':
      html = `
        <div class="setting-section active" id="section-privacy">
          <h2>Quyền riêng tư</h2>
          <div class="toggle-switch">
            <div>
              <div class="toggle-label">Hiển thị hồ sơ công khai</div>
              <div class="toggle-desc">Cho phép nhà tuyển dụng tìm thấy bạn</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="public_profile" ${profile.public_profile !== false ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-switch">
            <div>
              <div class="toggle-label">Hiển thị số điện thoại</div>
              <div class="toggle-desc">Chỉ hiển thị với nhà tuyển dụng khi bạn ứng tuyển</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="show_phone" ${profile.show_phone ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-switch">
            <div>
              <div class="toggle-label">Cho phép tải CV</div>
              <div class="toggle-desc">Nhà tuyển dụng có thể tải CV của bạn</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="allow_cv_download" ${profile.allow_cv_download !== false ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>
      `;
      break;
    case 'notifications':
      html = `
        <div class="setting-section active" id="section-notifications">
          <h2>Thông báo</h2>
          <div class="toggle-switch">
            <div>
              <div class="toggle-label">Thông báo qua email</div>
              <div class="toggle-desc">Nhận thông báo qua email về việc làm phù hợp</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="noti_email" ${profile.notification_email !== false ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-switch">
            <div>
              <div class="toggle-label">Việc làm gợi ý</div>
              <div class="toggle-desc">Nhận gợi ý việc làm hàng ngày</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="noti_job" ${profile.notification_job !== false ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
          <div class="toggle-switch">
            <div>
              <div class="toggle-label">Khuyến mãi & sự kiện</div>
              <div class="toggle-desc">Nhận thông tin về các chương trình khuyến mãi</div>
            </div>
            <label class="switch">
              <input type="checkbox" id="noti_promo" ${profile.notification_promotion ? 'checked' : ''}>
              <span class="slider"></span>
            </label>
          </div>
        </div>
      `;
      break;
    case 'appearance':
      html = `
        <div class="setting-section active" id="section-appearance">
          <h2>Giao diện</h2>
          <div class="form-group">
            <label>Chủ đề màu</label>
            <select id="theme">
              <option value="light" ${profile.theme === 'light' ? 'selected' : ''}>Sáng</option>
              <option value="dark" ${profile.theme === 'dark' ? 'selected' : ''}>Tối</option>
            </select>
          </div>
          <div class="form-group">
            <label>Ngôn ngữ</label>
            <select id="language">
              <option value="vi" ${profile.language === 'vi' ? 'selected' : ''}>Tiếng Việt</option>
              <option value="en" ${profile.language === 'en' ? 'selected' : ''}>English</option>
            </select>
          </div>
        </div>
      `;
      break;
    case 'social':
      html = `
        <div class="setting-section active" id="section-social">
          <h2>Liên kết mạng xã hội</h2>
          <div class="social-link-item">
            <div class="social-icon"><i class="ti ti-brand-github"></i></div>
            <div class="social-input">
              <input type="text" id="github" placeholder="https://github.com/username" value="${escapeHtml(profile.github || '')}">
            </div>
            <div class="social-status">${profile.github ? 'Đã liên kết' : 'Chưa liên kết'}</div>
          </div>
          <div class="social-link-item">
            <div class="social-icon"><i class="ti ti-brand-linkedin"></i></div>
            <div class="social-input">
              <input type="text" id="linkedin" placeholder="https://linkedin.com/in/username" value="${escapeHtml(profile.linkedin || '')}">
            </div>
            <div class="social-status">${profile.linkedin ? 'Đã liên kết' : 'Chưa liên kết'}</div>
          </div>
          <div class="social-link-item">
            <div class="social-icon"><i class="ti ti-brand-facebook"></i></div>
            <div class="social-input">
              <input type="text" id="facebook" placeholder="https://facebook.com/username" value="${escapeHtml(profile.facebook || '')}">
            </div>
            <div class="social-status">${profile.facebook ? 'Đã liên kết' : 'Chưa liên kết'}</div>
          </div>
        </div>
      `;
      break;
    default:
      html = '<div class="loading">Chọn một mục</div>';
  }
  container.innerHTML = html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

function collectSettings(category, profile) {
  const newProfile = { ...profile };
  switch(category) {
    case 'profile':
      newProfile.fullname = document.getElementById('fullname')?.value || '';
      newProfile.phone = document.getElementById('phone')?.value || '';
      newProfile.dob = document.getElementById('dob')?.value || '';
      newProfile.address = document.getElementById('address')?.value || '';
      newProfile.bio = document.getElementById('bio')?.value || '';
      break;
    case 'security':
      const currentPwd = document.getElementById('current-pwd')?.value;
      const newPwd = document.getElementById('new-pwd')?.value;
      const confirmPwd = document.getElementById('confirm-pwd')?.value;
      if (newPwd && newPwd === confirmPwd) {
        // Giả lập lưu mật khẩu (thực tế cần gửi API)
        localStorage.setItem('temp_new_pwd', newPwd);
        alert('Mật khẩu đã được thay đổi (demo)');
      } else if (newPwd && newPwd !== confirmPwd) {
        alert('Mật khẩu xác nhận không khớp');
      }
      newProfile.twofactor = document.getElementById('twofactor')?.checked || false;
      break;
    case 'privacy':
      newProfile.public_profile = document.getElementById('public_profile')?.checked || false;
      newProfile.show_phone = document.getElementById('show_phone')?.checked || false;
      newProfile.allow_cv_download = document.getElementById('allow_cv_download')?.checked || false;
      break;
    case 'notifications':
      newProfile.notification_email = document.getElementById('noti_email')?.checked || false;
      newProfile.notification_job = document.getElementById('noti_job')?.checked || false;
      newProfile.notification_promotion = document.getElementById('noti_promo')?.checked || false;
      break;
    case 'appearance':
      newProfile.theme = document.getElementById('theme')?.value || 'light';
      newProfile.language = document.getElementById('language')?.value || 'vi';
      if (newProfile.theme === 'dark') {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
      break;
    case 'social':
      newProfile.github = document.getElementById('github')?.value || '';
      newProfile.linkedin = document.getElementById('linkedin')?.value || '';
      newProfile.facebook = document.getElementById('facebook')?.value || '';
      break;
  }
  return newProfile;
}

// Khởi tạo
const session = getSession();
if (!session) {
  alert('Vui lòng đăng nhập để truy cập trang cài đặt');
  window.location.href = '../dangnhap.html';
} else {
  let profile = initProfileData(session);
  let currentCategory = 'profile';

  // Render ban đầu
  renderContent(currentCategory, profile);

  // Xử lý click chọn danh mục
  const categories = document.querySelectorAll('.settings-category');
  categories.forEach(cat => {
    cat.addEventListener('click', () => {
      // Lưu dữ liệu hiện tại trước khi chuyển tab
      const newProfile = collectSettings(currentCategory, profile);
      profile = { ...profile, ...newProfile };
      saveProfile(session.email, profile);

      // Cập nhật active
      categories.forEach(c => c.classList.remove('active'));
      cat.classList.add('active');
      currentCategory = cat.dataset.category;
      renderContent(currentCategory, profile);
    });
  });

  // Nút Hủy: reset về dữ liệu đã lưu
  document.getElementById('cancel-settings')?.addEventListener('click', () => {
    profile = getProfile(session.email);
    renderContent(currentCategory, profile);
    alert('Đã hủy thay đổi');
  });

  // Nút Lưu: lưu toàn bộ
  document.getElementById('save-settings')?.addEventListener('click', () => {
    const newProfile = collectSettings(currentCategory, profile);
    profile = { ...profile, ...newProfile };
    saveProfile(session.email, profile);
    alert('Đã lưu thay đổi thành công');
    renderContent(currentCategory, profile);
  });
}