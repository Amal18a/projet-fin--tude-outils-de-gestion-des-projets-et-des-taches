const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Util = require('../models/util');
const Sprint = require('../models/sprint');
const Tache = require('../models/tache');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// api pour calculer le nombre de sprints dans un projet spécifique
router.get('/nbsprints/:id', async (req, res) => {
    const projetId = req.params.id;
  
    try {
      const projet = await Projet.findById(projetId).populate('sprints');
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      const nbreSprints = projet.sprints.length;
      res.json({ nbreSprints });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des sprints' });
    }
  });


// api pour calculer le nombre de membres dans un projet spécifique
  router.get('/nbmembres/:id', async (req, res) => {
    const projetId = req.params.id;
  
    try {
      const projet = await Projet.findById(projetId).populate('membres');
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      const nbreMembres = projet.membres.length;
      res.json({ nbreMembres });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des membres' });
    }
  });


  // api pour calculer le nombre de taches dans un projet spécifique
  router.get('/nombretaches/:id', async (req, res) => {
    const projetId = req.params.id;
  
    try {
      // Trouver le projet par son ID
      const projet = await Projet.findById(projetId).exec();
  
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Récupérer toutes les tâches liées aux sprints du projet
      const sprints = await Sprint.find({ projet: projet._id }).exec();
      const taches = await Tache.find({ sprint: { $in: sprints.map(sprint => sprint._id) } }).exec();
  
      const nombreTaches = taches.length;
  
      res.json({ nombreTaches });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur du serveur' });
    }
  });

//   nombre de sprints par statut dans un projet spécifique
router.get('/nombre-sprints/:projetId', async (req, res) => {
    try {
      const projetId = req.params.projetId;
  
      // Vérifier si le projet existe
      const projet = await Projet.findById(projetId);
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Obtenir les sprints du projet
      const sprints = await Sprint.find({ projet: projetId });
  
      // Compter le nombre de sprints selon leur statut
      let termines = 0;
      let aFaire = 0;
      let enCours = 0;
      let enRetard = 0;
  
      for (const sprint of sprints) {
        const sprintWithTaches = await Sprint.findById(sprint._id).populate('taches');
        const statut = await sprintWithTaches.statut;
  
        switch (statut) {
          case 'Terminé':
            termines++;
            break;
          case 'À faire':
            aFaire++;
            break;
          case 'En cours':
            enCours++;
            break;
          case 'En retard':
            enRetard++;
            break;
        }
      }
  
      const resultat = {
        termines,
        aFaire,
        enCours,
        enRetard
      };
  
      res.json(resultat);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de sprints', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });

//   nombre de taches par statut dans un projet spécifique
  router.get('/nombre-taches/:projetId', async (req, res) => {
    try {
      const projetId = req.params.projetId;
  
      // Vérifier si le projet existe
      const projet = await Projet.findById(projetId);
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Obtenir les sprints du projet spécifique
      const sprints = await Sprint.find({ projet: projetId });
  
      // Compter le nombre de tâches selon leur statut dans tous les sprints du projet
      let termines = 0;
      let aFaire = 0;
      let enCours = 0;
      let enRetard = 0;
  
      for (const sprint of sprints) {
        const taches = await Tache.find({ sprint: sprint._id });
  
        for (const tache of taches) {
          const statut = tache.statut;
  
          switch (statut) {
            case 'Terminé':
              termines++;
              break;
            case 'À faire':
              aFaire++;
              break;
            case 'En cours':
              enCours++;
              break;
            case 'En retard':
              enRetard++;
              break;
          }
        }
      }
  
      const resultat = {
        termines,
        aFaire,
        enCours,
        enRetard
      };
  
      res.json(resultat);
    } catch (error) {
      console.error('Erreur lors de la récupération du nombre de tâches', error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });


  // api pour afficher le nombre de tâches effectuées par chaque membre dans un projet spécifique
router.get('/membres/:projectId', async (req, res) => {
    try {
      const projectId = req.params.projectId;
  
      // Récupérer le projet correspondant à l'ID fourni
      const projet = await Projet.findById(projectId).exec();
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Récupérer tous les sprints associés au projet
      const sprints = await Sprint.find({ projet: projectId }).exec();
  
      // Récupérer toutes les tâches des sprints du projet
      const taches = await Tache.find({ sprint: { $in: sprints.map(sprint => sprint._id) } }).exec();
  
      // Agréger les tâches par membre
      const membresTaches = await aggregateTachesByMembre(taches);
  
      res.json(membresTaches);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  
  // Fonction pour agréger les tâches par membre
  async function aggregateTachesByMembre(taches) {
    const membresTaches = {};
  
    // Parcourir toutes les tâches
    for (const tache of taches) {
      const membreId = tache.membre.toString();
  
      // Vérifier si le membre existe dans l'objet membresTaches
      if (membreId in membresTaches) {
        membresTaches[membreId].count++;
      } else {
        // Récupérer les détails du membre
        const membre = await Util.findById(membreId).exec();
  
        membresTaches[membreId] = {
          // membreId,
          nom: membre.nom,
          prenom: membre.prenom,
          count: 1
        };
      }
    }
  
    return Object.values(membresTaches);
  }


  // api pour obtenir le pourcentage de tâches terminées dans un projet
router.get('/pourcentage-termine/:projectId', async (req, res) => {
    try {
      const projectId = req.params.projectId;
  
      // Récupérer le projet correspondant à l'ID fourni
      const projet = await Projet.findById(projectId).exec();
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Récupérer tous les sprints associés au projet
      const sprints = await Sprint.find({ projet: projectId }).exec();
  
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
      // Calculer le pourcentage de tâches terminées
      const pourcentageTerminé = totalTaches > 0 ? (tachesTerminées / totalTaches) * 100 : 0;
  
      res.json({ pourcentageTerminé });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });


    // api pour obtenir le pourcentage de sprints terminées dans un projet
  router.get('/pourcentageTermin/:projectId', async (req, res) => {
    try {
      const projectId = req.params.projectId;
  
      // Récupérer le projet correspondant à l'ID fourni
      const projet = await Projet.findById(projectId).exec();
      if (!projet) {
        return res.status(404).json({ message: 'Projet non trouvé' });
      }
  
      // Récupérer tous les sprints associés au projet
      const sprints = await Sprint.find({ projet: projectId }).exec();
  
      let totalSprints = sprints.length;
      let sprintsTerminés = 0;
  
      // Parcourir tous les sprints et compter les sprints terminés
      for (const sprint of sprints) {
        const statut = await sprint.statut;
        if (statut === 'Terminé') {
          sprintsTerminés++;
        }
      }
  
      // Calculer le pourcentage de sprints terminés
      const pourcentageTerminés = (sprintsTerminés / totalSprints) * 100;
  
      res.json({ pourcentageTerminés });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erreur serveur' });
    }
  });
  module.exports = router;