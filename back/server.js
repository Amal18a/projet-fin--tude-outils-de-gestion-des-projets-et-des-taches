// // express:biblioteque en js permet d'executer javascript en tant que serveur et permet aussi d'utiliser get post put... 
// // npm i express : pour installer express

// require('dotenv').config()

// // importation d'express
// const express= require('express');



// // instalaltion cors
// const cors = require('cors');

// // importation de routes
// const utilApi=require('./routes/util');
// const projetApi=require('./routes/projet');



// // importation de fichier connect 
// require('./config/connect');

// // creation de app qui herite tous les fonctionnalités d'express
// const app=express();
// app.use(express.json());

// app.use(cors());

// app.use('/util', utilApi);
// app.use('/projet',projetApi);



// app.use('/getimage', express.static('./upload'));






// // pour que le serveur travaille sans stop  a deux argument :port et une fonction 
// app.listen(3000, ()=>
// {
//     console.log('server work');
// });

// express:biblioteque en js permet d'executer javascript en tant que serveur et permet aussi d'utiliser get post put... 
// npm i express : pour installer express


// importation d'express
// const express= require('express');
// const http = require('http');

// const bodyParser = require('body-parser');
// // importation de routes
// const utilApi=require('./routes/util');
// const projetApi=require('./routes/projet');
// const messageApi=require('./routes/message');
// const sprintApi=require('./routes/sprint');
// const tacheApi=require('./routes/tache');
// const userStoryApi=require('./routes/userStory');
// const fichierApi=require('./routes/fichier');
// const socket = require('./socket');
// // importation de fichier connect 
// require('./config/connect');
// //importation cors
// const cors = require ('cors');
// const socketio = require ('socket.io'); 


// // creation de app qui herite tous les fonctionnalités d'express
// const app=express();
// app.use(express.json());
// app.use(cors());

// const server = http.createServer(app);
// const io = socketio(server);

// app.use('/util', utilApi);
// app.use('/projet', projetApi);
// app.use('/message', messageApi);
// app.use('/sprint', sprintApi);
// app.use('/tache', tacheApi);
// app.use('/userStory', userStoryApi);
// app.use('/fichier', fichierApi);
// app.use(bodyParser.json());



// app.use('/getimage', express.static('./upload'));


// const Util = require('./models/util');
// app.listen(3000, ()=>
// {
//     console.log('server work');
// });








// const express = require('express');
// const app = express();
// const http = require('http');
// const bodyParser = require('body-parser');
// const utilApi = require('./routes/util');
// const projetApi = require('./routes/projet');

// const sprintApi = require('./routes/sprint');
// const tacheApi = require('./routes/tache');
// const userStoryApi = require('./routes/userStory');
// const fichierApi = require('./routes/fichier');

// const cors = require('cors');
// require('./config/connect');


// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/util', utilApi);
// app.use('/projet', projetApi);

// app.use('/sprint', sprintApi);
// app.use('/tache', tacheApi);
// app.use('/userStory', userStoryApi);
// app.use('/fichier', fichierApi);
// app.use('/getimage', express.static('./upload'));

// const server = http.Server(app);
// const socketIO= require('socket.io'); 
// const io= socketIO(server);


// server.listen(3000, () => {
//   console.log('server work');
// });
// io.on('connection', (socket)=>{
//   socket.on('join' , (data)=>{
//     socket.join(data.room);
//     socket.broadcast.to(data.room).emit('user jointed');
//   });
//   socket.on('message',(data)=>{
//     io.in(data.room).emit('new message', {user:data.user,message:data.message});
//   });

// });

// module.exports = { app};const express = require('express');const express = require('express');
// const express = require('express');
// const app = express();
// const http = require('http').Server(app);
// const bodyParser = require('body-parser');
// const utilApi = require('./routes/util');
// const projetApi = require('./routes/projet');
// const sprintApi = require('./routes/sprint');
// const tacheApi = require('./routes/tache');
// const userStoryApi = require('./routes/userStory');
// const fichierApi = require('./routes/fichier');
// const discussionApi = require('./routes/discussion');
// const destinatairesDiscussionApi = require('./routes/destinatairesDiscussion');
// const messageApi = require('./routes/message');

// const cors = require('cors');
// const { init } = require('./socket'); // Importez la fonction init depuis votre fichier socket.js

// require('./config/connect');

// app.use(express.json());
// app.use(cors());
// app.use(bodyParser.json());
// app.use('/util', utilApi);
// app.use('/projet', projetApi);
// app.use('/sprint', sprintApi);
// app.use('/tache', tacheApi);
// app.use('/userStory', userStoryApi);
// app.use('/fichier', fichierApi);
// app.use('/discussion', discussionApi);
// app.use('/destinatairesDiscussion', destinatairesDiscussionApi);
// app.use('/message', messageApi);
// app.use('/getimage', express.static('./upload'));

// const server = http.listen(3000, () => {
//   console.log('Le serveur est en cours d\'exécution sur le port 3000');
// });

// const io = init(server); // Utilisez la fonction init pour initialiser les sockets

// module.exports = { app, io };


const express = require('express');
const app = express();
const http = require('http').Server(app);
const bodyParser = require('body-parser');
const utilApi = require('./routes/util');
const projetApi = require('./routes/projet');
const sprintApi = require('./routes/sprint');
const tacheApi = require('./routes/tache');
const userStoryApi = require('./routes/userStory');
const biProjApi = require('./routes/biProj');
const biChefApi = require('./routes/biChef');
const biMembresApi = require('./routes/biMembres');
const biAdminApi = require('./routes/biAdmin');

const cors = require('cors');
const { init } = require('./socket');

require('./config/connect');

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use('/util', utilApi);
app.use('/projet', projetApi);
app.use('/sprint', sprintApi);
app.use('/tache', tacheApi);
app.use('/userStory', userStoryApi);
app.use('/biProj', biProjApi);
app.use('/biChef', biChefApi);
app.use('/biMembres', biMembresApi);
app.use('/biAdmin', biAdminApi);


app.use('/getimage', express.static('./upload'));

const server = http.listen(3000, () => {
  console.log('Le serveur est en cours d\'exécution sur le port 3000');
});

const io = init(server);

module.exports = { app, io };