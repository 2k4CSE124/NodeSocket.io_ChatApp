// call io here
const socket = io();

let name;
do {
  name = prompt("Please enter your name");
} while (!name.trim());

let messageArea = document.querySelector(".message__area");
let textArea = document.querySelector("#textarea");

textArea.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    sendMessage(e.target.value);
  }
});

// function
function sendMessage(message) {
  console.log(message);
  let msg = {
    user: name,
    message: message.trim(),
  };

  // append msg in TextArea
  appendMessage(msg, "outgoing");

  textArea.value = "";

  // Send this msg to Server
  socket.emit("message", msg);
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement("div");
  mainDiv.classList.add(type, "message");

  let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;

  mainDiv.innerHTML = markup;
  messageArea.appendChild(mainDiv);

  scrollToBottom();
}

// Receive broadcasted msg from server
socket.on("message", (msg) => {
  appendMessage(msg, "incoming");
});

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight;
}
