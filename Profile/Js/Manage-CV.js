// Manage-CV.js - Quản lý CV (dữ liệu trống mặc định)
(function() {
  // Lấy danh sách CV từ localStorage (key: 'myCVs')
  function getCVs() {
    const stored = localStorage.getItem('myCVs');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch(e) { return []; }
    }
    // Mặc định trống (chưa có CV nào)
    return [];
  }

  // Lấy thống kê (có thể lấy từ localStorage hoặc mặc định 0)
  function getStats() {
    const stored = localStorage.getItem('cvStats');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch(e) { return { views: 0, downloads: 0, success: 0 }; }
    }
    return { views: 0, downloads: 0, success: 0 };
  }

  function renderCVs() {
    const container = document.getElementById('cv-list');
    if (!container) return;

    const cvs = getCVs();

    if (cvs.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="mat-icon">description</span>
          <p>Bạn chưa có CV nào. Hãy tạo CV mới để bắt đầu.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = cvs.map(cv => `
      <div class="cv-item" data-id="${cv.id}">
        <div class="cv-info">
          <div class="cv-name">${escapeHtml(cv.name)}</div>
          <span class="cv-status ${cv.status === 'public' ? '' : 'private'}">${cv.status === 'public' ? 'CÔNG KHAI' : 'RIÊNG TƯ'}</span>
          <div class="cv-updated">Cập nhật: ${escapeHtml(cv.updatedDate)}</div>
        </div>
        <div class="cv-actions">
          <button class="btn-import" data-id="${cv.id}">NHẬP</button>
        </div>
      </div>
    `).join('');

    // Gắn sự kiện cho nút NHẬP
    document.querySelectorAll('.btn-import').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        alert(`Chức năng nhập CV ID: ${id} đang phát triển.`);
      });
    });
  }

  function updateStats() {
    const stats = getStats();
    document.getElementById('stat-views').innerText = stats.views;
    document.getElementById('stat-downloads').innerText = stats.downloads;
    document.getElementById('stat-success').innerText = stats.success;
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

  // Nút "Xem gợi ý từ chuyên gia"
  document.getElementById('upgrade-btn')?.addEventListener('click', () => {
    alert('Chức năng đang phát triển. Chuyên gia sẽ sớm tư vấn cho bạn.');
  });

  // Nút "Tạo CV mới"
  document.getElementById('create-cv-btn')?.addEventListener('click', () => {
    alert('Chuyển đến trang tạo CV mới (chức năng đang phát triển).');
    // window.location.href = 'create-cv.html';
  });

  // Khởi tạo
  renderCVs();
  updateStats();
})();