// Select the table body and addRowButton
const tableBody = document.querySelector("#dynamicTable tbody");
const addRowButton = document.querySelector("#addRowButton");

// Function to render a row
function renderRow(rowData) {
  const row = document.createElement("tr");
  rowData.forEach((cellData) => {
    const cell = document.createElement("td");
    cell.textContent = cellData;
    row.appendChild(cell);
  });
  tableBody.appendChild(row);
}

// Function to open a modal for row input
function openInputModal() {
  const modalHtml = `
    <div id="inputModal" style="
      position: fixed; 
      top: 50%; 
      left: 50%; 
      transform: translate(-50%, -50%);
      background-color: white; 
      padding: 20px; 
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
      z-index: 1000; 
      border-radius: 8px;
      width: 300px;
    ">
      <h3>Enter Row Data</h3>
      <form id="inputForm">
        <label for="data1">1번:</label>
        <input type="text" id="data1" required style="width: 100%; margin-bottom: 10px;">
        <label for="data2">2번:</label>
        <input type="text" id="data2" required style="width: 100%; margin-bottom: 10px;">
        <label for="data3">3번:</label>
        <input type="text" id="data3" required style="width: 100%; margin-bottom: 10px;">
        <div style="text-align: right;">
          <button type="button" id="cancelButton" style="
            background-color: #d9534f; 
            color: white; 
            padding: 5px 10px; 
            border: none; 
            cursor: pointer; 
            border-radius: 4px;
            margin-right: 10px;
          ">Cancel</button>
          <button type="submit" style="
            background-color: #28a745; 
            color: white; 
            padding: 5px 10px; 
            border: none; 
            cursor: pointer; 
            border-radius: 4px;
          ">Submit</button>
        </div>
      </form>
    </div>
    <div id="modalBackdrop" style="
      position: fixed; 
      top: 0; 
      left: 0; 
      width: 100%; 
      height: 100%; 
      background-color: rgba(0, 0, 0, 0.4); 
      z-index: 999;
    "></div>
  `;

  document.body.insertAdjacentHTML("beforeend", modalHtml);

  // Add event listeners for buttons
  document.getElementById("cancelButton").addEventListener("click", closeInputModal);
  document.getElementById("inputForm").addEventListener("submit", handleSubmit);
}

// Function to close the modal
function closeInputModal() {
  document.getElementById("inputModal").remove();
  document.getElementById("modalBackdrop").remove();
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();

  const data1 = document.getElementById("data1").value;
  const data2 = document.getElementById("data2").value;
  const data3 = document.getElementById("data3").value;

  if (data1 && data2 && data3) {
    const newRow = [data1, data2, data3];
    saveToStorage(newRow); // Save to LocalStorage
    renderRow(newRow); // Render the new row
    closeInputModal(); // Close the modal
  }
}

// Save data to LocalStorage
function saveToStorage(rowData) {
  const existingData = JSON.parse(localStorage.getItem("tableData")) || [];
  existingData.push(rowData);
  localStorage.setItem("tableData", JSON.stringify(existingData));
}

// Load data from LocalStorage and render the table
function loadFromStorage() {
  const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
  storedData.forEach(renderRow);
}

// Add event listener to the + button
addRowButton.addEventListener("click", openInputModal);

// Load the table data on page load
loadFromStorage();


document.getElementById("addRowButton").addEventListener("click", function () {
  const table = document.getElementById("dynamicTable").getElementsByTagName('tbody')[0];
  const newRow = table.insertRow();
  
  const nameCell = newRow.insertCell(0);
  const detailCell = newRow.insertCell(1);
  const locationCell = newRow.insertCell(2);
  
  nameCell.textContent = "새 항목";
  detailCell.textContent = "상세 내용";
  locationCell.textContent = "위치 정보";
});
