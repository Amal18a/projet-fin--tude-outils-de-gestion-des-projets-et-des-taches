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
            _id: { $month: '$date_debut' }, // Groupe les projets par mois
            count: { $sum: 1 } 
          }
        },
        {
          $project: {
            mois: '$_id', // Renomme la propriété '_id' en 'mois'
            count: 1,
            _id: 0 // Exclut la propriété '_id' du résultat final
          }
        }
      ]);
  
      const moisTous = Array.from({ length: 12 }, (_, index) => ({
        mois: index + 1, // Crée un tableau représentant les douze mois de l'année
        count: 0 // Initialise le compteur de projets à zéro pour chaque mois
      }));
  
      const projetsParMoisComplet = moisTous.map((mois) => {
        const projetMois = projetsParMois.find((projet) => projet.mois === mois.mois); // Recherche le document correspondant au mois dans le tableau des projets par mois
        return projetMois || mois; // Renvoie le document correspondant ou le mois avec un compteur à zéro si aucun document n'a été trouvé
      });
  
      res.status(200).json({ projetsParMois: projetsParMoisComplet }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Une erreur s'est produite lors du calcul du nombre de projets par mois." }); // En cas d'erreur, renvoie une réponse avec un code d'état 500 et un message d'erreur en format JSON
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
  



  router.get('/pourcentage-termine/:chefId', async (req, res) => {
    try {
      const { chefId } = req.params;
      // Récupérer tous les projets de la base de données
      const projets = await Projet.find({ chef: chefId }).exec();
  
      // Tableau pour stocker les résultats
      const resultats = [];
  
      // Parcourir tous les projets
      for (const projet of projets) {
        // Récupérer tous les sprints associés au projet
        const sprints = await Sprint.find({ projet: projet._id }).exec();
  
        let totalTaches = 0;
        let tachesTerminées = 0;
  
        // Parcourir tous les sprints et leurs tâches
        for (const sprint of sprints) {
          const taches = await Tache.find({ sprint: sprint._id }).exec();
          totalTaches += taches.length;
  
          for (const tache of taches) {
            if (tache.terminer) {
              tachesTerminées++;
            }
          }
        }
  
        // Calculer le pourcentage de tâches terminées pour le projet
        const pourcentageTermine = totalTaches > 0 ? (tachesTerminées / totalTaches) * 100 : 0;
  
        // Ajouter les résultats au tableau
        resultats.push({ projet: projet.nom, pourcentageTermine });
      }
  
      res.json(resultats);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

module.exports = router;