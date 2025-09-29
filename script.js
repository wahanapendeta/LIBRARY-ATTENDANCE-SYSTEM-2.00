// Navigation
function goTo(pageId) {
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  document.getElementById(pageId).classList.add("active");

  document
    .querySelectorAll(".sidebar button")
    .forEach((b) => b.classList.remove("active"));
  [...document.querySelectorAll(".sidebar button")]
    .find((b) => b.getAttribute("onclick").includes(pageId))
    ?.classList.add("active");
}

// Toast message
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 3000);
}

// -------------------- Rekod --------------------
function addRecord() {
  const name = document.getElementById("recordName").value.trim();
  if (!name) {
    showToast("⚠️ Nama tidak boleh kosong!");
    return;
  }

  const now = new Date();
  const time = now.toLocaleTimeString("ms-MY", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const date = now.toLocaleDateString("ms-MY", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const table = document.getElementById("recordTable");
  const row = table.insertRow(-1);

  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = time;
  row.insertCell(2).textContent = date;

  const delCell = row.insertCell(3);
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.className = "btn";
  delBtn.onclick = () => {
    row.remove();
    saveRecords();
  };
  delCell.appendChild(delBtn);

  document.getElementById("recordName").value = "";
  saveRecords();
  showToast("✅ Rekod berjaya ditambah!");
}

function saveRecords() {
  const rows = [...document.querySelectorAll("#recordTable tr")].slice(1); // exclude header
  const data = rows.map((r) => [
    r.cells[0].textContent,
    r.cells[1].textContent,
    r.cells[2].textContent,
  ]);
  localStorage.setItem("records", JSON.stringify(data));
}

function loadRecords() {
  const data = JSON.parse(localStorage.getItem("records") || "[]");
  const table = document.getElementById("recordTable");
  data.forEach(([name, time, date]) => {
    const row = table.insertRow(-1);
    row.insertCell(0).textContent = name;
    row.insertCell(1).textContent = time;
    row.insertCell(2).textContent = date;

    const delCell = row.insertCell(3);
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.className = "btn";
    delBtn.onclick = () => {
      row.remove();
      saveRecords();
    };
    delCell.appendChild(delBtn);
  });
}

// -------------------- Jadual --------------------
function saveSchedule() {
  const rows = [...document.querySelectorAll("#scheduleTable tr")].slice(1);
  const data = rows.map((r) => [
    r.cells[0].textContent,
    r.cells[1].textContent,
  ]);
  localStorage.setItem("schedule", JSON.stringify(data));
  showToast("💾 Jadual disimpan!");
}

function loadSchedule() {
  const data = JSON.parse(localStorage.getItem("schedule") || "[]");
  if (!data.length) return;

  const table = document.getElementById("scheduleTable");
  // clear rows kecuali header
  while (table.rows.length > 1) {
    table.deleteRow(1);
  }

  data.forEach(([hari, aktiviti]) => {
    const row = table.insertRow(-1);
    const hariCell = row.insertCell(0);
    hariCell.textContent = hari;
    hariCell.contentEditable = "true";

    const aktCell = row.insertCell(1);
    aktCell.textContent = aktiviti;
    aktCell.contentEditable = "true";
  });
}

// -------------------- Init --------------------
window.onload = () => {
  loadRecords();
  loadSchedule();
};
