// const socket = io();
//
// // DOM elements
// let message = document.getElementById('message');
// let username = document.getElementById('username');
// let btn = document.getElementById('send');
// let output = document.getElementById('output');
// let actions = document.getElementById('actions');
//
// // 버튼 클릭
// btn.addEventListener('click', function () {
//     socket.emit('chat:message', {
//         message: message.value,
//         username: username.value
//     });
//    // console.log(username.value, message.value);
// });
//
// // 키보드 입력중
// message.addEventListener('keypress', function () {
//     socket.emit('chat:typing', username.value);
// });
//
// // 아이디 : 메시지 쳇 내용
// socket.on('chat:message', function (data) {
//     actions.innerHTML = '';
//     output.innerHTML += '<p><strong>' + data.username + '</strong>'+' : '+ data.message+'</p>'
// });
//
// // 타입핑 중...
// socket.on('chat:typing', function (data) {
//     actions.innerHTML = '<p><em>'+ data +' is typing a message....</em></p>'
// });