const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Sprint = require('../models/sprint');
const Tache = require('../models/tache');
const Util = require('../models/util');
const mongoose = require('mongoose');

// Route pour ajouter une tâche à un sprint
router.post('/add/:id', async (req, res) => {
  try {
    const sprintId = req.params.id;
    const sprint = await Sprint.findById(sprintId);

    if (!sprint) {
      return res.status(404).json({ message: 'Sprint introuvable' });
    }

    const tache = new Tache({
      nom: req.body.nom,
      description: req.body.description,
      date_debut: req.body.date_debut,
      date_fin: req.body.date_fin,
      membre: req.body.membre,
      sprint: sprintId
    });

    if (tache.date_debut < sprint.date_debut || tache.date_fin > sprint.date_fin) {
      return res.status(400).json({ message: 'Les dates de la tâche doivent être comprises dans les dates du sprint' });
    }

    const savedTache = await tache.save();
    sprint.taches.push(savedTache);
    await sprint.save();

    res.status(201).json(savedTache);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
});

   
  // Modifier une tache
  router.put('/tache/:id', async (req, res) => {
    const { nom, description, date_debut, date_fin, membre, sprint , terminer} = req.body;
    try {
      const tache = await Tache.findByIdAndUpdate(
        req.params.id,
        { nom, description, date_debut, date_fin, membre,terminer },
        { new: true }
      );
      if (!tache) {
        return res.status(404).send({ error: 'Tache non trouvée' });
      }
      // Mettre à jour le sprint correspondant
      const sprint = await Sprint.findById(tache.sprint);
      if (!sprint) {
        return res.status(404).send({ error: 'Sprint non trouvé' });
      }
      sprint.taches = sprint.taches.map(sprint => {
        if (tache._id === req.params.id) {
          return {
            _id: tache._id,
            nom,
            description,
            date_debut,
            date_fin,
            membre,
            terminer
          };
        }
        return tache;
      });
      await sprint.save();
      res.send(tache);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Supprimer une tache
  router.delete('/tache/:id', async (req, res) => {
    try {
      const tache = await Tache.findById(req.params.id);
      if (!tache) {
        return res.status(404).send();
      }
      // Supprimer la tache de son sprint
      const sprint = await Sprint.findByIdAndUpdate(tache.sprint, {
        $pull: { taches: tache._id }
      });
      await tache.remove();
      res.send(tache);
    } catch (e) {
      res.status(500).send();
    }
  });

  
     //afficher tous les taches d'un sprint
     router.get('/taches/:id', async (req, res) => {
      try {
        const sprintId = req.params.id;
        const taches = await Tache.find({ sprint: sprintId }).populate('sprint', 'nom').populate('membre','nom prenom');
    
        const now = new Date();
    
        const tachesWithStatus = taches.map(tache => {
          if (tache.terminer) {
            return { ...tache.toObject(), statut: 'Terminé' };
          } else if (tache.date_fin < now) {
            return { ...tache.toObject(), statut: 'En retard' };
          } else if (tache.date_debut > now) {
            return { ...tache.toObject(), statut: 'À faire' };
          } else {
            return { ...tache.toObject(), statut: 'En cours' };
          }
        });
    
        res.status(200).json(tachesWithStatus);
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Une erreur est survenue' });
      }
    });
    
// tous les taches d'un membre
    router.get('/alll1/:id', (req, res) => {
      const membreId = req.params.id; // Récupérer l'ID du membre spécifique depuis l'URL
    
      Tache.find({ membre: membreId }) // Filtrer les tâches en fonction de l'ID du membre
      .populate({
        path: 'sprint',
        select: 'nom',
        populate: {
          path: 'projet',
          select: 'nom'
        }
      })
        
        .exec((err, taches) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            res.status(200).send(taches);
          }
        });
    });

    // tache terminer d'un membres spécifique dans un projet spécifique
    router.get('/terminer/:memberId/:projectId', async (req, res) => {
      try {
        const memberId = req.params.memberId;
        const projectId = req.params.projectId;
    
        // Recherche des tâches terminées pour un membre spécifique et un projet spécifique
        const taches = await Tache.find({ membre: memberId, terminer: true })
          .populate({
            path: 'sprint',
            populate: {
              path: 'projet',
              match: { _id: projectId } // Filtre sur le projet spécifique
            }
          })
          .exec();
    
        // Filtrer les tâches ayant une correspondance valide dans la jointure
        const tachesFiltrees = taches.filter((tache) => tache.sprint && tache.sprint.projet);
    
        // Envoi des tâches terminées en réponse
        res.status(200).send(tachesFiltrees);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    });
    
     // tache en cours d'un membres spécifique dans un projet spécifique
    router.get('/enCours/:memberId/:projectId', async (req, res) => {
      try {
        const memberId = req.params.memberId;
        const projectId = req.params.projectId;
        const now = new Date();
    
        const taches = await Tache.find({ membre: memberId })
          .populate({
            path: 'sprint',
            select: 'nom',
            populate: {
              path: 'projet',
              select: 'nom',
              match: { _id: projectId } // Filtre sur le projet spécifique
            }
          })
          .exec();
    
        // Filtrer les tâches par statut (À faire, En cours, En retard) et projet spécifique
        const tachesEnCours = taches.filter(tache => !tache.terminer && tache.date_debut <= now && tache.date_fin >= now && tache.sprint.projet && tache.sprint.projet._id.toString() === projectId);
    
        res.status(200).json(tachesEnCours);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
    });
    
    
    
  
 // tache à faire d'un membres spécifique dans un projet spécifique
    router.get('/aFaire/:memberId/:projectId', (req, res) => {
      const memberId = req.params.memberId;
      const projectId = req.params.projectId;
      const now = new Date();
    
      Tache.find({ membre: memberId })
        .populate({
          path: 'sprint',
          select: 'nom',
          populate: {
            path: 'projet',
            select: 'nom',
            match: { _id: projectId } // Filtre sur le projet spécifique
          }
        })
        .exec((err, taches) => {
          if (err) {
            console.error(err);
            res.status(500).send(err);
          } else {
            // Filtrer les tâches par statut (À faire, En cours, En retard) et projet spécifique
            const tachesAFaire = taches.filter(tache => !tache.terminer && tache.sprint && tache.sprint.projet && tache.sprint.projet._id.toString() === projectId && tache.date_debut > now);
    
            res.status(200).json(tachesAFaire);
          }
        });
    });
    


    
 // tache retard d'un membres spécifique dans un projet spécifique
    router.get('/retard1/:memberId/:projectId', (req, res) => {
      const memberId = req.params.memberId;
      const projectId = req.params.projectId;
      const now = new Date();
    
      Tache.find({ membre: memberId })
        .populate({
          path: 'sprint',
          select: 'nom',
          populate: {
            path: 'projet',
            select: 'nom',
            match: { _id: projectId } // Filtre sur le projet spécifique
          }
        })
        .exec((err, taches) => {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
    
          // Filtrer les tâches par statut (À faire, En cours, En retard) et sprint actif
          const tachesEnRetard = taches.filter(tache => !tache.terminer && tache.date_fin < now && tache.sprint && tache.sprint.projet);
    
          res.status(200).json(tachesEnRetard);
        });
    });

  // tache d'un membre specifique
    router.get('/membrespartaches/:id', async (req, res) => {
      const { id } = req.params;
    
      try {
        // Rechercher les tâches du membre dans la base de données
        const taches = await Tache.find({ membre: id });
    
        res.json(taches);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Une erreur est survenue lors de la récupération des tâches.' });
      }
    });

    module.exports = router;
    






