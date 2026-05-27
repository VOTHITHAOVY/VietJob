// Apply button micro-interaction
const applyBtn = document.getElementById('apply-btn');
if (applyBtn) {
    applyBtn.addEventListener('mousedown', () => { applyBtn.style.transform = 'scale(0.97)'; });
    applyBtn.addEventListener('mouseup', () => { applyBtn.style.transform = ''; });
    applyBtn.addEventListener('mouseleave', () => { applyBtn.style.transform = ''; });
}

// Save button toggle
document.querySelectorAll('.btn-save').forEach(btn => {
    btn.addEventListener('click', () => {
        const icon = btn.querySelector('.mat-icon');
        if (!icon) return;
        if (icon.textContent.trim() === 'favorite_border') {
            icon.textContent = 'favorite';
            icon.style.color = '#EF4444';
            btn.style.borderColor = '#EF4444';
        } else {
            icon.textContent = 'favorite_border';
            icon.style.color = '';
            btn.style.borderColor = '';
        }
    });
});

// Copy link button
document.querySelectorAll('.share-btn.link').forEach(btn => {
    btn.addEventListener('click', () => {
        navigator.clipboard?.writeText(window.location.href);
        btn.innerHTML = '<span class="mat-icon" style="font-size:16px">check</span> Copied!';
        btn.style.background = '#D1FAE5';
        btn.style.color = '#065F46';
        setTimeout(() => {
            btn.innerHTML = '<span class="mat-icon" style="font-size:16px">link</span> Copy Link';
            btn.style.background = '';
            btn.style.color = '';
        }, 2000);
    });
});

function scrollToSection(id) {
    const el = document.getElementById(id);
    if (!el) return;
    // Update active tab
    document.querySelectorAll('.job-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Auto highlight tab on scroll
const sections = ['sec-detail','sec-benefits','sec-location','sec-company','sec-similar'];
const tabs = document.querySelectorAll('.job-tab');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) current = id;
    });
    tabs.forEach((tab, i) => {
        tab.classList.toggle('active', sections[i] === current || (current === '' && i === 0));
    });
});