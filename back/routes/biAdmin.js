const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Util = require('../models/util');
const Sprint = require('../models/sprint');
const Tache = require('../models/tache');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');


// api pour calculer le nbre d'utilisateurs par role
router.get('/calculer-utilisateurs', async (req, res) => {
    try {
      const utilisateurs = await Util.find();
      const totalUtilisateurs = utilisateurs.length;
  
      const utilisateursMembre = utilisateurs.filter(utilisateur => utilisateur.role === 'membre');
      const utilisateursChef = utilisateurs.filter(utilisateur => utilisateur.role === 'chef');
      const utilisateursAdmin = utilisateurs.filter(utilisateur => utilisateur.role === 'admin');
  
      res.json({
        totalUtilisateurs,
        utilisateursMembre: utilisateursMembre.length,
        utilisateursChef: utilisateursChef.length,
        utilisateursAdmin: utilisateursAdmin.length
      });
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors du calcul des utilisateurs' });
    }
  });

// api pour calculer le nbre de projet par complexité
router.get('/nombre-projets-par-complexite', async (req, res) => {
  try {
    const projets = await Projet.find();
    const complexites = projets.map(projet => projet.complexite);

    // Créer un objet pour stocker le nombre de projets par complexité
    const nombreProjetsParComplexite = {};

    // Parcourir chaque complexité
    for (const complexite of complexites) {
      if (nombreProjetsParComplexite[complexite]) {
        // Si la complexité existe déjà dans l'objet, incrémenter le compteur
        nombreProjetsParComplexite[complexite]++;
      } else {
        // Sinon, initialiser le compteur à 1
        nombreProjetsParComplexite[complexite] = 1;
      }
    }
    res.json(nombreProjetsParComplexite);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du calcul du nombre de projets par complexité' });
  }
});


  // api pour calculer le nbre total de projets
  router.get('/projetsnb', async (req, res) => {
    try {
         // Compter le nombre total de documents dans la collection Projet
      const count = await Projet.countDocuments();
      res.json({ nombreProjets: count });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors du calcul du nombre de projets' });
    }
  });

// api pour calculer le nbre total d'utilisateurs
  router.get('/utilsnb', async (req, res) => {
    try {
      const count = await Util.countDocuments();
      res.json({ nombreUtils: count });
    } catch (error) {
      res.status(500).json({ message: 'Une erreur s\'est produite lors du calcul du nombre des utilisateurs' });
    }
  });

//   api pour calculer le nbre de projet creer dans les 30 j derniere
router.get('/projets-derniers-30-jours', async (req, res) => {
    try {
      const dateLimite = new Date();
      dateLimite.setDate(dateLimite.getDate() - 30);
  
      const projets = await Projet.find({ date_fin: { $gte: dateLimite } }).exec();
      const nombreProjets1 = projets.length;
  
      res.json({ nombreProjets1 });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Une erreur est survenue lors du calcul du nombre de projets dans les 30 derniers jours.' });
    }
  });

// nbre de projet total par chef
  router.get('/nombre-projets-par-chef', async (req, res) => {
    try {
      const projets = await Projet.find().populate('chef', 'nom prenom'); // Ajout de populate pour récupérer les détails du chef
  
      const chefs = projets.map(projet => projet.chef._id.toString()); // Utilisation de l'ID du chef
  
      const chefsUniques = [...new Set(chefs)];
  
      const nombreProjetsParChef = chefsUniques.map(chef => {
        const projetsDuChef = projets.filter(projet => projet.chef._id.toString() === chef);
        return {
          chef: projetsDuChef[0].chef.nom + ' ' + projetsDuChef[0].chef.prenom, // Utilisation du nom et du prénom du chef
          nombreProjets: projetsDuChef.length
        };
      });
  
      res.json(nombreProjetsParChef);
    } catch (error) {
      res.status(500).json({ message: 'Erreur lors du calcul du nombre de projets par chef' });
    }
  });


  

// projet par mois
router.get('/nombre-par-mois', async (req, res) => {
  try {
    const projetsParMois = await Projet.aggregate([
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


    // tache par statut
    router.get('/calculer-taches', async (req, res) => {
      try {
        const taches = await Tache.find();
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


    // meilleur membre
router.get('/nombre-max-taches-par-membre', async (req, res) => {
  try {
    const membres = await Util.find();
    const taches = await Tache.find();

    let maxTaches = 0;
    let membreMaxTaches = null;
    let imageMembreMaxTaches = null; // Ajout de la variable pour stocker l'image du membre

    membres.forEach(membre => {
      const tachesDuMembre = taches.filter(tache => tache.membre.toString() === membre._id.toString());
      if (tachesDuMembre.length > maxTaches) {
        maxTaches = tachesDuMembre.length;
        membreMaxTaches = membre.nom +' '+ membre.prenom;
        imageMembreMaxTaches = membre.image; // Récupération de l'image du membre
      }
    });

    res.json({
      membre: membreMaxTaches,
      image: imageMembreMaxTaches, // Ajout de l'image dans la réponse
      nombreMaxTaches: maxTaches
    });
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors du calcul du nombre maximum de tâches par membre' });
  }
});








module.exports = router;