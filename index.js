const tableBody = document.querySelector("#dynamicTable tbody");
const addRowButton = document.querySelector("#addRowButton");

// 행을 렌더링하는 함수
function renderRow(rowData, rowIndex) {
  const row = document.createElement("tr");

  rowData.forEach((cellData) => {
    const cell = document.createElement("td");
    cell.textContent = cellData;
    row.appendChild(cell);
  });

  // 삭제 버튼 추가
  const deleteCell = document.createElement("td");
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "삭제";

  // 삭제 이벤트: 현재 행의 인덱스를 다시 계산하여 전달
  deleteButton.addEventListener("click", () => deleteRow(rowIndex));

  deleteCell.appendChild(deleteButton);
  row.appendChild(deleteCell);

  tableBody.appendChild(row);
}

// 삭제 버튼 클릭 시 호출되는 함수
function deleteRow(rowIndex) {
  let existingData = JSON.parse(localStorage.getItem("tableData")) || [];

  // 기존 데이터에서 해당 행 제거
  existingData.splice(rowIndex, 1);

  // 변경된 데이터를 다시 로컬 스토리지에 저장
  localStorage.setItem("tableData", JSON.stringify(existingData));

  // 페이지 새로고침
  location.reload(); 
}

function refreshTable() {
  tableBody.innerHTML = ""; // 기존 행 제거
  const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
  storedData.forEach((rowData, index) => renderRow(rowData, index));
}

// 행 추가 버튼 이벤트 리스너
addRowButton.addEventListener("click", openInputModal);

// 로컬 스토리지에서 데이터를 로드하고 테이블을 렌더링
function loadFromStorage() {
  const storedData = JSON.parse(localStorage.getItem("tableData")) || [];
  storedData.forEach((rowData, index) => renderRow(rowData, index));
}

loadFromStorage(); // 페이지 로드 시 데이터 불러오기

// 입력 모달을 여는 함수 (이 부분은 삭제와 관련된 기능은 아님)
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
      <h3>내용을 입력하세요</h3>
      <form id="inputForm">
        <label for="data1">이름:</label>
        <input type="text" id="data1" required style="width: 100%; margin-bottom: 10px;">
        <label for="data2">상세:</label>
        <input type="text" id="data2" required style="width: 100%; margin-bottom: 10px;">
        <label for="data3">위치:</label>
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
          ">취소</button>
          <button type="submit" style="
            background-color: #28a745; 
            color: white; 
            padding: 5px 10px; 
            border: none; 
            cursor: pointer; 
            border-radius: 4px;
          ">등록</button>
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

  // 버튼 이벤트 리스너 추가
  document.getElementById("cancelButton").addEventListener("click", closeInputModal);
  document.getElementById("inputForm").addEventListener("submit", handleSubmit);
}

// 모달 닫는 함수
function closeInputModal() {
  document.getElementById("inputModal").remove();
  document.getElementById("modalBackdrop").remove();
}

// 폼 제출 시 데이터 처리
function handleSubmit(event) {
  event.preventDefault();

  const data1 = document.getElementById("data1").value;
  const data2 = document.getElementById("data2").value;
  const data3 = document.getElementById("data3").value;

  if (data1 && data2 && data3) {
    const newRow = [data1, data2, data3];
    saveToStorage(newRow); // 로컬 스토리지에 저장
    renderRow(newRow); // 테이블에 행 추가
    closeInputModal(); // 모달 닫기
  }
}

// 데이터 로컬 스토리지에 저장하는 함수
function saveToStorage(rowData) {
  const existingData = JSON.parse(localStorage.getItem("tableData")) || [];
  existingData.push(rowData);
  localStorage.setItem("tableData", JSON.stringify(existingData));
}
