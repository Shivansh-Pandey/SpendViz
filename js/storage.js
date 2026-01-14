// localstorage keys - using vexly prefix for namespacing
// (this was the old name of the project)
const STORAGE_KEY = "vexly_flow_data";
const CURRENCY_KEY = "vexly_currency";

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      subs = JSON.parse(raw);
      // Migrate old subscriptions without currency property
      migrateSubscriptionsCurrency();
    }
  } catch (err) {
    // probably corrupted data, just start fresh
    console.warn("failed to load saved data:", err);
    subs = [];
  }
}

function migrateSubscriptionsCurrency() {
  let needsSave = false;
  subs.forEach(sub => {
    if (!sub.currency) {
      sub.currency = selectedCurrency || 'USD';
      needsSave = true;
    }
  });
  if (needsSave) {
    console.log('Migrated subscriptions to use current currency');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  }
}

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subs));
  renderList();
}

async function loadCurrency() {
  const saved = localStorage.getItem(CURRENCY_KEY);
  console.log('loadCurrency called, saved:', saved);

  // make sure it's a valid currency code
  if (saved && currencies[saved]) {
    selectedCurrency = saved;
    console.log('Using saved currency:', selectedCurrency);
  } else {
    // Auto-detect currency based on user's location
    console.log('No saved currency, detecting...');
    await detectAndSetCurrency();
  }
}

async function detectAndSetCurrency() {
  try {
    console.log('Fetching location data...');
    // Try to detect user's country from timezone or IP
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    console.log('Location data:', data);
    
    const countryToCurrency = {
      'US': 'USD',
      'IN': 'INR',
      'GB': 'GBP',
      'EU': 'EUR',
      'CA': 'CAD',
      'AU': 'AUD',
      'JP': 'JPY',
      'CN': 'CNY',
      'SG': 'SGD',
      'AE': 'AED',
      'SA': 'SAR',
      'BR': 'BRL',
      'MX': 'MXN',
      'ZA': 'ZAR'
    };
    
    const detectedCountry = data.country_code;
    const detectedCurrency = countryToCurrency[detectedCountry] || 'USD';
    const currencyName = currencies[detectedCurrency]?.name || detectedCurrency;
    
    console.log('Detected:', detectedCountry, detectedCurrency, currencyName);
    
    // Show popup to user
    showCurrencyDetectionPopup(detectedCountry, detectedCurrency, currencyName);
    
  } catch (error) {
    console.error('Could not detect location:', error);
    selectedCurrency = 'USD';
    saveCurrency('USD');
  }
}

function showCurrencyDetectionPopup(country, currency, currencyName) {
  console.log('showCurrencyDetectionPopup called:', country, currency, currencyName);
  
  const countryNames = {
    'US': 'United States',
    'IN': 'India',
    'GB': 'United Kingdom',
    'CA': 'Canada',
    'AU': 'Australia',
    'JP': 'Japan',
    'CN': 'China',
    'SG': 'Singapore',
    'AE': 'United Arab Emirates',
    'SA': 'Saudi Arabia',
    'BR': 'Brazil',
    'MX': 'Mexico',
    'ZA': 'South Africa'
  };
  
  const countryName = countryNames[country] || country;
  console.log('Creating popup for:', countryName);
  
  // Create popup modal
  const popup = document.createElement('div');
  popup.className = 'fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm';
  popup.innerHTML = `
    <div class="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8 transform scale-95 animate-in">
      <div class="mb-6 text-center">
        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
          <span class="iconify h-8 w-8 text-blue-600" data-icon="ph:globe-bold"></span>
        </div>
        <h2 class="mb-2 text-2xl font-black text-slate-900">Welcome to SpendViz!</h2>
        <p class="text-slate-600">
          We detected you're in <strong>${countryName}</strong>.<br>
          We've set your currency to <strong>${currencyName} (${currency})</strong>.
        </p>
      </div>
      <div class="space-y-3">
        <button onclick="acceptDetectedCurrency('${currency}')" class="w-full rounded-xl bg-gradient-to-r from-blue-500 to-teal-500 py-3 font-bold text-white shadow-lg shadow-blue-500/30 transition-all hover:shadow-xl hover:shadow-blue-500/50 active:scale-95">
          Continue with ${currency}
        </button>
        <button onclick="openCurrencySettings()" class="w-full rounded-xl border-2 border-slate-200 bg-white py-3 font-bold text-slate-700 transition-all hover:bg-slate-50">
          Change Currency
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(popup);
  console.log('Popup added to DOM');
  
  // Store reference for later removal
  window.currencyPopup = popup;
}

// Make functions globally accessible
window.acceptDetectedCurrency = acceptDetectedCurrency;
window.openCurrencySettings = openCurrencySettings;

function acceptDetectedCurrency(currency) {
  console.log('acceptDetectedCurrency called with:', currency);
  selectedCurrency = currency;
  saveCurrency(currency);
  
  // Remove popup
  if (window.currencyPopup) {
    window.currencyPopup.remove();
    window.currencyPopup = null;
  }
  
  // Update UI
  const dropdown = document.getElementById("currency-select");
  if (dropdown) dropdown.value = currency;
  
  renderList();
  if (step === 2) renderGrid();
}

function openCurrencySettings() {
  console.log('openCurrencySettings called');
  // Remove currency popup
  if (window.currencyPopup) {
    window.currencyPopup.remove();
    window.currencyPopup = null;
  }
  
  // Open settings modal
  openSettings();
}

function saveCurrency(code) {
  selectedCurrency = code;
  localStorage.setItem(CURRENCY_KEY, code);

  renderList();
  if (step === 2) renderGrid();
}

function exportData() {
  const exportObj = {
    version: 1,
    exportedAt: new Date().toISOString(),
    currency: selectedCurrency,
    subscriptions: subs
  };

  const jsonStr = JSON.stringify(exportObj, null, 2);
  const blob = new Blob([jsonStr], { type: "application/json" });
  const blobUrl = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = "spendviz-backup-" + new Date().toISOString().split("T")[0] + ".json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(blobUrl);
}

function importData(evt) {
  const file = evt.target.files && evt.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);

      if (!data.subscriptions || !Array.isArray(data.subscriptions)) {
        throw new Error("Invalid file format");
      }

      for (let i = 0; i < data.subscriptions.length; i++) {
        const sub = data.subscriptions[i];
        if (!sub.id || !sub.name || typeof sub.price !== "number") {
          throw new Error("Invalid subscription data");
        }
      }

      let replaceExisting = true;
      if (subs.length > 0) {
        replaceExisting = confirm(
          "You have " + subs.length + " existing subscription(s).\n\n" +
          "Click OK to replace them with " + data.subscriptions.length + " imported subscription(s).\n\n" +
          "Click Cancel to merge (add imported to existing)."
        );
      }

      if (replaceExisting || subs.length === 0) {
        subs = data.subscriptions;
      } else {
        for (let i = 0; i < data.subscriptions.length; i++) {
          const imported = data.subscriptions[i];
          subs.push({
            id: Date.now().toString() + Math.random().toString(36).slice(2),
            name: imported.name,
            price: imported.price,
            currency: imported.currency || selectedCurrency || "USD",
            cycle: imported.cycle,
            url: imported.url || "",
            color: imported.color
          });
        }
      }

      if (data.currency && currencies[data.currency]) {
        saveCurrency(data.currency);
      }

      save();
      closeSettings();
      alert("Successfully imported " + data.subscriptions.length + " subscription(s)!");

    } catch (err) {
      alert("Failed to import: " + err.message);
    }
  };

  reader.readAsText(file);

  // reset the input so they can import the same file again if needed
  evt.target.value = "";
}
