function goTo(pageId) {
  // Hide all pages
  document
    .querySelectorAll(".page")
    .forEach((p) => p.classList.remove("active"));
  // Show target page
  document.getElementById(pageId).classList.add("active");
}

// Add record entry
function addRecord() {
  const name = document.getElementById("recordName").value;
  if (!name) return;

  const now = new Date();
  const time = now.toLocaleTimeString();
  const date = now.toLocaleDateString();

  const table = document.getElementById("recordTable");
  const row = table.insertRow(-1);

  row.insertCell(0).textContent = name;
  row.insertCell(1).textContent = time;
  row.insertCell(2).textContent = date;

  document.getElementById("recordName").value = "";
}
