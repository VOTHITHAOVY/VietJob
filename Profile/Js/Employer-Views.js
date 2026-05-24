// Employer-Views.js - Dữ liệu mẫu cho lượt xem của nhà tuyển dụng
(function() {
  // Dữ liệu mẫu (sau này thay bằng fetch từ API hoặc localStorage)
  const chartData = [65, 80, 120]; // chiều cao cột tương ứng 3 mốc
  const totalViews = 1284;
  const trendPercent = '+12%';
  const feedbackRate = 84;

  const recentViews = [
    {
      company: "Google Vietnam 🚀",
      industry: "Công nghệ thông tin & Dịch vụ",
      time: "14:30 Hôm nay",
      count: "Đã xem 3 lần"
    },
    {
      company: "VinFast Global",
      industry: "Sản xuất ô tô & Công nghệ",
      time: "09:15 Hôm nay",
      count: "Lần đầu xem"
    },
    {
      company: "Shopee Vietnam",
      industry: "Thương mại điện tử",
      time: "Hôm qua",
      count: "Đã xem 2 lần"
    }
  ];

  function renderBarChart() {
    const container = document.getElementById('bar-chart');
    if (!container) return;
    const maxHeight = 120; // px
    const maxValue = Math.max(...chartData);
    container.innerHTML = chartData.map(value => {
      const height = (value / maxValue) * maxHeight;
      return `<div class="bar" style="height: ${height}px;"></div>`;
    }).join('');
  }

  function updateStats() {
    document.getElementById('total-views').innerText = totalViews.toLocaleString();
    document.getElementById('trend-percent').innerText = trendPercent;
    document.getElementById('feedback-rate').innerText = feedbackRate;
  }

  function renderRecentViews() {
    const container = document.getElementById('recent-views-list');
    if (!container) return;

    if (!recentViews.length) {
      container.innerHTML = `
        <div class="empty-state">
          <span class="mat-icon">visibility_off</span>
          <p>Chưa có lượt xem nào từ nhà tuyển dụng trong 30 ngày qua.</p>
        </div>
      `;
      return;
    }

    container.innerHTML = recentViews.map(view => `
      <div class="view-item">
        <div class="view-company">
          <strong>${escapeHtml(view.company)}</strong>
        </div>
        <div class="view-industry">${escapeHtml(view.industry)}</div>
        <div>
          <span class="view-time">${escapeHtml(view.time)}</span>
          <span class="view-count">${escapeHtml(view.count)}</span>
        </div>
      </div>
    `).join('');
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

  renderBarChart();
  updateStats();
  renderRecentViews();
})();