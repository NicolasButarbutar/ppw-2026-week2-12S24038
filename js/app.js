import { ApiService } from './api-service.js';

document.addEventListener('DOMContentLoaded', async () => {
  // 1. Deklarasi DOM Elements
  const projectGrid = document.getElementById('project-grid');
  const projectLoading = document.getElementById('project-loading');
  const projectError = document.getElementById('project-error');
  const projectEmpty = document.getElementById('project-empty');
  const categoryFilters = document.querySelectorAll('.category-filter');
  
  const formServiceSelect = document.getElementById('form-service');
  const consultationForm = document.getElementById('consultationForm');
  const orderBadge = document.getElementById('order-badge');
  const btnSubmit = document.getElementById('btn-submit');
  
  // Modal Elements
  const universalModal = new bootstrap.Modal(document.getElementById('universalModal'));
  const modalTitle = document.getElementById('univModalTitle');
  const modalBody = document.getElementById('univModalBody');

  // State
  let projectsData = [];

  // 2. Load Initial Data (Decoupled Data Layer)
  await initApp();

  async function initApp() {
    try {
      // Set UI State: Loading
      setProjectState('loading');
      
      // Fetch data in parallel
      const [projects, services, profile] = await Promise.all([
        ApiService.getProjects(),
        ApiService.getServices(),
        ApiService.getProfile()
      ]);
      
      projectsData = projects;
      
      // Render Data
      renderProjects(projects);
      renderServicesDropdown(services);
      updateOrderBadge(); // Restore dari localStorage
      
      // Set UI State: Success
      setProjectState('success');
      
    } catch (error) {
      setProjectState('error');
    }
  }

  // 3. UI State Manager
  function setProjectState(state) {
    projectLoading.style.display = 'none';
    projectGrid.style.display = 'none';
    projectError.style.display = 'none';
    projectEmpty.style.display = 'none';

    if (state === 'loading') projectLoading.style.display = 'block';
    if (state === 'success') projectGrid.style.display = 'flex'; // menggunakan row d-flex
    if (state === 'error') projectError.style.display = 'block';
    if (state === 'empty') projectEmpty.style.display = 'block';
  }

  // 4. Rendering CSR (Kartu Proyek)
  function renderProjects(data) {
    projectGrid.innerHTML = '';
    
    if (data.length === 0) {
      setProjectState('empty');
      return;
    }
    
    data.forEach(proj => {
      const col = document.createElement('div');
      col.className = 'col';
      
      const tagsHtml = proj.tags.map(tag => `<span class="badge bg-light text-dark border">${tag}</span>`).join('');
      
      col.innerHTML = `
        <article class="card h-100 project-card shadow-sm border-0">
          <div class="card-header project-banner-header d-flex justify-content-between align-items-center bg-transparent border-bottom-0 pt-3 pb-0">
            <span class="badge bg-primary project-badge rounded-pill">${proj.category}</span>
            <small class="text-muted project-year fw-semibold">${proj.year}</small>
          </div>
          <div class="card-body project-content d-flex flex-column">
            <h3 class="card-title project-title h5 fw-bold mb-3">${proj.title}</h3>
            <p class="card-text project-summary text-muted small flex-grow-1">${proj.summary}</p>
            <div class="project-tags mb-3 d-flex flex-wrap gap-1">${tagsHtml}</div>
            <button type="button" class="btn btn-outline-primary w-100 mt-auto rounded-pill fw-semibold btn-detail" data-id="${proj.id}">
              Lihat Detail Proyek
            </button>
          </div>
        </article>
      `;
      projectGrid.appendChild(col);
    });

    // Attach Event Listeners to New Buttons for Universal Modal
    document.querySelectorAll('.btn-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.target.getAttribute('data-id');
        openUniversalModal(id);
      });
    });
  }

  // 5. Category Filtering
  categoryFilters.forEach(filter => {
    filter.addEventListener('click', (e) => {
      // Update active state
      categoryFilters.forEach(f => f.classList.remove('active', 'btn-primary'));
      categoryFilters.forEach(f => f.classList.add('btn-outline-primary'));
      
      e.target.classList.remove('btn-outline-primary');
      e.target.classList.add('active', 'btn-primary');
      
      const category = e.target.getAttribute('data-filter');
      
      if (category === 'All') {
        renderProjects(projectsData);
        if(projectsData.length > 0) setProjectState('success');
      } else {
        const filtered = projectsData.filter(p => p.category === category);
        renderProjects(filtered);
        if(filtered.length > 0) {
          setProjectState('success');
        } else {
          setProjectState('empty');
        }
      }
    });
  });

  // 6. Universal Dynamic Modal Injection
  function openUniversalModal(projectId) {
    const proj = projectsData.find(p => p.id === projectId);
    if (!proj) return;

    // Hindari XSS menggunakan manipulasi aman atau textContent
    modalTitle.textContent = proj.title;
    
    // Untuk list roles/tags bisa pakai innerHTML asal data internal terkontrol
    const rolesHtml = proj.roles.map(r => `<li>${r}</li>`).join('');
    const tagsHtml = proj.tags.map(t => `<span class="badge bg-secondary me-1">${t}</span>`).join('');
    
    modalBody.innerHTML = `
      <p class="mb-3">${proj.details}</p>
      <div class="mb-3">
        <h6 class="fw-bold">Peran:</h6>
        <ul>${rolesHtml}</ul>
      </div>
      <div class="mb-3">
        <h6 class="fw-bold">Capaian / Metrik:</h6>
        <p class="text-success fw-semibold"><i class="bi bi-check-circle-fill me-1"></i> ${proj.metrics}</p>
      </div>
      <div>
        <h6 class="fw-bold">Teknologi:</h6>
        <div>${tagsHtml}</div>
      </div>
    `;

    universalModal.show();
  }

  // 7. Render Services Dropdown Form
  function renderServicesDropdown(services) {
    // Sisakan opsi default
    const defaultOption = formServiceSelect.querySelector('option[disabled]');
    formServiceSelect.innerHTML = '';
    formServiceSelect.appendChild(defaultOption);
    
    services.forEach(svc => {
      const option = document.createElement('option');
      option.value = svc.name;
      option.textContent = svc.name;
      formServiceSelect.appendChild(option);
    });
  }

  // 8. Decoupled Form REST & LocalStorage State
  consultationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!consultationForm.checkValidity()) {
      consultationForm.classList.add('was-validated');
      return;
    }

    const formData = new FormData(consultationForm);
    
    // Status Tombol Loading
    const originalBtnText = btnSubmit.innerHTML;
    btnSubmit.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Mengirim...`;
    btnSubmit.disabled = true;

    try {
      // POST Request
      const result = await ApiService.submitConsultationForm(formData);
      
      // Simpan persisten ke localStorage
      saveOrderToLocal(result);
      
      // Update UI Badge
      updateOrderBadge();
      
      // Tampilkan Toast Success
      showToast('Berhasil!', 'Pemesanan layanan Anda telah tersimpan di sistem.', 'success');
      
      // Reset form
      consultationForm.reset();
      consultationForm.classList.remove('was-validated');
      
    } catch (error) {
      showToast('Gagal', 'Terjadi kesalahan jaringan. Silakan coba lagi.', 'danger');
    } finally {
      // Reset Button State
      btnSubmit.innerHTML = originalBtnText;
      btnSubmit.disabled = false;
    }
  });

  function saveOrderToLocal(orderData) {
    let orders = JSON.parse(localStorage.getItem('consultationOrders') || '[]');
    orders.push(orderData);
    localStorage.setItem('consultationOrders', JSON.stringify(orders));
  }

  function updateOrderBadge() {
    let orders = JSON.parse(localStorage.getItem('consultationOrders') || '[]');
    if(orderBadge) {
      orderBadge.textContent = orders.length;
      // Animasi notifikasi badge
      orderBadge.classList.add('animate__animated', 'animate__bounceIn');
      setTimeout(() => orderBadge.classList.remove('animate__animated', 'animate__bounceIn'), 1000);
    }
  }

  // 9. Bootstrap Toast Notification Utility
  function showToast(title, message, type='success') {
    const toastContainer = document.getElementById('toast-container');
    if (!toastContainer) return;
    
    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-success text-white' : 'bg-danger text-white';
    
    const toastHtml = `
      <div id="${toastId}" class="toast align-items-center ${bgClass} border-0" role="alert" aria-live="assertive" aria-atomic="true">
        <div class="d-flex">
          <div class="toast-body">
            <strong>${title}</strong><br/>${message}
          </div>
          <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
      </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    const toastEl = document.getElementById(toastId);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();
    
    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }

});
