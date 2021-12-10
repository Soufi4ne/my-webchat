const users = [];

//ajoute des utilisateurs a users
function userJoin(id, username, room) {
    const user = {id, username, room}

    users.push(user)

    return user;
}

function getCurrentUser(id) {
    return users.find(user => user.id === id)
}

//rajquit utilisateur
function userLeave(id) {
    const index = users.findIndex(user => user.id === id); //pour chaque user trouver ou user.id egal id donné

    if(index !== -1) //quand le findindex ne match pas il renvoi en negatif
    {
        return users.splice(index, 1)[0]//[0] pour renvoyer que l'user pas tout l'array mdr
    }
}

function getRoomUsers(room) {
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin, getCurrentUser, userLeave, getRoomUsers //export des fonctions pour les foutres dans le server.js ligne 6
}