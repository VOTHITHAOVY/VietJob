// ─── CV Option toggle ───
const cvOptions = document.querySelectorAll('.cv-option');
const uploadZone = document.getElementById('upload-zone');
const viecjobZone = document.getElementById('viecjob-zone');

cvOptions.forEach(opt => {
  opt.addEventListener('click', () => {
    cvOptions.forEach(o => o.classList.remove('selected'));
    opt.classList.add('selected');
    const type = opt.dataset.type;
    if (uploadZone) uploadZone.style.display = type === 'upload' ? 'block' : 'none';
    if (viecjobZone) viecjobZone.style.display = type === 'viecjob' ? 'block' : 'none';
  });
});

// ─── File drag & drop / input ───
const dropZone  = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const preview   = document.getElementById('file-preview');
const previewName = document.getElementById('preview-name');
const previewSize = document.getElementById('preview-size');
const removeBtn   = document.getElementById('remove-file');

function formatSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function showPreview(file) {
  if (!preview) return;
  previewName.textContent = file.name;
  previewSize.textContent = formatSize(file.size);
  preview.classList.add('show');
  if (dropZone) dropZone.style.display = 'none';
}

if (dropZone) {
  dropZone.addEventListener('dragover', e => { e.preventDefault(); dropZone.classList.add('dragover'); });
  dropZone.addEventListener('dragleave', () => dropZone.classList.remove('dragover'));
  dropZone.addEventListener('drop', e => {
    e.preventDefault(); dropZone.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    if (file) showPreview(file);
  });
}

if (fileInput) {
  fileInput.addEventListener('change', () => {
    const file = fileInput.files[0];
    if (file) showPreview(file);
  });
}

if (removeBtn) {
  removeBtn.addEventListener('click', () => {
    if (fileInput) fileInput.value = '';
    if (preview) preview.classList.remove('show');
    if (dropZone) dropZone.style.display = 'block';
  });
}

// ─── Char counter for cover letter ───
const textarea = document.getElementById('cover-letter');
const counter  = document.getElementById('char-count');
if (textarea && counter) {
  textarea.addEventListener('input', () => {
    const len = textarea.value.length;
    counter.textContent = len + ' / 2000';
    counter.style.color = len > 1800 ? '#EF4444' : '';
  });
}

// ─── Form submit ───
const form    = document.getElementById('apply-form');
const modal   = document.getElementById('success-modal');
const modalOk = document.getElementById('modal-ok');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    // Simple validation
    const name  = document.getElementById('full-name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');
    let valid = true;
    [name, phone, email].forEach(el => {
      if (el && !el.value.trim()) {
        el.style.borderColor = '#EF4444';
        el.style.boxShadow   = '0 0 0 3px rgba(239,68,68,.1)';
        valid = false;
        el.addEventListener('input', () => { el.style.borderColor = ''; el.style.boxShadow = ''; }, { once: true });
      }
    });
    if (!valid) return;
    // Show success modal
    if (modal) modal.classList.add('show');
  });
}

if (modalOk) {
  modalOk.addEventListener('click', () => {
    if (modal) modal.classList.remove('show');
  });
}
if (modal) {
  modal.addEventListener('click', e => {
    if (e.target === modal) modal.classList.remove('show');
  });
}