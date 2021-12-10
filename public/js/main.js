
//Faire en sorte que lorsqu'on appuie sur le bouton pour envoyer messag cela emit au serveur et ce dernier nous le renvoi et apres on le fout en DOM
const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages")
const roomName = document.getElementById("room-name")
const userList = document.getElementById("room-name")
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix:true //enlever les cara nul
}) //avoir username room qs librarie pour query string url ez pz

console.log(username, room)

const socket = io();

//rejoindre la room
socket.emit("joinRoom", {username, room})

//recup users et la room de trafalgar d water law
socket.on("roomUsers", ({room, users}) => {
    outputRoomName(room);
    outputUsers(users);
})

//msg depuis serv
socket.on("message", message => {
    console.log(message)
    outputMessage(message)

    chatMessages.scrollTop = chatMessages.scrollHeight;
})

// envoi du message
chatForm.addEventListener("submit", e => { 
    e.preventDefault();

    //recup msg
    const msg = e.target.elements.msg.value; //e.target pour selectionner l'element qu'on veut, e.target.elements.msg (msg = id de l'input dans chat.html )
    console.log(msg)

    // envoi message au serveur
    socket.emit("chatMessage", msg)

    // nettoyer barre texte + reglage scroll
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

function outputMessage(message) {
    const div = document.createElement("div")
    div.classList.add("message") //Hermione Reparo Recurvite wingardium leviosa tarrentallegra soleil jonquille momosa que ce vilain rat en jaune soit
    div.innerHTML=`<p class="meta">${message.username} <span>${message.time}</span></p>
    <p class="text">
        ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div) //a chaque fois que message envoyé = creation d'une nouvelle div
}

// Ajouter la roooooom de Torafarugā Dī Wāteru Rō au DOM + ajou utilisateur

//uno
function outputRoomName(room){
roomName.innerText=room
}

//dos
function outputUsers(users){
    userList.innerHTML = `
        ${users.map(user => `<li>${user.username}</li>`).join('')}
    `;
}
