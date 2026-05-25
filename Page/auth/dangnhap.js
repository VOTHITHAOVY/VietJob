/* ============================================================
   STORAGE HELPERS
============================================================ */
const USERS_KEY    = 'vietjob_users';
const SESSION_KEY  = 'vietjob_session';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}

function findUser(email, pwd) {
  return getUsers().find(u =>
    u.email.toLowerCase() === email.toLowerCase() && u.pwd === pwd
  );
}

function saveSession(user, remember) {
  const session = { email: user.email, hoten: user.hoten, loginAt: new Date().toISOString() };
  if (remember) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
  }
}

/* ============================================================
   TOAST
============================================================ */
function showToast(msg, type = 'success') {
  const t  = document.getElementById('toast');
  const ic = document.getElementById('toast-icon');
  const m  = document.getElementById('toast-msg');
  t.className = 'toast show ' + type;
  ic.className = type === 'success' ? 'ti ti-circle-check' : 'ti ti-alert-circle';
  m.textContent = msg;
  setTimeout(() => t.classList.remove('show'), 3500);
}

/* ============================================================
   EYE TOGGLE
============================================================ */
document.getElementById('eye-btn').addEventListener('click', () => {
  const inp = document.getElementById('pwd');
  const ico = document.getElementById('eye-ico');
  inp.type = inp.type === 'password' ? 'text' : 'password';
  ico.className = inp.type === 'password' ? 'ti ti-eye' : 'ti ti-eye-off';
});

/* ============================================================
   FORM SUBMIT — kiểm tra tài khoản trong localStorage
============================================================ */
document.getElementById('login-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const email    = document.getElementById('email').value.trim();
  const pwd      = document.getElementById('pwd').value;
  const remember = document.getElementById('remember').checked;
  let ok = true;

  // Ẩn lỗi cũ
  document.getElementById('login-error').classList.remove('show');

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  document.getElementById('wrap-email').classList.toggle('err', !emailOk);
  document.getElementById('err-email').classList.toggle('show', !emailOk);
  if (!emailOk) ok = false;

  document.getElementById('wrap-pwd').classList.toggle('err', !pwd);
  document.getElementById('err-pwd').classList.toggle('show', !pwd);
  if (!pwd) ok = false;

  if (!ok) return;

  // Tìm user trong localStorage
  const user = findUser(email, pwd);

  if (!user) {
    // Hiện lỗi sai thông tin
    const errBox = document.getElementById('login-error');
    const errMsg = document.getElementById('login-error-msg');
    // Phân biệt: email có tồn tại không
    const emailRegistered = getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
    errMsg.textContent = emailRegistered
      ? 'Mật khẩu không đúng. Vui lòng thử lại hoặc đặt lại mật khẩu.'
      : 'Email này chưa được đăng ký. Hãy tạo tài khoản mới.';
    errBox.classList.add('show');
    // Shake animation
    document.getElementById('wrap-pwd').style.animation = 'none';
    document.getElementById('wrap-email').style.animation = 'none';
    return;
  }

  // ✅ Đăng nhập thành công — lưu session
  saveSession(user, remember);

  document.getElementById('success-name').textContent = user.hoten;
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('success-wrap').style.display = 'block';
});

/* ============================================================
   FORGOT PASSWORD MODAL
============================================================ */
document.getElementById('forgot-btn').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('forgot-modal').classList.add('show');
  document.getElementById('reset-note').className = 'modal-note';
  document.getElementById('reset-email').value = '';
  document.getElementById('wrap-reset-email').classList.remove('err');
  document.getElementById('err-reset-email').classList.remove('show');
});

document.getElementById('modal-close').addEventListener('click', () =>
  document.getElementById('forgot-modal').classList.remove('show')
);

document.getElementById('forgot-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('forgot-modal'))
    document.getElementById('forgot-modal').classList.remove('show');
});

document.getElementById('reset-btn').addEventListener('click', () => {
  const email   = document.getElementById('reset-email').value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const noteEl  = document.getElementById('reset-note');

  document.getElementById('wrap-reset-email').classList.toggle('err', !emailOk);
  document.getElementById('err-reset-email').classList.toggle('show', !emailOk);
  if (!emailOk) return;

  // Kiểm tra email có tồn tại trong hệ thống không
  const registered = getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
  if (!registered) {
    noteEl.textContent = '⚠ Email này chưa có tài khoản trong hệ thống.';
    noteEl.className   = 'modal-note error';
    return;
  }

  // Demo: hiện thông báo thành công
  noteEl.textContent = '✓ Link đặt lại mật khẩu đã gửi đến ' + email;
  noteEl.className   = 'modal-note success';
  document.getElementById('reset-btn').disabled = true;
  setTimeout(() => {
    document.getElementById('forgot-modal').classList.remove('show');
    document.getElementById('reset-btn').disabled = false;
  }, 2500);
});