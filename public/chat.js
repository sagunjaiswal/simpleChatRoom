//make connection
//socket for the front end
let socket = io.connect('http://localhost:4000/');

let messageContent = document.getElementById('messageContent');
handleName = document.getElementById('handleName'),
btn = document.getElementById('send-btn'),
output = document.getElementById('output'),
feedback = document.getElementById('feedback');

//emit events
btn.addEventListener('click', () => {
    socket.emit('chat', {
        messageContent: messageContent.value,
        handleName: handleName.value
    });
    messageContent.value="";
});

messageContent.addEventListener('keypress', () => {
    socket.emit('typing', handleName.value);
});

//listen for events
socket.on('chat', (data) => {
    feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handleName + ': </strong>' + data.messageContent + '</p>';
});

socket.on('typing', (data) => {
    feedback.innerHTML = '<p><em>'+data+' is typing a message...</em></p>';
})