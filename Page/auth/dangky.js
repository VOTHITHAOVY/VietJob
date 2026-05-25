/* ============================================================
   ⚙️  CẤU HÌNH EMAILJS — điền 3 giá trị dưới đây
   Đăng ký miễn phí tại https://www.emailjs.com
   - Service ID: tạo Email Service (kết nối Gmail của bạn)
   - Template ID: tạo Email Template với biến {{otp_code}} và {{to_email}}
   - Public Key: trong Account > API Keys
============================================================ */
const EMAILJS_SERVICE_ID  = 'service_gxvzfsc';
const EMAILJS_TEMPLATE_ID = 'template_uziaz8o';
const EMAILJS_PUBLIC_KEY  = 'xcGhW_bN2F5g4JnYX';

// Khởi tạo EmailJS
emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });

/* ============================================================
   STORAGE HELPERS — lưu tài khoản vào localStorage
============================================================ */
const USERS_KEY = 'vietjob_users';

function getUsers() {
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; }
  catch { return []; }
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function emailExists(email) {
  return getUsers().some(u => u.email.toLowerCase() === email.toLowerCase());
}

/* ============================================================
   OTP STATE
============================================================ */
let otpCode       = '';
let otpExpireAt   = 0;   // timestamp ms
let otpTimer      = null;
let otpVerified   = false;

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
function setupEye(btnId, inputId, icoId) {
  document.getElementById(btnId).addEventListener('click', () => {
    const inp = document.getElementById(inputId);
    const ico = document.getElementById(icoId);
    inp.type = inp.type === 'password' ? 'text' : 'password';
    ico.className = inp.type === 'password' ? 'ti ti-eye' : 'ti ti-eye-off';
  });
}
setupEye('eye-btn1', 'pwd',  'eye-ico1');
setupEye('eye-btn2', 'pwd2', 'eye-ico2');

/* ============================================================
   VALIDATE HELPER
============================================================ */
function setErr(wrapId, msgId, show, customMsg) {
  const wrap = document.getElementById(wrapId);
  const msg  = document.getElementById(msgId);
  wrap.classList.toggle('err', show);
  wrap.classList.toggle('ok', !show);
  msg.classList.toggle('show', show);
  if (customMsg) msg.textContent = customMsg;
}

/* ============================================================
   GỬI OTP QUA EMAILJS
============================================================ */
document.getElementById('otp-send-btn').addEventListener('click', async () => {
  const email = document.getElementById('email').value.trim();

  // Validate email trước
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    setErr('wrap-email', 'err-email', true, 'Vui lòng nhập email hợp lệ trước khi gửi OTP');
    document.getElementById('email').focus();
    return;
  }

  // Kiểm tra email đã tồn tại chưa
  if (emailExists(email)) {
    setErr('wrap-email', 'err-email', true, 'Email này đã được đăng ký, vui lòng đăng nhập');
    return;
  }

  // Tạo mã OTP 6 số
  otpCode     = String(Math.floor(100000 + Math.random() * 900000));
  otpExpireAt = Date.now() + 5 * 60 * 1000; // hết hạn sau 5 phút
  otpVerified = false;
  document.getElementById('otp-input').value = '';
  document.getElementById('err-otp').classList.remove('show');
  document.getElementById('wrap-otp').classList.remove('err');

  // UI: loading
  const btn      = document.getElementById('otp-send-btn');
  const spin     = document.getElementById('otp-spin');
  const btnText  = document.getElementById('otp-btn-text');
  btn.disabled   = true;
  spin.classList.add('show');
  btnText.textContent = 'Đang gửi...';

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email : email,
      otp_code : otpCode,
      to_name  : document.getElementById('hoten').value.trim() || 'bạn',
    });

    const note = document.getElementById('otp-sent-note');
    note.textContent = '✓ Mã OTP đã gửi đến ' + email + ' — kiểm tra hộp thư (kể cả Spam)';
    note.classList.add('show');
    showToast('Mã OTP đã gửi đến ' + email, 'success');

    // Đếm ngược 60s cho phép gửi lại
    startOtpCountdown(btn, btnText, spin);

  } catch (err) {
    console.error('EmailJS error:', err);
    showToast('Gửi OTP thất bại. Kiểm tra cấu hình EmailJS.', 'error');
    btn.disabled   = false;
    spin.classList.remove('show');
    btnText.textContent = 'Gửi mã OTP';
  }
});

function startOtpCountdown(btn, btnText, spin) {
  spin.classList.remove('show');
  let sec = 60;
  const timerEl = document.getElementById('otp-timer');
  timerEl.classList.add('show');
  timerEl.textContent = `Gửi lại sau ${sec}s`;
  clearInterval(otpTimer);
  otpTimer = setInterval(() => {
    sec--;
    timerEl.textContent = `Gửi lại sau ${sec}s`;
    if (sec <= 0) {
      clearInterval(otpTimer);
      btn.disabled        = false;
      timerEl.classList.remove('show');
      btnText.textContent = 'Gửi lại OTP';
    }
  }, 1000);
}

/* Tự xác thực OTP khi nhập đủ 6 số */
document.getElementById('otp-input').addEventListener('input', function() {
  const val = this.value.trim();
  if (val.length === 6) {
    if (Date.now() > otpExpireAt) {
      setErr('wrap-otp', 'err-otp', true, 'Mã OTP đã hết hạn, vui lòng gửi lại');
      otpVerified = false;
    } else if (val === otpCode) {
      document.getElementById('wrap-otp').classList.remove('err');
      document.getElementById('wrap-otp').classList.add('ok');
      document.getElementById('err-otp').classList.remove('show');
      otpVerified = true;
      showToast('OTP hợp lệ ✓', 'success');
    } else {
      setErr('wrap-otp', 'err-otp', true, 'Mã OTP không đúng');
      otpVerified = false;
    }
  }
});

/* ============================================================
   FORM SUBMIT — lưu tài khoản vào localStorage
============================================================ */
document.getElementById('reg-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const hoten = document.getElementById('hoten').value.trim();
  const sdt   = document.getElementById('sdt').value.trim();
  const email = document.getElementById('email').value.trim();
  const pwd   = document.getElementById('pwd').value;
  const pwd2  = document.getElementById('pwd2').value;
  const otp   = document.getElementById('otp-input').value.trim();
  const ck1   = document.getElementById('ck1').checked;
  let ok = true;

  // Validate họ tên
  if (!hoten) {
    setErr('wrap-hoten', 'err-hoten', true);
    ok = false;
  } else {
    document.getElementById('wrap-hoten').classList.remove('err');
    document.getElementById('err-hoten').classList.remove('show');
  }

  // Validate SĐT
  const sdtOk = /^(0|\+84)[0-9]{8,10}$/.test(sdt.replace(/\s/g,''));
  setErr('wrap-sdt', 'err-sdt', !sdtOk);
  if (!sdtOk) ok = false;

  // Validate email + kiểm tra trùng
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailOk) {
    setErr('wrap-email', 'err-email', true, 'Email không hợp lệ');
    ok = false;
  } else if (emailExists(email)) {
    setErr('wrap-email', 'err-email', true, 'Email này đã được đăng ký, vui lòng đăng nhập');
    ok = false;
  } else {
    document.getElementById('wrap-email').classList.remove('err');
    document.getElementById('err-email').classList.remove('show');
  }

  // Validate mật khẩu
  if (pwd.length < 6) {
    setErr('wrap-pwd', 'err-pwd', true);
    ok = false;
  } else {
    document.getElementById('wrap-pwd').classList.remove('err');
    document.getElementById('err-pwd').classList.remove('show');
  }

  if (pwd !== pwd2) {
    setErr('wrap-pwd2', 'err-pwd2', true);
    ok = false;
  } else if (pwd.length >= 6) {
    document.getElementById('wrap-pwd2').classList.remove('err');
    document.getElementById('err-pwd2').classList.remove('show');
  }

  // Validate OTP
  if (!otpCode) {
    setErr('wrap-otp', 'err-otp', true, 'Vui lòng gửi và nhập mã OTP');
    ok = false;
  } else if (Date.now() > otpExpireAt) {
    setErr('wrap-otp', 'err-otp', true, 'Mã OTP đã hết hạn, vui lòng gửi lại');
    ok = false;
  } else if (otp !== otpCode) {
    setErr('wrap-otp', 'err-otp', true, 'Mã OTP không đúng');
    ok = false;
  }

  // Checkbox
  if (!ck1) {
    showToast('Vui lòng đồng ý với Điều khoản và Chính sách bảo mật', 'error');
    ok = false;
  }

  if (!ok) return;

  // ✅ Lưu tài khoản vào localStorage
  saveUser({
    hoten,
    sdt,
    email: email.toLowerCase(),
    // Lưu ý: trong thực tế KHÔNG lưu mật khẩu plaintext
    // Đây là demo — production cần hash hoặc xử lý backend
    pwd,
    createdAt: new Date().toISOString(),
  });

  // Hiện màn hình thành công
  document.getElementById('form-section').style.display = 'none';
  document.getElementById('success-wrap').style.display = 'block';
});