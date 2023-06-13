const mongoose = require('mongoose');
const Projet = require('./projet');

// Importer le modèle d'utilisateur depuis un fichier séparé

const userStory=mongoose.model('userStory',{
  id: {
    type: String,
    required: true,
    trim: true
  },

  user_story: {
    type: String,
    required: true,
    trim: true
  },

  estimation: {
    type: Number,
    required: true
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
 
 
});


// export de model
module.exports=userStory;