const path = require("path");
const http = require("http");
const express = require('express');
const socketio = require("socket.io");
const formatMessage = require("./utils/messages");
const {userJoin, getCurrentUser, userLeave, getRoomUsers} = require("./utils/users");


const app = express();
const server = http.createServer(app)
const io = socketio(server)

// Set static folder servant a acceder au front facilement
app.use(express.static(path.join(__dirname, 'public')));

const botName = "EfreiChat"; 

// lancement quand qlq se connecte
io.on('connection', socket => {
    socket.on("joinRoom", ({username, room}) =>{
        const user = userJoin(socket.id, username, room)

        socket.join(user.room);

        console.log("Nouvelle connexion ezpz");
        //message de bienvenue  pour l'utilisateur du chat
        socket.emit("message", formatMessage(botName,"Bienvenue sur EfreiChat :D")) //checker console .... ---- ____ socket.emit va emit juste à l'utilisateur 
    
        // Diffusion lorsque connection utilisateur
        // to(user.room) = emit un user dans la room de trafalgar d water law
        socket.broadcast
            .to(user.room)
            .emit('message', formatMessage(botName,`${user.username} a spawn dans le chat`)) // difference entre broadcast et emit c'est que broadcast emit à tout le monde sauf l'utilisateur qui se connecte
    
                // envoyer les info users + room shambles tacto injection
            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            })
        // io.emit aurait emit à absolument tout le monde (utilisateur + tous les autres)
    })


    socket.on("chatMessage", msg => {
        const user = getCurrentUser(socket.id);

        console.log(msg) // afficher msg dans terminalserv
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

     // Se lance quand utilisateur rajquit
     socket.on("disconnect", () => {
         const user = userLeave(socket.id);
         if(user){
        io.to(user.room).emit('message', formatMessage(botName, `${user.username} a explosé son clavier dédicassé par le président d'Efrei Paris et a RAJQUIT le chat`)) 
         }

         // envoyer les info users + room shambles tacto injection
         io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        })

    });

});

const PORT = 3000 || process.env.PORT; //verifie si une variable d'environnement a le nom PORT et si non elle utilisera 3000

server.listen(PORT, () => console.log(`Le serveur s'execute sur la port ${PORT} `));