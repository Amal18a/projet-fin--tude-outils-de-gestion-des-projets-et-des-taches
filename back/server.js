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

module.exports = { app };