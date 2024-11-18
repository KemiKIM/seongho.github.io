// 버튼에서 롱탭 비활성화
function disableLongTap(event) {
  event.preventDefault();  // 기본 동작(롱탭 메뉴 등) 방지
}

// 실행
document.addEventListener('DOMContentLoaded', () => {
  const button = document.querySelector('button');

});



function validateNumber(event) {
  // 입력된 값에서 숫자만 남기고 나머지 문자 제거
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
}


// Flutter로 메시지 전송 함수
function sendMessageToFlutter() {
  // Flutter로 메시지를 보내는 코드 (JavaScriptChannel을 통해)

  if (window.flutter) {
    window.flutter.postMessage("Hello AOS JS!");
  } else {
    console.log("????");
  }


  if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.FlutterChannel) {
    // FlutterChannel을 통해 메시지를 Flutter로 전송
    window.webkit.messageHandlers.FlutterChannel.postMessage("Hello from JavaScript!");
  } else {
    console.log("Flutter WebView bridge not found.");
  }
}
  
  // Flutter에서 메시지 받기
  function receiveMessageFromFlutter(message) {
    document.getElementById("flutterMessage").innerText = message;
  }

  