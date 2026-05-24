/* ── BANNER SLIDER ── */
const slides = document.querySelectorAll('.banner-slide');
const dots = document.querySelectorAll('.dot');
let current = 0;
let timer;

function goTo(i) {
    if (!slides.length) return;
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (i + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
}
function startAuto() { timer = setInterval(() => goTo(current + 1), 4000); }
function resetAuto() { clearInterval(timer); startAuto(); }

const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
if (nextBtn) nextBtn.onclick = () => { goTo(current + 1); resetAuto(); };
if (prevBtn) prevBtn.onclick = () => { goTo(current - 1); resetAuto(); };
if (dots.length) dots.forEach(d => d.onclick = () => { goTo(+d.dataset.dot); resetAuto(); });
if (slides.length) startAuto();

/* ── JOBS DATA ── */
const allCards = Array.from(document.querySelectorAll('.job-card'));
let filteredCards = [...allCards]; // Mảng chứa kết quả sau khi lọc
let jobPage = 1;
let PER_PAGE = 9;
let totalPages = Math.ceil(filteredCards.length / PER_PAGE);

function renderJobs() {
    const start = (jobPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    // Ẩn/hiện card dựa trên filteredCards
    allCards.forEach(card => card.style.display = 'none');
    filteredCards.forEach((card, idx) => {
        if (idx >= start && idx < end) {
            card.style.display = '';
        }
    });

    renderPageNumbers();
    const prevBtn = document.getElementById('jobs-prev');
    const nextBtn = document.getElementById('jobs-next');
    if (prevBtn) prevBtn.disabled = jobPage === 1;
    if (nextBtn) nextBtn.disabled = jobPage === totalPages || filteredCards.length === 0;
}

function renderPageNumbers() {
    const container = document.getElementById('page-numbers');
    if (!container) return;
    container.innerHTML = '';
    if (totalPages === 0) {
        container.innerHTML = '<span class="page-ellipsis">0</span>';
        return;
    }

    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= jobPage - 1 && i <= jobPage + 1)) {
            pages.push(i);
        } else if (pages[pages.length - 1] !== '...') {
            pages.push('...');
        }
    }
    pages.forEach(p => {
        if (p === '...') {
            const el = document.createElement('span');
            el.className = 'page-ellipsis'; el.textContent = '...';
            container.appendChild(el);
        } else {
            const btn = document.createElement('button');
            btn.className = 'page-btn' + (p === jobPage ? ' active' : '');
            btn.textContent = p;
            btn.onclick = () => { jobPage = p; renderJobs(); };
            container.appendChild(btn);
        }
    });
}

/* ── SEARCH FUNCTION ── */
// Lưu lịch sử tìm kiếm
let recentSearches = JSON.parse(localStorage.getItem('recentJobSearches') || '[]');

function saveRecentSearch(keyword) {
    if (!keyword.trim()) return;
    recentSearches = [keyword, ...recentSearches.filter(s => s !== keyword)];
    if (recentSearches.length > 5) recentSearches.pop();
    localStorage.setItem('recentJobSearches', JSON.stringify(recentSearches));
}

// Hàm reset tìm kiếm (được gọi từ HTML)
window.resetSearch = function () {
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) searchInput.value = '';

    // Reset filtered cards
    filteredCards = [...allCards];
    totalPages = Math.ceil(filteredCards.length / PER_PAGE);
    jobPage = 1;
    renderJobs();

    // Xóa thông báo không có kết quả
    const noResultMsg = document.getElementById('no-search-results');
    if (noResultMsg) noResultMsg.remove();
};

// Hàm thực hiện tìm kiếm (được gọi từ HTML)
window.performSearch = function (keyword) {
    if (!keyword || !keyword.trim()) {
        resetSearch();
        return;
    }

    const searchTerm = keyword.toLowerCase().trim();

    // Lọc các job card
    filteredCards = allCards.filter(card => {
        const title = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
        const company = card.querySelector('.job-company')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.job-tag')).map(t => t.textContent.toLowerCase());

        return title.includes(searchTerm) ||
            company.includes(searchTerm) ||
            tags.some(tag => tag.includes(searchTerm));
    });

    totalPages = Math.ceil(filteredCards.length / PER_PAGE);
    jobPage = 1;
    renderJobs();

    // Hiển thị thông báo nếu không có kết quả
    let noResultMsg = document.getElementById('no-search-results');
    if (filteredCards.length === 0) {
        if (!noResultMsg) {
            const jobsGrid = document.querySelector('.jobs-grid');
            if (jobsGrid) {
                noResultMsg = document.createElement('div');
                noResultMsg.id = 'no-search-results';
                noResultMsg.style.cssText = 'grid-column: 1/-1; text-align: center; padding: 60px 20px;';
                noResultMsg.innerHTML = `
          <span class="mat-icon" style="font-size: 48px; color: var(--gray-300); margin-bottom: 16px;">search_off</span>
          <h3 style="font-size: 18px; color: var(--gray-700); margin-bottom: 8px;">Không tìm thấy việc làm phù hợp</h3>
          <p style="color: var(--gray-500);">Hãy thử tìm kiếm với từ khóa khác hoặc xem tất cả việc làm</p>
          <button onclick="resetSearch()" style="margin-top: 16px; padding: 8px 20px; background: var(--purple); color: white; border: none; border-radius: 8px; cursor: pointer;">Xem tất cả việc làm</button>
        `;
                jobsGrid.appendChild(noResultMsg);
            }
        }
    } else if (noResultMsg) {
        noResultMsg.remove();
    }

    // Đóng dropdown gợi ý
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (suggestionsDiv) suggestionsDiv.classList.remove('show');
};

// Hàm chọn gợi ý (được gọi từ HTML)
window.selectSearch = function (keyword) {
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) {
        searchInput.value = keyword;
        saveRecentSearch(keyword);
        performSearch(keyword);
    }
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (suggestionsDiv) suggestionsDiv.classList.remove('show');
};


// Hàm xóa lịch sử (được gọi từ HTML)
window.clearRecentSearches = function () {
    recentSearches = [];
    localStorage.setItem('recentJobSearches', JSON.stringify(recentSearches));
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) {
        // Gọi trực tiếp hàm renderSuggestions (đã được định nghĩa trong cùng scope)
        if (typeof renderSuggestions === 'function') {
            renderSuggestions(searchInput.value);
        }
    }
};

// Data gợi ý cho tìm kiếm
// Cập nhật jobSuggestions với nhiều nghề nghiệp hơn
const jobSuggestions = [
    // Công nghệ thông tin
    { title: "Kỹ sư phần mềm", category: "IT - Phần mềm", count: 1240, icon: "code" },
    { title: "Lập trình viên Frontend", category: "IT - Phần mềm", count: 856, icon: "code" },
    { title: "Lập trình viên Backend", category: "IT - Phần mềm", count: 723, icon: "code" },
    { title: "Lập trình viên Fullstack", category: "IT - Phần mềm", count: 892, icon: "code" },
    { title: "Kỹ sư DevOps", category: "IT - Phần mềm", count: 345, icon: "cloud" },
    { title: "Kỹ sư Dữ liệu (Data Engineer)", category: "IT - Dữ liệu", count: 412, icon: "data_usage" },
    { title: "Chuyên viên Phân tích dữ liệu", category: "IT - Dữ liệu", count: 567, icon: "analytics" },
    { title: "Khoa học dữ liệu (Data Scientist)", category: "IT - Dữ liệu", count: 289, icon: "science" },
    { title: "Kỹ sư AI/ML", category: "IT - Trí tuệ nhân tạo", count: 234, icon: "psychology" },
    { title: "Chuyên viên An ninh mạng", category: "IT - Bảo mật", count: 378, icon: "security" },
    { title: "Quản trị hệ thống", category: "IT - Hệ thống", count: 456, icon: "computer" },
    { title: "Quản trị cơ sở dữ liệu (DBA)", category: "IT - Dữ liệu", count: 234, icon: "storage" },
    { title: "Kiểm thử phần mềm (QA/Tester)", category: "IT - Kiểm thử", count: 567, icon: "bug_report" },
    { title: "Chuyên viên IT Helpdesk", category: "IT - Hỗ trợ", count: 345, icon: "support_agent" },
    { title: "Kỹ sư Mạng", category: "IT - Mạng", count: 234, icon: "router" },
    { title: "Lập trình viên Mobile (iOS/Android)", category: "IT - Di động", count: 678, icon: "phone_android" },
    { title: "Lập trình viên Game", category: "IT - Game", count: 234, icon: "sports_esports" },
    { title: "Kỹ sư Điện tử - Viễn thông", category: "Kỹ thuật", count: 345, icon: "wifi" },

    // Kinh doanh & Bán hàng
    { title: "Chuyên viên Kinh doanh", category: "Kinh doanh", count: 2341, icon: "trending_up" },
    { title: "Nhân viên Bán hàng", category: "Bán hàng", count: 1856, icon: "shopping_cart" },
    { title: "Trưởng nhóm Kinh doanh", category: "Kinh doanh", count: 567, icon: "group" },
    { title: "Giám đốc Kinh doanh", category: "Kinh doanh", count: 123, icon: "business" },
    { title: "Chuyên viên Phát triển thị trường", category: "Kinh doanh", count: 789, icon: "public" },
    { title: "Nhân viên Xuất nhập khẩu", category: "Xuất nhập khẩu", count: 456, icon: "import_export" },
    { title: "Chuyên viên Chăm sóc khách hàng", category: "Chăm sóc khách hàng", count: 1234, icon: "headset" },
    { title: "Telesales", category: "Bán hàng", count: 892, icon: "phone" },
    { title: "Nhân viên Bán hàng Online", category: "Bán hàng", count: 734, icon: "shopping_bag" },
    { title: "Chuyên viên Kinh doanh Bất động sản", category: "Bất động sản", count: 567, icon: "home" },
    { title: "Môi giới Bất động sản", category: "Bất động sản", count: 345, icon: "location_city" },
    { title: "Chuyên viên Đấu thầu", category: "Kinh doanh", count: 234, icon: "gavel" },

    // Marketing & Truyền thông
    { title: "Chuyên viên Marketing", category: "Marketing", count: 982, icon: "campaign" },
    { title: "Chuyên viên Digital Marketing", category: "Marketing", count: 734, icon: "online_prediction" },
    { title: "Chuyên viên SEO/SEM", category: "Marketing", count: 456, icon: "search" },
    { title: "Chuyên viên Content Marketing", category: "Marketing", count: 567, icon: "description" },
    { title: "Chuyên viên Social Media", category: "Marketing", count: 623, icon: "share" },
    { title: "Chuyên viên Marketing Online", category: "Marketing", count: 789, icon: "ads_click" },
    { title: "Trưởng phòng Marketing", category: "Marketing", count: 234, icon: "manager" },
    { title: "Chuyên viên Quảng cáo", category: "Quảng cáo", count: 345, icon: "advertising" },
    { title: "Chuyên viên PR - Truyền thông", category: "PR", count: 456, icon: "announcement" },
    { title: "Chuyên viên Tổ chức sự kiện", category: "Sự kiện", count: 345, icon: "celebration" },
    { title: "Chuyên viên Brand", category: "Marketing", count: 234, icon: "branding_watermark" },
    { title: "Chuyên viên Nghiên cứu thị trường", category: "Marketing", count: 289, icon: "insights" },

    // Kế toán & Tài chính
    { title: "Kế toán tổng hợp", category: "Kế toán", count: 671, icon: "calculate" },
    { title: "Kế toán trưởng", category: "Kế toán", count: 345, icon: "account_balance" },
    { title: "Kế toán công nợ", category: "Kế toán", count: 456, icon: "receipt" },
    { title: "Kế toán kho", category: "Kế toán", count: 345, icon: "inventory" },
    { title: "Kế toán thuế", category: "Kế toán", count: 278, icon: "request_quote" },
    { title: "Kế toán lương", category: "Kế toán", count: 234, icon: "payments" },
    { title: "Kiểm toán viên", category: "Kiểm toán", count: 345, icon: "audit" },
    { title: "Chuyên viên Tài chính", category: "Tài chính", count: 456, icon: "finance" },
    { title: "Chuyên viên Đầu tư", category: "Tài chính", count: 234, icon: "show_chart" },
    { title: "Chuyên viên Phân tích tài chính", category: "Tài chính", count: 289, icon: "analytics" },
    { title: "Giao dịch viên Ngân hàng", category: "Ngân hàng", count: 567, icon: "account_balance" },
    { title: "Chuyên viên Tín dụng", category: "Ngân hàng", count: 345, icon: "credit_card" },
    { title: "Chuyên viên Quản trị rủi ro", category: "Tài chính", count: 234, icon: "warning" },

    // Hành chính & Nhân sự
    { title: "Nhân viên Hành chính", category: "Hành chính", count: 567, icon: "badge" },
    { title: "Nhân viên Văn phòng", category: "Hành chính", count: 892, icon: "business_center" },
    { title: "Thư ký", category: "Hành chính", count: 345, icon: "event_note" },
    { title: "Lễ tân", category: "Hành chính", count: 234, icon: "door_front" },
    { title: "Trợ lý", category: "Hành chính", count: 456, icon: "assistant" },
    { title: "Chuyên viên Nhân sự", category: "Nhân sự", count: 834, icon: "people" },
    { title: "Chuyên viên Tuyển dụng", category: "Nhân sự", count: 567, icon: "person_search" },
    { title: "Chuyên viên Đào tạo", category: "Nhân sự", count: 345, icon: "school" },
    { title: "Chuyên viên Lương thưởng", category: "Nhân sự", count: 234, icon: "payments" },
    { title: "Trưởng phòng Nhân sự", category: "Nhân sự", count: 178, icon: "group" },

    // Kỹ thuật & Sản xuất
    { title: "Kỹ sư Xây dựng", category: "Xây dựng", count: 512, icon: "construction" },
    { title: "Kỹ sư Cơ khí", category: "Cơ khí", count: 456, icon: "settings" },
    { title: "Kỹ sư Điện", category: "Điện", count: 345, icon: "electrical_services" },
    { title: "Kỹ sư Tự động hóa", category: "Tự động hóa", count: 234, icon: "autorenew" },
    { title: "Kỹ sư Công nghệ thực phẩm", category: "Thực phẩm", count: 234, icon: "restaurant" },
    { title: "Kỹ sư Hóa học", category: "Hóa chất", count: 178, icon: "science" },
    { title: "Kỹ sư Môi trường", category: "Môi trường", count: 189, icon: "eco" },
    { title: "Quản đốc sản xuất", category: "Sản xuất", count: 345, icon: "factory" },
    { title: "Kỹ thuật viên", category: "Kỹ thuật", count: 567, icon: "handyman" },
    { title: "Kỹ sư Chất lượng (QA/QC)", category: "Chất lượng", count: 345, icon: "verified" },

    // Giáo dục & Đào tạo
    { title: "Giáo viên Tiếng Anh", category: "Giáo dục", count: 678, icon: "school" },
    { title: "Giáo viên Mầm non", category: "Giáo dục", count: 456, icon: "child_care" },
    { title: "Giáo viên Tiểu học", category: "Giáo dục", count: 345, icon: "menu_book" },
    { title: "Giảng viên Đại học", category: "Giáo dục", count: 234, icon: "account_balance" },
    { title: "Chuyên viên Đào tạo", category: "Đào tạo", count: 289, icon: "training" },
    { title: "Trợ giảng", category: "Giáo dục", count: 234, icon: "assistant" },
    { title: "Gia sư", category: "Giáo dục", count: 567, icon: "tutor" },

    // Thiết kế & Nghệ thuật
    { title: "Thiết kế Đồ họa", category: "Thiết kế", count: 423, icon: "brush" },
    { title: "Thiết kế UI/UX", category: "Thiết kế", count: 345, icon: "design_services" },
    { title: "Thiết kế Web", category: "Thiết kế", count: 278, icon: "web" },
    { title: "Thiết kế Nội thất", category: "Thiết kế", count: 234, icon: "chair" },
    { title: "Thiết kế Thời trang", category: "Thiết kế", count: 178, icon: "style" },
    { title: "Nhân viên Dựng phim", category: "Nghệ thuật", count: 234, icon: "movie" },
    { title: "Nhiếp ảnh gia", category: "Nghệ thuật", count: 189, icon: "photo_camera" },

    // Y tế & Dược
    { title: "Bác sĩ Đa khoa", category: "Y tế", count: 234, icon: "local_hospital" },
    { title: "Điều dưỡng viên", category: "Y tế", count: 456, icon: "health_and_safety" },
    { title: "Dược sĩ", category: "Dược", count: 345, icon: "medication" },
    { title: "Kỹ thuật viên Xét nghiệm", category: "Y tế", count: 234, icon: "biotech" },
    { title: "Bác sĩ Răng hàm mặt", category: "Y tế", count: 178, icon: "dentistry" },
    { title: "Chuyên viên Vật lý trị liệu", category: "Y tế", count: 189, icon: "fitness_center" },

    // Dịch vụ & Khách sạn
    { title: "Lễ tân Khách sạn", category: "Khách sạn", count: 345, icon: "hotel" },
    { title: "Buồng phòng", category: "Khách sạn", count: 234, icon: "bed" },
    { title: "Nhân viên Phục vụ", category: "Nhà hàng", count: 567, icon: "restaurant" },
    { title: "Bếp trưởng", category: "Nhà hàng", count: 234, icon: "restaurant_menu" },
    { title: "Pha chế", category: "F&B", count: 345, icon: "coffee" },
    { title: "Hướng dẫn viên Du lịch", category: "Du lịch", count: 234, icon: "tour" },
    { title: "Đặt vé máy bay", category: "Du lịch", count: 178, icon: "flight" },

    // Vận tải & Logistics
    { title: "Nhân viên Kho vận", category: "Logistics", count: 456, icon: "warehouse" },
    { title: "Điều phối viên Logistics", category: "Logistics", count: 345, icon: "shipping" },
    { title: "Tài xế", category: "Vận tải", count: 567, icon: "directions_car" },
    { title: "Shipper", category: "Giao hàng", count: 892, icon: "delivery_dining" },

    // Luật & Pháp lý
    { title: "Luật sư", category: "Luật", count: 234, icon: "gavel" },
    { title: "Chuyên viên Pháp lý", category: "Pháp lý", count: 345, icon: "policy" },
    { title: "Trợ lý Luật", category: "Luật", count: 234, icon: "assignment" },

    // Khác
    { title: "Thợ điện", category: "Kỹ thuật", count: 345, icon: "electrical_services" },
    { title: "Thợ sửa chữa", category: "Kỹ thuật", count: 234, icon: "build" },
    { title: "Nhân viên Bảo vệ", category: "An ninh", count: 456, icon: "security" },
    { title: "Tạp vụ", category: "Dịch vụ", count: 234, icon: "cleaning_services" },
    { title: "Nhân viên Tạp vụ", category: "Dịch vụ", count: 178, icon: "cleaning_services" }
];

function highlightText(text, keyword) {
    if (!keyword) return text;
    const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<span class="suggestion-highlight">$1</span>');
}

function renderSuggestions(keyword) {
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (!suggestionsDiv) return;

    if (!keyword.trim()) {
        // Hiển thị lịch sử tìm kiếm + gợi ý phổ biến
        let html = '';
        if (recentSearches.length > 0) {
            html += `
        <div class="recent-search">
        </div>
        ${recentSearches.map(term => `
          <div class="suggestion-item" onclick="selectSearch('${term.replace(/'/g, "\\'")}')">
            <div class="suggestion-item-icon">
              <span class="mat-icon">schedule</span>
            </div>
            <div class="suggestion-item-content">
              <div class="suggestion-item-title">${term}</div>
              <div class="suggestion-item-sub">Tìm kiếm trước đó</div>
            </div>
            <div class="suggestion-item-jobs">🔍</div>
          </div>
        `).join('')}
      `;
        }
        html += `
      <div class="suggestion-group">
        <div class="suggestion-group-header">🔥 Gợi ý hôm nay</div>
        ${jobSuggestions.slice(0, 6).map(job => `
          <div class="suggestion-item" onclick="selectSearch('${job.title.replace(/'/g, "\\'")}')">
            <div class="suggestion-item-icon">
              <span class="mat-icon">${job.icon}</span>
            </div>
            <div class="suggestion-item-content">
              <div class="suggestion-item-title">${job.title}</div>
              <div class="suggestion-item-sub">${job.category} • ${job.count.toLocaleString()} việc làm</div>
            </div>
            <div class="suggestion-item-jobs">→</div>
          </div>
        `).join('')}
      </div>
    `;
        suggestionsDiv.innerHTML = html;
        suggestionsDiv.classList.add('show');
    } else {
        const filtered = jobSuggestions.filter(job =>
            job.title.toLowerCase().includes(keyword.toLowerCase()) ||
            job.category.toLowerCase().includes(keyword.toLowerCase())
        );

        if (filtered.length > 0) {
            suggestionsDiv.innerHTML = `
        <div class="suggestion-group">
          <div class="suggestion-group-header">💼 ${filtered.length} kết quả cho "${keyword}"</div>
          ${filtered.slice(0, 8).map(job => `
            <div class="suggestion-item" onclick="selectSearch('${job.title.replace(/'/g, "\\'")}')">
              <div class="suggestion-item-icon">
                <span class="mat-icon">${job.icon}</span>
              </div>
              <div class="suggestion-item-content">
                <div class="suggestion-item-title">${highlightText(job.title, keyword)}</div>
                <div class="suggestion-item-sub">${job.category} • ${job.count.toLocaleString()} việc làm</div>
              </div>
              <div class="suggestion-item-jobs">${job.count}+</div>
            </div>
          `).join('')}
        </div>
      `;
        } else {
            suggestionsDiv.innerHTML = `
        <div class="suggestion-item" onclick="selectSearch('${keyword.replace(/'/g, "\\'")}')">
          <div class="suggestion-item-icon">
            <span class="mat-icon">search</span>
          </div>
          <div class="suggestion-item-content">
            <div class="suggestion-item-title">Tìm kiếm "${keyword}"</div>
            <div class="suggestion-item-sub">Nhấn Enter để tìm kiếm việc làm</div>
          </div>
          <div class="suggestion-item-jobs">↵</div>
        </div>
      `;
        }
    }
}

/* ── PAGINATION BUTTONS ── */
const jobsPrev = document.getElementById('jobs-prev');
const jobsNext = document.getElementById('jobs-next');
if (jobsPrev) {
    jobsPrev.onclick = () => { if (jobPage > 1) { jobPage--; renderJobs(); } };
}
if (jobsNext) {
    jobsNext.onclick = () => { if (jobPage < totalPages) { jobPage++; renderJobs(); } };
}


// Hàm gọi API lấy danh sách tỉnh thành
async function loadProvinces() {
    const selectEl = document.getElementById('province-select');
    if (!selectEl) return;

    try {
        const response = await fetch('https://provinces.open-api.vn/api/p/');
        const provinces = await response.json();

        selectEl.innerHTML = '<option value="">Tỉnh/thành phố</option>';
        provinces.sort((a, b) => a.name.localeCompare(b.name, 'vi'));

        provinces.forEach(province => {
            const option = document.createElement('option');
            option.value = province.code;
            option.textContent = province.name;
            selectEl.appendChild(option);
        });
    } catch (error) {
        console.error('Lỗi tải danh sách tỉnh thành:', error);
        selectEl.innerHTML = '<option value="">Lỗi tải dữ liệu</option>';
    }
}



/* ── SEARCH EVENT LISTENERS ── */
// Cập nhật phần event listeners cho search
document.addEventListener('DOMContentLoaded', () => {
    loadProvinces();

    filteredCards = [...allCards];
    totalPages = Math.ceil(filteredCards.length / PER_PAGE);
    renderJobs();

    const searchInput = document.getElementById('job-search-input');
    const suggestionsDiv = document.getElementById('search-suggestions');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput) {
        // Focus - hiển thị suggestions
        searchInput.addEventListener('focus', () => {
            renderSuggestions(searchInput.value);
            suggestionsDiv.classList.add('show');
        });

        // Click - hiển thị suggestions
        searchInput.addEventListener('click', (e) => {
            e.stopPropagation();
            renderSuggestions(searchInput.value);
            suggestionsDiv.classList.add('show');
        });

        // Input - cập nhật suggestions
        searchInput.addEventListener('input', (e) => {
            renderSuggestions(e.target.value);
            suggestionsDiv.classList.add('show');
        });

        // Enter - thực hiện tìm kiếm
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const keyword = searchInput.value;
                if (keyword.trim()) {
                    saveRecentSearch(keyword);
                    performSearch(keyword);
                }
                suggestionsDiv.classList.remove('show');
                searchInput.blur();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const keyword = searchInput?.value;
            if (keyword?.trim()) {
                saveRecentSearch(keyword);
                performSearch(keyword);
            } else {
                resetSearch();
            }
            suggestionsDiv.classList.remove('show');
        });
    }

    // Đóng dropdown khi click ra ngoài
    document.addEventListener('click', (e) => {
        if (searchInput && !searchInput.contains(e.target) &&
            suggestionsDiv && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.classList.remove('show');
        }
    });

    // Ngăn click bên trong dropdown đóng nó
    if (suggestionsDiv) {
        suggestionsDiv.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }
});