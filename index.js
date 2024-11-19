// Firebase SDK 모듈화 버전 사용
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAzf-PtTwYpkTLbad_XQEhLyIrth_N-i5M",
    authDomain: "manageitem.firebaseapp.com",
    databaseURL: "https://manageitem-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "manageitem",
    storageBucket: "manageitem.firebasestorage.app",
    messagingSenderId: "892109334421",
    appId: "1:892109334421:web:459aa4e031ae18a4b9b89c"
  };

  // Firebase 초기화
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// 테이블 body 요소 선택
// Firebase에서 데이터를 불러온 후 검색 기능을 구현한 코드
// 여기서 수정 중...


// Firebase에서 데이터를 불러온 후 검색 기능
const tableBody = document.querySelector('#dataTable tbody');

// Firebase에서 'allitems' 경로의 데이터를 읽어오기
const usersRef = ref(database, 'allitems');
onValue(usersRef, (snapshot) => {
  const data = snapshot.val();
  tableBody.innerHTML = ''; // 기존 테이블 초기화

  const tableData = []; // 데이터를 저장할 배열

  // 테이블에 데이터를 추가하고 배열에 저장
  if (data) {
    for (let userId in data) {
      const user = data[userId];
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.partName}</td>
        <td>${user.partNumber}</td>
        <td>${user.location}</td>
      `;
      tableBody.appendChild(row);
      tableData.push(user); // 데이터 저장
    }
  }

  // 검색 기능
  const searchInput = document.getElementById('searchInput');
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase(); // 검색어 처리
    tableBody.innerHTML = ''; // 테이블 초기화

    // 검색어가 있으면 필터링된 데이터만 표시
    if (query) {
      tableData.forEach((user) => {
        // 모든 필드(name, partName, partNumber, location)를 하나로 합쳐서 검색
        const combinedText = `${user.name} ${user.partName} ${user.partNumber} ${user.location}`.toLowerCase();
        if (combinedText.includes(query)) {
          const row = document.createElement('tr');
          row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.partName}</td>
            <td>${user.partNumber}</td>
            <td>${user.location}</td>
          `;
          tableBody.appendChild(row);
        }
      });
    } else {
      // 검색어가 없을 경우 전체 데이터를 표시
      tableData.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.partName}</td>
          <td>${user.partNumber}</td>
          <td>${user.location}</td>
        `;
        tableBody.appendChild(row);
      });
    }
  });
});
