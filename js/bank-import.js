let csvData = [];
let csvHeaders = [];
let detectedSubs = [];
let otherTransactions = [];
let otherExpanded = false;

// Parse CSV text into headers and rows
function parseCSV(text) {

  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) {
    return { headers: [], rows: [] };
  }

  function parseLine(line) {
    const fields = [];
    let current = "";
    let insideQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i];

      if (ch === '"') {
        insideQuotes = !insideQuotes;
      } else if (ch === "," && !insideQuotes) {
        fields.push(current.trim());
        current = "";
      } else {
        current += ch;
      }
    }
    fields.push(current.trim());
    return fields;
  }

  const headers = parseLine(lines[0]);

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const row = parseLine(lines[i]);
    const hasData = row.some(cell => cell !== "");
    if (hasData) rows.push(row);
  }

  return { headers: headers, rows: rows };
}

function handleBankCSV(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = function(e) {
    const parsed = parseCSV(e.target.result);
    const headers = parsed.headers;
    const rows = parsed.rows;

    if (headers.length < 2 || rows.length < 1) {
      alert("Invalid CSV file. Make sure it has headers and transaction data.");
      return;
    }

    csvHeaders = headers;
    csvData = rows;

    // Build options for column selectors
    let optionsHtml = "";
    for (let i = 0; i < headers.length; i++) {
      optionsHtml += '<option value="' + i + '">' + headers[i] + '</option>';
    }

    const dateSelect = document.getElementById("bank-date-col");
    const descSelect = document.getElementById("bank-desc-col");
    const amountSelect = document.getElementById("bank-amount-col");

    if (dateSelect) dateSelect.innerHTML = '<option value="">None</option>' + optionsHtml;
    if (descSelect) descSelect.innerHTML = optionsHtml;
    if (amountSelect) amountSelect.innerHTML = optionsHtml;

    // Auto-detect columns
    const lowerHeaders = headers.map(h => h.toLowerCase());

    let dateIdx = -1;
    let descIdx = -1;
    let amountIdx = -1;

    for (let i = 0; i < lowerHeaders.length; i++) {
      const h = lowerHeaders[i];
      if (dateIdx < 0 && (h.includes("date") || h.includes("posted") || h.includes("time"))) {
        dateIdx = i;
      }
      if (descIdx < 0 && (h.includes("description") || h.includes("payee") || h.includes("merchant") || h.includes("name") || h.includes("memo") || h.includes("details"))) {
        descIdx = i;
      }
      if (amountIdx < 0 && (h.includes("amount") || h.includes("debit") || h.includes("withdrawal") || h.includes("charge") || h.includes("payment"))) {
        amountIdx = i;
      }
    }

    if (dateIdx >= 0 && dateSelect) dateSelect.value = dateIdx;
    if (descIdx >= 0 && descSelect) descSelect.value = descIdx;
    if (amountIdx >= 0 && amountSelect) amountSelect.value = amountIdx;

    // Go to step 2
    document.getElementById("bank-step-1").classList.add("hidden");
    document.getElementById("bank-step-2").classList.remove("hidden");
  };

  reader.readAsText(file);
}

function goBackToStep1() {
  document.getElementById("bank-step-1").classList.remove("hidden");
  document.getElementById("bank-step-2").classList.add("hidden");
  document.getElementById("bank-step-3").classList.add("hidden");
  
  csvData = [];
  csvHeaders = [];
  detectedSubs = [];
  
  const csvInput = document.getElementById("bank-csv-input");
  if (csvInput) csvInput.value = "";
}

function processCSVData() {
  const descSelect = document.getElementById("bank-desc-col");
  const amountSelect = document.getElementById("bank-amount-col");

  if (!descSelect || !amountSelect) return;

  const descIdx = parseInt(descSelect.value);
  const amountIdx = parseInt(amountSelect.value);

  if (isNaN(descIdx) || isNaN(amountIdx)) {
    alert("Please select description and amount columns");
    return;
  }

  // Find recurring transactions
  const transactions = {};
  
  for (let i = 0; i < csvData.length; i++) {
    const row = csvData[i];
    const desc = row[descIdx] || "";
    const amountStr = row[amountIdx] || "0";
    
    // Clean up description
    let cleanDesc = desc.trim();
    
    // Extract amount (handle negative, currency symbols, etc)
    let amount = parseFloat(amountStr.replace(/[^0-9.-]/g, ""));
    if (isNaN(amount)) amount = 0;
    
    // Make amounts positive
    amount = Math.abs(amount);
    
    if (amount > 0 && cleanDesc.length > 0) {
      const key = cleanDesc.toLowerCase();
      
      if (!transactions[key]) {
        transactions[key] = {
          description: cleanDesc,
          amounts: [],
          count: 0
        };
      }
      
      transactions[key].amounts.push(amount);
      transactions[key].count++;
    }
  }

  // Find subscriptions (recurring charges with similar amounts)
  detectedSubs = [];
  otherTransactions = [];

  for (const key in transactions) {
    const txn = transactions[key];
    
    // Consider it a subscription if it appears 2+ times
    if (txn.count >= 2) {
      // Calculate average amount
      const sum = txn.amounts.reduce((a, b) => a + b, 0);
      const avg = sum / txn.amounts.length;
      
      // Check if amounts are consistent (within 20%)
      const maxDiff = Math.max(...txn.amounts) - Math.min(...txn.amounts);
      const isConsistent = maxDiff <= avg * 0.2;
      
      if (isConsistent) {
        detectedSubs.push({
          description: txn.description,
          amount: avg,
          count: txn.count,
          selected: true
        });
      } else {
        otherTransactions.push({
          description: txn.description,
          amount: avg,
          count: txn.count
        });
      }
    }
  }

  if (detectedSubs.length === 0) {
    alert("No recurring subscriptions detected. Try uploading a CSV with more transaction history.");
    return;
  }

  // Render detected subscriptions
  renderDetectedSubs();

  // Go to step 3
  document.getElementById("bank-step-2").classList.add("hidden");
  document.getElementById("bank-step-3").classList.remove("hidden");
}

function renderDetectedSubs() {
  const container = document.getElementById("bank-detected-list");
  if (!container) return;

  let html = "";

  for (let i = 0; i < detectedSubs.length; i++) {
    const sub = detectedSubs[i];
    html += '<label class="flex items-center gap-3 rounded-xl border-2 border-slate-200 bg-white p-4 cursor-pointer transition-all hover:border-indigo-300">';
    html += '<input type="checkbox" ' + (sub.selected ? 'checked' : '') + ' onchange="toggleSubSelection(' + i + ')" class="h-5 w-5 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500">';
    html += '<div class="flex-1">';
    html += '<div class="font-semibold text-slate-900">' + sub.description + '</div>';
    html += '<div class="text-sm text-slate-500">Appears ' + sub.count + ' times • $' + sub.amount.toFixed(2) + '/mo avg</div>';
    html += '</div></label>';
  }

  container.innerHTML = html;
}

function toggleSubSelection(idx) {
  if (detectedSubs[idx]) {
    detectedSubs[idx].selected = !detectedSubs[idx].selected;
  }
}

function importSelectedSubs() {
  const selected = detectedSubs.filter(s => s.selected);
  
  if (selected.length === 0) {
    alert("Please select at least one subscription to import");
    return;
  }

  // Import each selected subscription
  for (let i = 0; i < selected.length; i++) {
    const sub = selected[i];
    
    const newSub = {
      id: Date.now() + i,
      name: sub.description,
      cost: sub.amount,
      period: "monthly",
      color: getRandomColor(),
      domain: ""
    };
    
    subs.push(newSub);
  }

  save();
  
  closeBankImport();
  
  alert("Successfully imported " + selected.length + " subscription" + (selected.length > 1 ? "s" : "") + "!");
}

function getRandomColor() {
  const colors = ["rose", "blue", "green", "purple", "orange", "teal", "indigo", "pink", "cyan"];
  return colors[Math.floor(Math.random() * colors.length)];
}

