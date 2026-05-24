// Applied-Jobs.js - Hiển thị danh sách ứng tuyển (trống nếu chưa có data)
(function() {
  // Lấy dữ liệu từ localStorage (key: 'appliedJobs') - có thể để trống hoặc mẫu
  function getAppliedJobs() {
    const stored = localStorage.getItem('appliedJobs');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch(e) { return []; }
    }
    return []; // Hiện tại chưa có dữ liệu -> trống
  }

  // Đếm số lượng theo trạng thái
  function countByStatus(jobs) {
    return {
      all: jobs.length,
      submitted: jobs.filter(j => j.status === 'submitted').length,
      viewed: jobs.filter(j => j.status === 'viewed').length,
      interview: jobs.filter(j => j.status === 'interview').length
    };
  }

  function renderFilters(jobs) {
    const counts = countByStatus(jobs);
    document.getElementById('count-all').innerHTML = `(${counts.all})`;
    document.getElementById('count-submitted').innerHTML = `(${counts.submitted})`;
    document.getElementById('count-viewed').innerHTML = `(${counts.viewed})`;
    document.getElementById('count-interview').innerHTML = `(${counts.interview})`;
  }

  let currentFilter = 'all';
  let currentPage = 1;
  const itemsPerPage = 4; // như ảnh mẫu

  function renderApplications() {
    const container = document.getElementById('applications-list');
    if (!container) return;

    let jobs = getAppliedJobs();
    // Lọc theo status
    if (currentFilter !== 'all') {
      jobs = jobs.filter(j => j.status === currentFilter);
    }

    const total = jobs.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const paginatedJobs = jobs.slice(start, end);

    // Cập nhật phân trang
    document.getElementById('showing-start').innerText = total === 0 ? 0 : start + 1;
    document.getElementById('showing-end').innerText = Math.min(end, total);
    document.getElementById('total-count').innerText = total;

    if (total === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="mat-icon">assignment_turned_in</span>
          <p>Bạn chưa ứng tuyển công việc nào. Hãy quay lại <a href="../index.html" style="color: #7C3AED;">trang chủ</a> để tìm kiếm cơ hội.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = paginatedJobs.map(job => `
      <div class="application-item" data-id="${job.id}">
        <div class="app-job-title">${escapeHtml(job.title)}</div>
        <div class="app-company">${escapeHtml(job.company)}</div>
        <div class="app-date">${escapeHtml(job.appliedDate)}</div>
        <div class="app-status ${job.status}">${getStatusText(job.status)}</div>
        <div class="app-actions">
          <button class="btn-detail" data-id="${job.id}">Chi tiết</button>
        </div>
      </div>
    `).join('');

    // Gắn sự kiện
    document.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.getAttribute('data-id');
        alert(`Xem chi tiết đơn ứng tuyển ID: ${id} (chức năng sẽ sớm hoàn thiện)`);
      });
    });
  }

  function getStatusText(status) {
    switch(status) {
      case 'submitted': return 'Đã nộp';
      case 'viewed': return 'Đã xem hồ sơ';
      case 'interview': return 'Mời phỏng vấn';
      default: return 'Đã nộp';
    }
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

  function initFilters() {
    const btns = document.querySelectorAll('.filter-btn');
    btns.forEach(btn => {
      btn.addEventListener('click', () => {
        btns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-status');
        currentPage = 1;
        renderApplications();
      });
    });
  }

  // Xử lý các nút bên phải
  document.getElementById('update-portfolio-btn')?.addEventListener('click', () => {
    alert('Tính năng cập nhật Portfolio đang phát triển.');
  });
  document.getElementById('contact-support-btn')?.addEventListener('click', () => {
    alert('Liên hệ tư vấn: hotline 1900 xxxx hoặc email support@vietjob.com');
  });

  // Load dữ liệu và render
  function init() {
    renderFilters(getAppliedJobs());
    initFilters();
    renderApplications();
  }

  init();
})();