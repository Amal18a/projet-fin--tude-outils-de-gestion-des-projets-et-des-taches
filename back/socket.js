const socketIO = require('socket.io');


const Util = require('./models/util');
// const DestinatairesDiscussion = require('./models/destinatairesDiscussion');
let io;

function init(server) {
  io = socketIO(server);

  io.on('connection', (socket) => {
    console.log('Un utilisateur est connecté');

    socket.on('join', (data) => {
      socket.join(data.room);
      socket.broadcast.to(data.room).emit('userJoined');
    });

    socket.on('message', async (data) => {
      // Enregistrer le message dans la base de données
      const message = await Message.create({
        idUser: data.user,
        idDiscussion: data.room,
        contenu: data.message
      });

      // Émettre le nouvel objet message à tous les utilisateurs connectés dans la discussion
      io.in(data.room).emit('newMessage', message);
    });

    socket.on('disconnect', () => {
      console.log('Un utilisateur est déconnecté');
    });
  });

  return io;
}

async function emitNewDiscussion(discussion) {
  // Émettre l'événement 'new discussion' à tous les utilisateurs connectés
  io.emit('newDiscussion', discussion);
}

module.exports = {
  init,
  emitNewDiscussion
};
