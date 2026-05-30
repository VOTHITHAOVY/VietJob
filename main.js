/* ================================================================
   main.js – Trang chủ VietJob
   ================================================================ */

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


/* ================================================================
   NAVIGATION HELPERS
   Chuyển sang trang Jobs với job ID hoặc từ khóa tìm kiếm
   ================================================================ */

/**
 * goToJob(jobId)
 * Click vào job card ở trang chủ → chuyển sang Jobs.html và tự động
 * mở trang chi tiết của job đó.
 */
function goToJob(jobId) {
    window.location.href = 'Page/ViecLam/Jobs.html?job=' + jobId;
}

/**
 * goToSearch(keyword)
 * Click vào tag / ngành nghề → chuyển sang Jobs.html với từ khóa
 * tìm kiếm được điền sẵn.
 */
function goToSearch(keyword) {
    window.location.href = 'Page/ViecLam/Jobs.html?search=' + encodeURIComponent(keyword);
}

/**
 * toggleHomeSave(btn)
 * Toggle icon yêu thích trên card trang chủ (không navigate).
 */
function toggleHomeSave(btn) {
    const icon = btn.querySelector('.mat-icon');
    if (!icon) return;
    if (icon.textContent === 'favorite_border') {
        icon.textContent = 'favorite';
        icon.style.color = '#EF4444';
    } else {
        icon.textContent = 'favorite_border';
        icon.style.color = '';
    }
}


/* ================================================================
   JOBS GRID (trang chủ – phần "Việc làm nổi bật")
   ================================================================ */
const allCards = Array.from(document.querySelectorAll('.job-card'));
let filteredCards = [...allCards];
let jobPage = 1;
const PER_PAGE = 9;
let totalPages = Math.ceil(filteredCards.length / PER_PAGE);

function renderJobs() {
    const start = (jobPage - 1) * PER_PAGE;
    const end = start + PER_PAGE;

    allCards.forEach(card => card.style.display = 'none');
    filteredCards.forEach((card, idx) => {
        if (idx >= start && idx < end) {
            card.style.display = '';
        }
    });

    renderPageNumbers();
    const pBtn = document.getElementById('jobs-prev');
    const nBtn = document.getElementById('jobs-next');
    if (pBtn) pBtn.disabled = jobPage === 1;
    if (nBtn) nBtn.disabled = jobPage === totalPages || filteredCards.length === 0;
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
            el.className = 'page-ellipsis';
            el.textContent = '...';
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
let recentSearches = JSON.parse(localStorage.getItem('recentJobSearches') || '[]');

function saveRecentSearch(keyword) {
    if (!keyword.trim()) return;
    recentSearches = [keyword, ...recentSearches.filter(s => s !== keyword)];
    if (recentSearches.length > 5) recentSearches.pop();
    localStorage.setItem('recentJobSearches', JSON.stringify(recentSearches));
}

window.resetSearch = function () {
    const searchInput = document.getElementById('job-search-input');
    if (searchInput) searchInput.value = '';
    filteredCards = [...allCards];
    totalPages = Math.ceil(filteredCards.length / PER_PAGE);
    jobPage = 1;
    renderJobs();
    const noResultMsg = document.getElementById('no-search-results');
    if (noResultMsg) noResultMsg.remove();
};

window.performSearch = function (keyword) {
    if (!keyword || !keyword.trim()) {
        resetSearch();
        return;
    }
    const searchTerm = keyword.toLowerCase().trim();
    filteredCards = allCards.filter(card => {
        const title = card.querySelector('.job-title')?.textContent.toLowerCase() || '';
        const company = card.querySelector('.job-company')?.textContent.toLowerCase() || '';
        const tags = Array.from(card.querySelectorAll('.job-tag')).map(t => t.textContent.toLowerCase());
        return title.includes(searchTerm) || company.includes(searchTerm) || tags.some(tag => tag.includes(searchTerm));
    });
    totalPages = Math.ceil(filteredCards.length / PER_PAGE);
    jobPage = 1;
    renderJobs();

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

    const suggestionsDiv = document.getElementById('search-suggestions');
    if (suggestionsDiv) suggestionsDiv.classList.remove('show');
};

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

window.clearRecentSearches = function () {
    recentSearches = [];
    localStorage.setItem('recentJobSearches', JSON.stringify(recentSearches));
    const searchInput = document.getElementById('job-search-input');
    if (searchInput && typeof renderSuggestions === 'function') {
        renderSuggestions(searchInput.value);
    }
};

const jobSuggestions = [
    { title: "Kỹ sư phần mềm", category: "IT - Phần mềm", count: 1240, icon: "code" },
    { title: "Lập trình viên Frontend", category: "IT - Phần mềm", count: 856, icon: "code" },
    { title: "Lập trình viên Backend", category: "IT - Phần mềm", count: 723, icon: "code" },
    { title: "Lập trình viên Fullstack", category: "IT - Phần mềm", count: 892, icon: "code" },
    { title: "Kỹ sư DevOps", category: "IT - Phần mềm", count: 345, icon: "cloud" },
    { title: "Chuyên viên Phân tích dữ liệu", category: "IT - Dữ liệu", count: 567, icon: "analytics" },
    { title: "Kỹ sư AI/ML", category: "IT - Trí tuệ nhân tạo", count: 234, icon: "psychology" },
    { title: "Chuyên viên An ninh mạng", category: "IT - Bảo mật", count: 378, icon: "security" },
    { title: "Kiểm thử phần mềm (QA/Tester)", category: "IT - Kiểm thử", count: 567, icon: "bug_report" },
    { title: "Lập trình viên Mobile (iOS/Android)", category: "IT - Di động", count: 678, icon: "phone_android" },
    { title: "Chuyên viên Kinh doanh", category: "Kinh doanh", count: 2341, icon: "trending_up" },
    { title: "Nhân viên Bán hàng", category: "Bán hàng", count: 1856, icon: "shopping_cart" },
    { title: "Chuyên viên Chăm sóc khách hàng", category: "Chăm sóc khách hàng", count: 1234, icon: "headset" },
    { title: "Chuyên viên Marketing", category: "Marketing", count: 982, icon: "campaign" },
    { title: "Chuyên viên Digital Marketing", category: "Marketing", count: 734, icon: "online_prediction" },
    { title: "Chuyên viên SEO/SEM", category: "Marketing", count: 456, icon: "search" },
    { title: "Chuyên viên Content Marketing", category: "Marketing", count: 567, icon: "description" },
    { title: "Chuyên viên Social Media", category: "Marketing", count: 623, icon: "share" },
    { title: "Kế toán tổng hợp", category: "Kế toán", count: 671, icon: "calculate" },
    { title: "Kế toán trưởng", category: "Kế toán", count: 345, icon: "account_balance" },
    { title: "Chuyên viên Tài chính", category: "Tài chính", count: 456, icon: "finance" },
    { title: "Giao dịch viên Ngân hàng", category: "Ngân hàng", count: 567, icon: "account_balance" },
    { title: "Nhân viên Hành chính", category: "Hành chính", count: 567, icon: "badge" },
    { title: "Chuyên viên Nhân sự", category: "Nhân sự", count: 834, icon: "people" },
    { title: "Chuyên viên Tuyển dụng", category: "Nhân sự", count: 567, icon: "person_search" },
    { title: "Kỹ sư Xây dựng", category: "Xây dựng", count: 512, icon: "construction" },
    { title: "Kỹ sư Cơ khí", category: "Cơ khí", count: 456, icon: "settings" },
    { title: "Kỹ sư Điện", category: "Điện", count: 345, icon: "electrical_services" },
    { title: "Giáo viên Tiếng Anh", category: "Giáo dục", count: 678, icon: "school" },
    { title: "Thiết kế Đồ họa", category: "Thiết kế", count: 423, icon: "brush" },
    { title: "Thiết kế UI/UX", category: "Thiết kế", count: 345, icon: "design_services" },
    { title: "Bác sĩ Đa khoa", category: "Y tế", count: 234, icon: "local_hospital" },
    { title: "Điều dưỡng viên", category: "Y tế", count: 456, icon: "health_and_safety" },
    { title: "Dược sĩ", category: "Dược", count: 345, icon: "medication" },
    { title: "Nhân viên Kho vận", category: "Logistics", count: 456, icon: "warehouse" },
    { title: "Shipper", category: "Giao hàng", count: 892, icon: "delivery_dining" },
    { title: "Luật sư", category: "Luật", count: 234, icon: "gavel" },
    { title: "Nhân viên Bảo vệ", category: "An ninh", count: 456, icon: "security" },
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
        let html = '';
        if (recentSearches.length > 0) {
            html += `<div class="recent-search"></div>
        ${recentSearches.map(term => `
          <div class="suggestion-item" onclick="selectSearch('${term.replace(/'/g, "\\'")}')">
            <div class="suggestion-item-icon"><span class="mat-icon">schedule</span></div>
            <div class="suggestion-item-content">
              <div class="suggestion-item-title">${term}</div>
              <div class="suggestion-item-sub">Tìm kiếm trước đó</div>
            </div>
            <div class="suggestion-item-jobs">🔍</div>
          </div>
        `).join('')}`;
        }
        html += `<div class="suggestion-group">
        <div class="suggestion-group-header">🔥 Gợi ý hôm nay</div>
        ${jobSuggestions.slice(0, 6).map(job => `
          <div class="suggestion-item" onclick="selectSearch('${job.title.replace(/'/g, "\\'")}')">
            <div class="suggestion-item-icon"><span class="mat-icon">${job.icon}</span></div>
            <div class="suggestion-item-content">
              <div class="suggestion-item-title">${job.title}</div>
              <div class="suggestion-item-sub">${job.category} • ${job.count.toLocaleString()} việc làm</div>
            </div>
            <div class="suggestion-item-jobs">→</div>
          </div>
        `).join('')}
      </div>`;
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
              <div class="suggestion-item-icon"><span class="mat-icon">${job.icon}</span></div>
              <div class="suggestion-item-content">
                <div class="suggestion-item-title">${highlightText(job.title, keyword)}</div>
                <div class="suggestion-item-sub">${job.category} • ${job.count.toLocaleString()} việc làm</div>
              </div>
              <div class="suggestion-item-jobs">${job.count}+</div>
            </div>
          `).join('')}
        </div>`;
        } else {
            suggestionsDiv.innerHTML = `
        <div class="suggestion-item" onclick="selectSearch('${keyword.replace(/'/g, "\\'")}')">
          <div class="suggestion-item-icon"><span class="mat-icon">search</span></div>
          <div class="suggestion-item-content">
            <div class="suggestion-item-title">Tìm kiếm "${keyword}"</div>
            <div class="suggestion-item-sub">Nhấn Enter để tìm kiếm việc làm</div>
          </div>
          <div class="suggestion-item-jobs">↵</div>
        </div>`;
        }
        suggestionsDiv.classList.add('show');
    }
}

/* ── PAGINATION BUTTONS ── */
const jobsPrev = document.getElementById('jobs-prev');
const jobsNext = document.getElementById('jobs-next');
if (jobsPrev) jobsPrev.onclick = () => { if (jobPage > 1) { jobPage--; renderJobs(); } };
if (jobsNext) jobsNext.onclick = () => { if (jobPage < totalPages) { jobPage++; renderJobs(); } };


/* ── LOAD PROVINCES ── */
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
document.addEventListener('DOMContentLoaded', () => {
    loadProvinces();

    filteredCards.length = 0;
    allCards.forEach(c => filteredCards.push(c));
    totalPages = Math.ceil(filteredCards.length / PER_PAGE);
    renderJobs();

    const searchInput = document.getElementById('job-search-input');
    const suggestionsDiv = document.getElementById('search-suggestions');
    const searchBtn = document.getElementById('search-btn');

    if (searchInput) {
        searchInput.addEventListener('focus', () => {
            renderSuggestions(searchInput.value);
            suggestionsDiv?.classList.add('show');
        });
        searchInput.addEventListener('click', (e) => {
            e.stopPropagation();
            renderSuggestions(searchInput.value);
            suggestionsDiv?.classList.add('show');
        });
        searchInput.addEventListener('input', (e) => {
            renderSuggestions(e.target.value);
            suggestionsDiv?.classList.add('show');
        });
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                const keyword = searchInput.value.trim();
                if (keyword) {
                    saveRecentSearch(keyword);
                    // Nếu Enter ở hero search → chuyển sang trang Jobs với từ khóa
                    goToSearch(keyword);
                }
                suggestionsDiv?.classList.remove('show');
                searchInput.blur();
            }
        });
    }

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const keyword = searchInput?.value?.trim();
            if (keyword) {
                saveRecentSearch(keyword);
                goToSearch(keyword);
            } else {
                window.location.href = 'Page/ViecLam/Jobs.html';
            }
            suggestionsDiv?.classList.remove('show');
        });
    }

    document.addEventListener('click', (e) => {
        if (searchInput && !searchInput.contains(e.target) &&
            suggestionsDiv && !suggestionsDiv.contains(e.target)) {
            suggestionsDiv.classList.remove('show');
        }
    });

    if (suggestionsDiv) {
        suggestionsDiv.addEventListener('click', (e) => e.stopPropagation());
    }
});