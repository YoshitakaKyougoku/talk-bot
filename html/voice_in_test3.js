


const startBtn = document.querySelector('#start-btn');
const stopBtn = document.querySelector('#stop-btn');
const resultDiv = document.querySelector('#result-div');
const responseDiv = document.querySelector('#response-div')

function sayUser(message) {
  // 右側にチャットボックスを作成
  const chatbox =
  '<li><div class="balloon balloon-r">' +
  '<p class="say say-r">' +
  message +
  '</p>' +
  '</div></li>';
  $('#chat-area').append(chatbox);
  // メッセージ最下部までスクロール
  $(window).scrollTop($('#chat-area')[0].scrollHeight);
  }

  function sayOperator(message) {
    // 左側にチャットボックスを作成
    const chatbox =
    '<li><div class="balloon">' +
    '<img class="img-circle" src="icon.png" alt="image" />' +
    '<p class="say">' +
    message +
    '</p>' +
    '</div></li>';
    $('#chat-area').append(chatbox);
    // メッセージ最下部までスクロール
    $(window).scrollTop($('#chat-area')[0].scrollHeight);
    }
  
SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();
  
  recognition.lang = 'ja-JP';
  recognition.interimResults = true;
  recognition.continuous = true;
  
  let finalTranscript = ''; // 確定した(黒の)認識結果
  
  recognition.onresult = (event) => {
    let interimTranscript = ''; // 暫定(灰色)の認識結果
    for (let i = event.resultIndex; i < event.results.length; i++) {
      let transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        finalTranscript += transcript;
        if (transcript !== '') {
          sayUser(transcript)
        }
        
        finalTranscript = ''
      } else {
        interimTranscript = transcript;
      }
    }
    resultDiv.innerHTML = finalTranscript + '<i style="color:#ddd;">' + interimTranscript + '</i>';
    
      
  }


  startBtn.onclick = () => {
    recognition.start();
    sayOperator('こんにちは')
    //responseDiv.innerHTML = 'こんにちは。どうされましたか？'
  }
  stopBtn.onclick = () => {
    recognition.stop();
    sayOperator('またお話ししましょう')
    //responseDiv.innerHTML = 'またお話ししましょう'

  }
