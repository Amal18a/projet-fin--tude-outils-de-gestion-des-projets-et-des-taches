 const mongoose = require('mongoose');
const Projet = require('./projet');
const Tache = require('./tache');
// Importer le modèle d'utilisateur depuis un fichier séparé

const sprintSchema = new mongoose.Schema({
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
  date_debut:{
    type:Date,
    required:true
  },
  date_fin:{
    type:Date,
    required:true
  },
  priorite: {
    type: Number,
    default: 1,
    required: true
  },

  projet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Projet'
  },
 taches: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tache'
  }]
});

sprintSchema.virtual('statut').get(async function() {
  const now = new Date();

  if (this.taches.length === 0) {
    return this.date_fin < now ? 'En retard' :
           this.date_debut > now ? 'À faire' :
           'En cours';
  }

  const taches = await Tache.find({ sprint: this._id }).exec();
  const anyTacheNonTerminee = taches.some(tache => !tache.terminer);

  if (anyTacheNonTerminee) {
    return this.date_fin < now ? 'En retard' :
           this.date_debut > now ? 'À faire' :
           'En cours';
  } else {
    return 'Terminé';
  }
});

  

  const Sprint = mongoose.model('Sprint', sprintSchema);
// export de model
module.exports= Sprint;


