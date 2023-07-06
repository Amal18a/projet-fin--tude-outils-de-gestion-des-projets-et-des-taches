const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Util = require('../models/util');
const Sprint = require('../models/sprint');
const Tache = require('../models/tache');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// nbre de taches par statut d'un membre specifique
router.get('/calculer-taches11/:membreId', async (req, res) => {
    const membreId = req.params.membreId;
  
    try {
      const taches = await Tache.find({ membre: membreId });
      const totalTaches = taches.length;
  
      const tachesAFaire = taches.filter(tache => tache.statut === 'À faire');
      const tachesEnCours = taches.filter(tache => tache.statut === 'En cours');
      const tachesTermines = taches.filter(tache => tache.statut === 'Terminé');
      const tachesEnRetard = taches.filter(tache => tache.statut === 'En retard');
  
      res.json({
        totalTaches,
        tachesAFaire: tachesAFaire.length,
        tachesEnCours: tachesEnCours.length,
        tachesTermines: tachesTermines.length,
        tachesEnRetard: tachesEnRetard.length
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors du calcul des tâches' });
    }
  });

// nbre projet d'un membre specifique
  router.get('/nombre-projets/:membreId', async (req, res) => {
    const membreId = req.params.membreId;
  
    try {
      const count = await Projet.countDocuments({ membres: membreId });
      res.json({ nombreProjets: count });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors du calcul du nombre de projets' });
    }
  });

// taches par mois d'un membre specifique
  router.get('/taches-par-mois/:membreId', async (req, res) => {
    const membreId = req.params.membreId;
  
    try {
      const pipeline = [
        {
          $match: {
            membre: mongoose.Types.ObjectId(membreId)
          }
        },
        {
          $group: {
            _id: { $month: "$date_fin" },
            count: { $sum: 1 }
          }
        }
      ];
  
      const result = await Tache.aggregate(pipeline);
  
      const moisAvecTaches = result.map(entry => {
        const mois = entry._id;
        const count = entry.count;
        return { mois, count };
      });
  
      const moisTous = Array.from({ length: 12 }, (_, index) => ({
        mois: index + 1,
        count: 0
      }));
  
      const tachesParMois = moisTous.concat(moisAvecTaches);
  
      tachesParMois.sort((a, b) => a.mois - b.mois);
  
      const tachesParMoisAvecNom = tachesParMois.map(entry => ({
        mois: getNomMois(entry.mois),
        count: entry.count
      }));
  
      res.json(tachesParMoisAvecNom);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tâches par mois pour le membre spécifié.' });
    }
  });
  
  
  // Fonction utilitaire pour obtenir le nom du mois en fonction du numéro de mois
  function getNomMois(numeroMois) {
  const nomsMois = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre"
  ];

return nomsMois[numeroMois - 1];
}
// nbre total de taches d'un membre
router.get('/nombre-taches/:membreId', async (req, res) => {
  try {
    const membreId = req.params.membreId;

    const nombreTaches = await Tache.countDocuments({ membre: membreId });

    res.json({ nombreTaches });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du calcul du nombre de tâches' });
  }
});





module.exports = router;