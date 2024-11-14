// Flutter로 메시지 전송 함수
function sendMessageToFlutter() {
    if (window.flutter_inappwebview) {
      window.flutter_inappwebview.callHandler("sendToFlutter", "Hello from JavaScript!");
    } else {
      console.log("Flutter WebView bridge not found.");
    }
  }
  
  // Flutter에서 메시지 받기
  function receiveMessageFromFlutter(message) {
    document.getElementById("flutterMessage").innerText = message;
  }