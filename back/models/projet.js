const mongoose = require('mongoose');
const util = require('./util');
const Sprint = require('./sprint');
const userStory = require('./userStory');

const Tache = require('./tache');
const complexiteEnum = {
  values: ['faible', 'moyenne', 'élevée'],
  message: 'La complexité doit être faible, moyenne ou élevée',
};
const typeEnum = {
  values: ['web', 'mobile'],
  message: 'le type doit etre web ou mobile',
};

const projetSchema = new mongoose.Schema({
  nom: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date_debut: {
    type: Date,
    required: true
  },
  date_fin: {
    type: Date,
    required: true
  },
  membres: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'util'
  }],
  chef: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'util'
  },
  complexite: {
    type: String,
    enum: ['faible', 'moyenne', 'élevée']
  },
  sprints: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint'
  }],
  backlog: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userStory'
  }],
  type:{
    type:String,
    enum: ['web', 'mobile']
  }

});


projetSchema.virtual('statut').get(async function() {
  const now = new Date();
  if (this.sprints.length === 0) {
    return this.date_fin < now ? 'En retard' :
           this.date_debut > now ? 'À faire' :
           'En cours';
  }
  const sprints = await Sprint.find({ _id: { $in: this.sprints } }).exec();
  const allSprintsTermines = await Promise.all(sprints.map(async (sprint) => {
    const taches = await Tache.find({ sprint: sprint._id }).exec();
    return taches.every((tache) => tache.terminer);
    
  }));
  

  if (allSprintsTermines.every((isTerminated) => isTerminated)) {
    return 'Terminé';
  } else {
    return this.date_fin < now ? 'En retard' :
           this.date_debut > now ? 'À faire' :
           'En cours';      
  }
});
const Projet = mongoose.model('Projet', projetSchema);

module.exports = Projet;
