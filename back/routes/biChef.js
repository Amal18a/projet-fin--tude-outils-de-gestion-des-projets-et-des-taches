const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Util = require('../models/util');
const Sprint = require('../models/sprint');
const Tache = require('../models/tache');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');



  // projet d'un chef spécifique par statut
  router.get('/nombre/:chefId', async (req, res) => {
    try {
      const { chefId } = req.params;
      
      const projets = await Projet.find({ chef: chefId })
        .populate('chef', 'nom prenom')
        .exec();
  
      const stats = {
        EnRetard: 0,
        EnCours: 0,
        Afaire: 0,
        Termine: 0
      };
  
      for (const projet of projets) {
        const statut = await projet.statut;
        if (statut === 'En retard') {
          stats.EnRetard++;
        } else if (statut === 'En cours') {
          stats.EnCours++;
        } else if (statut === 'À faire') {
          stats.Afaire++;
        } else if (statut === 'Terminé') {
          stats.Termine++;
        }
      }
  
      res.status(200).json(stats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul des statistiques des projets.' });
    }
  });
  
  // projet total d'un chef
  router.get('/nombre-total/:chefId', async (req, res) => {
    try {
      const { chefId } = req.params;
  
      const count = await Projet.countDocuments({ chef: chefId });
  
      res.status(200).json({ count });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul du nombre total de projets.' });
    }
  });

  // projet par mois d'un chef spécifique
  router.get('/projets-nombre-par-mois/:chefId', async (req, res) => {
    try {
      const { chefId } = req.params;
  
      const projetsParMois = await Projet.aggregate([
        {
          $match: {
            chef: mongoose.Types.ObjectId(chefId)
          }
        },
        {
          $group: {
            _id: { $month: '$date_debut' },
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            mois: '$_id',
            count: 1,
            _id: 0
          }
        }
      ]);
  
      const moisTous = Array.from({ length: 12 }, (_, index) => ({
        mois: index + 1,
        count: 0
      }));
  
      const projetsParMoisComplet = moisTous.map((mois) => {
        const projetMois = projetsParMois.find((projet) => projet.mois === mois.mois);
        return projetMois || mois;
      });
  
      res.status(200).json({ projetsParMois: projetsParMoisComplet });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Une erreur s\'est produite lors du calcul du nombre de projets par mois.' });
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
  

module.exports = router;