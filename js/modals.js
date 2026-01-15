const backdrop = document.getElementById("modal-backdrop");
const addModal = document.getElementById("add-modal");

function showModal() {
  backdrop.classList.remove("hidden");
  addModal.classList.remove("hidden");
  addModal.classList.add("flex");

  requestAnimationFrame(function() {
    backdrop.classList.remove("opacity-0");
    backdrop.classList.add("opacity-100");
  });
}

function hideModal() {
  backdrop.classList.add("opacity-0");
  backdrop.classList.remove("opacity-100");

  setTimeout(function() {
    backdrop.classList.add("hidden");
    addModal.classList.add("hidden");
    addModal.classList.remove("flex");
  }, 300);
}

function openModal() {
  const form = document.getElementById("add-form");
  if (form) form.reset();
  showModal();
}

function closeModal() {
  hideModal();
}

function openModalWithPreset(presetIdx) {
  const preset = presets[presetIdx];
  if (!preset) return;

  const form = document.getElementById("add-form");
  if (form) form.reset();
  
  const nameInput = document.getElementById("sub-name");
  const costInput = document.getElementById("sub-cost");
  const websiteInput = document.getElementById("sub-website");
  const periodInput = document.getElementById("sub-period");
  
  if (nameInput) nameInput.value = preset.name;
  if (costInput) costInput.value = preset.price;
  if (websiteInput && preset.domain) websiteInput.value = preset.domain;
  if (periodInput) periodInput.value = preset.cycle.toLowerCase();

  showModal();
}


const settingsBackdrop = document.getElementById("modal-backdrop");
const settingsModal = document.getElementById("settings-modal");

function openSettings() {
  settingsBackdrop.classList.remove("hidden");
  settingsModal.classList.remove("hidden");
  settingsModal.classList.add("flex");

  requestAnimationFrame(function() {
    settingsBackdrop.classList.remove("opacity-0");
    settingsBackdrop.classList.add("opacity-100");
  });
}

function closeSettings() {
  settingsBackdrop.classList.add("opacity-0");
  settingsBackdrop.classList.remove("opacity-100");

  setTimeout(function() {
    settingsBackdrop.classList.add("hidden");
    settingsModal.classList.add("hidden");
    settingsModal.classList.remove("flex");
  }, 300);
}

// Export modal functions
const exportBackdrop = document.getElementById("modal-backdrop");
const exportModal = document.getElementById("export-modal");

function openExportModal() {
  exportBackdrop.classList.remove("hidden");
  exportModal.classList.remove("hidden");
  exportModal.classList.add("flex");

  requestAnimationFrame(function() {
    exportBackdrop.classList.remove("opacity-0");
    exportBackdrop.classList.add("opacity-100");
  });
}

function closeExportModal() {
  exportBackdrop.classList.add("opacity-0");
  exportBackdrop.classList.remove("opacity-100");

  setTimeout(function() {
    exportBackdrop.classList.add("hidden");
    exportModal.classList.add("hidden");
    exportModal.classList.remove("flex");
  }, 300);
}

let selectedCategory = null;

const presetsBackdrop = document.getElementById("modal-backdrop");
const presetsModal = document.getElementById("presets-modal");

function openPresetsBrowser() {
  selectedCategory = null;
  const searchInput = document.getElementById("presets-search");
  if (searchInput) {
    searchInput.value = "";
    // Wire up search functionality
    searchInput.oninput = function() {
      filterPresets(this.value);
    };
  }

  renderCategoryFilters();
  renderPresetsBrowserList();

  presetsBackdrop.classList.remove("hidden");
  presetsModal.classList.remove("hidden");
  presetsModal.classList.add("flex");

  requestAnimationFrame(function() {
    presetsBackdrop.classList.remove("opacity-0");
    presetsBackdrop.classList.add("opacity-100");
  });
}

function closePresetsBrowser() {
  presetsBackdrop.classList.add("opacity-0");
  presetsBackdrop.classList.remove("opacity-100");

  setTimeout(function() {
    presetsBackdrop.classList.add("hidden");
    presetsModal.classList.add("hidden");
    presetsModal.classList.remove("flex");
  }, 300);
}

function renderCategoryFilters() {
  const filtersEl = document.getElementById("category-filters");
  if (!filtersEl) return;

  const cats = getCategories();

  let html = '<button onclick="selectCategory(null)" class="category-btn px-3 py-1 rounded-full text-xs font-semibold transition-all ';
  html += selectedCategory ? 'bg-slate-100 text-slate-600 hover:bg-slate-200' : 'bg-slate-900 text-white';
  html += '">All</button>';

  for (let i = 0; i < cats.length; i++) {
    const cat = cats[i];
    const isActive = (selectedCategory === cat);
    html += '<button onclick="selectCategory(\'' + cat + '\')" class="category-btn px-3 py-1 rounded-full text-xs font-semibold transition-all ';
    html += isActive ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200';
    html += '">' + cat + '</button>';
  }

  filtersEl.innerHTML = html;
}

function selectCategory(cat) {
  selectedCategory = cat;
  renderCategoryFilters();

  const searchInput = document.getElementById("presets-search");
  const query = searchInput ? searchInput.value : "";
  filterPresets(query);
}

function filterPresets(searchQuery) {
  const q = searchQuery.toLowerCase().trim();
  let results = presets;

  if (selectedCategory) {
    results = results.filter(function(p) {
      return p.category === selectedCategory;
    });
  }

  if (q.length > 0) {
    results = results.filter(function(p) {
      return p.name.toLowerCase().includes(q) ||
             p.category.toLowerCase().includes(q) ||
             p.domain.toLowerCase().includes(q);
    });
  }

  renderPresetsBrowserList(results);
}

function renderPresetsBrowserList(presetsToShow) {
  if (!presetsToShow) presetsToShow = presets;

  const container = document.getElementById("presets-browser-list");
  if (!container) return;

  if (presetsToShow.length === 0) {
    container.innerHTML = '<div class="text-center text-slate-400 py-8">No subscriptions found</div>';
    return;
  }

  const byCategory = {};
  for (let i = 0; i < presetsToShow.length; i++) {
    const p = presetsToShow[i];
    if (!byCategory[p.category]) {
      byCategory[p.category] = [];
    }
    byCategory[p.category].push(p);
  }

  let html = "";
  const categoryNames = Object.keys(byCategory);

  for (let c = 0; c < categoryNames.length; c++) {
    const catName = categoryNames[c];
    const items = byCategory[catName];

    html += '<div class="mb-5">';
    html += '<h4 class="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">' + catName + '</h4>';
    html += '<div class="grid grid-cols-2 gap-2">';

    for (let i = 0; i < items.length; i++) {
      const p = items[i];
      const idx = presets.indexOf(p);
      const logo = "https://img.logo.dev/" + p.domain + "?token=pk_KuI_oR-IQ1-fqpAfz3FPEw&size=100&retina=true&format=png";

      html += '<button onclick="selectPresetFromBrowser(' + idx + ')" ';
      html += 'class="flex items-center gap-3 rounded-xl border border-slate-100 bg-white p-3 text-left shadow-sm transition-all hover:border-indigo-200 hover:shadow-md active:scale-[0.98]">';
      html += '<img src="' + logo + '" class="h-10 w-10 rounded-lg object-contain shrink-0" crossorigin="anonymous" alt="' + p.name + '">';
      html += '<div class="min-w-0 flex-1">';
      html += '<div class="font-semibold text-slate-900 text-sm truncate">' + p.name + '</div>';
      html += '<div class="text-xs text-slate-500">$' + p.price + '/mo</div>';
      html += '</div></button>';
    }

    html += '</div></div>';
  }

  container.innerHTML = html;
}

function selectPresetFromBrowser(idx) {
  closePresetsBrowser();
  // small delay so the close animation finishes before opening the form
  setTimeout(function() {
    openModalWithPreset(idx);
  }, 300);
}

function closeAllModals() {
  closeModal();
  closeSettings();
  closePresetsBrowser();
  closeBankImport();
}

// Bank Import Modal Functions
const bankImportModal = document.getElementById("bank-import-modal");

function openBankImport() {
  // Reset to step 1
  const step1 = document.getElementById("bank-step-1");
  const step2 = document.getElementById("bank-step-2");
  const step3 = document.getElementById("bank-step-3");
  const csvInput = document.getElementById("bank-csv-input");
  
  if (step1) step1.classList.remove("hidden");
  if (step2) step2.classList.add("hidden");
  if (step3) step3.classList.add("hidden");
  if (csvInput) csvInput.value = "";

  backdrop.classList.remove("hidden");
  bankImportModal.classList.remove("hidden");
  bankImportModal.classList.add("flex");

  requestAnimationFrame(function() {
    backdrop.classList.remove("opacity-0");
    backdrop.classList.add("opacity-100");
  });
}

function closeBankImport() {
  backdrop.classList.add("opacity-0");
  backdrop.classList.remove("opacity-100");

  setTimeout(function() {
    bankImportModal.classList.add("hidden");
    bankImportModal.classList.remove("flex");
    backdrop.classList.add("hidden");
  }, 300);
}
