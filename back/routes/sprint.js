const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Sprint = require('../models/sprint');
const Tache = require('../models/tache');

// Route pour ajouter un sprint à un projet
router.post('/add/:id', async (req, res) => {
  try {
    const projetId = req.params.id;
    const projet = await Projet.findById(projetId);

    if (!projet) {
      return res.status(404).json({ message: 'Projet introuvable' });
    }

    const sprint = new Sprint({
      nom: req.body.nom,
      description: req.body.description,
      date_debut: req.body.date_debut,
      date_fin: req.body.date_fin,
      priorite: req.body.priorite,
      projet: projetId
    });

    if (sprint.date_debut < projet.date_debut || sprint.date_fin > projet.date_fin) {
      return res.status(400).json({ message: 'Les dates du sprint doivent être comprises dans les dates du projet' });
    }

    const savedSprint = await sprint.save();
    projet.sprints.push(savedSprint);
    await projet.save();

    res.status(201).json(savedSprint);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
});
  
  // Modifier un sprint
  router.put('/sprints/:id', async (req, res) => {
    const { nom, description, date_debut, date_fin, priorite, projet } = req.body;
    try {
      const sprint = await Sprint.findByIdAndUpdate(
        req.params.id,
        { nom, description, date_debut, date_fin, priorite },
        { new: true }
      );
      if (!sprint) {
        return res.status(404).send({ error: 'Sprint non trouvé' });
      }
      // Mettre à jour le projet correspondant
      const projet = await Projet.findById(sprint.projet);
      if (!projet) {
        return res.status(404).send({ error: 'Projet non trouvé' });
      }
      projet.sprints = projet.sprints.map(sprint => {
        if (sprint._id === req.params.id) {
          return {
            _id: sprint._id,
            nom,
            description,
            date_debut,
            date_fin,
            priorite,
          };
        }
        return sprint;
      });
      await projet.save();
      res.send(sprint);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });
  
  // Supprimer un sprint

router.delete('/sprints/:id', async (req, res) => {
    try {
      const sprint = await Sprint.findById(req.params.id);
      if (!sprint) {
        return res.status(404).send();
      }

      await Tache.deleteMany({ sprint: sprint });
      // Supprimer le sprint de son projet
      const projet = await Projet.findByIdAndUpdate(sprint.projet, {
        $pull: { sprints: sprint._id }
      });
      await sprint.remove();
      res.send(sprint);
    } catch (e) {
      res.status(500).send();
    }
  });
 
   //afficher tous les sprints d'un projet
   router.get('/sprints/:id', async (req, res) => {
    try {
      const projetId = req.params.id;
      const sprints = await Sprint.find({ projet: projetId }).populate('projet', 'nom').populate('taches');
      const sprintsAvecStatut = await Promise.all(sprints.map(async sprint => {
        const statut = await sprint.statut;
        return {
          ...sprint.toJSON(),
          statut: statut.toString() // Convertir le statut en chaîne de caractères
        };
      }));
      res.status(200).json(sprintsAvecStatut);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });
  

module.exports = router;
