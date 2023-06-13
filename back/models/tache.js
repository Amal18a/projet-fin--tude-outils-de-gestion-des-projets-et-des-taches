const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const util = require('./util');
const Sprint = require('./sprint');
const projet = require('./projet');
// Importer le modèle d'utilisateur depuis un fichier séparé

const tacheSchema = new mongoose.Schema({
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
 
  membre: {
    type: Schema.Types.ObjectId,
    ref: 'util',
    required: true
  },
  sprint: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sprint'
  },
  terminer:{
    type:Boolean,
    default:false
  },


});

tacheSchema.virtual('statut').get(function() {
  const now = new Date();
  if (this.terminer) {
    return 'Terminé';
  } else if (this.date_fin < now ) {
    return 'En retard';
  } else if (this.date_debut > now) {
    return 'À faire';
  } else {
    return 'En cours';
  }
});


  const Tache = mongoose.model('Tache', tacheSchema);
// export de model
module.exports= Tache;








