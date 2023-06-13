const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const userStory = require('../models/userStory');


//AJOUTER
router.post('/add/:projetId', async (req, res) => {
    try {
      const projetId = req.params.projetId;
      const projet = await Projet.findById(projetId);
  
      if (!projet) {
        return res.status(404).json({ message: 'Projet introuvable' });
      }
  
      const { id, user_story, estimation, priorite } = req.body;
      if (!id || !user_story || !estimation || !priorite) {
        return res.status(400).json({ message: 'Tous les champs sont requis' });
      }
  
      const newuserStory = new userStory({
        id,
        user_story,
        estimation,
        priorite,
        projet
      });
  
      const saveduserStory = await newuserStory.save();
      projet.backlog.push(saveduserStory._id);
      await projet.save();
  
      res.status(201).json(saveduserStory);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });
  


//   MODIFIER
router.put('/userstory/:id', async (req, res) => {
    const { id, user_story, estimation, priorite } = req.body;
    try {
      const userstory = await userStory.findByIdAndUpdate(req.params.id, {
        id,
        user_story,
        estimation,
        priorite
      }, { new: true });
  
      const projectId = userstory.projet;
      const project = await Projet.findById(projectId);
  
      if (!project) {
        return res.status(404).send({ message: 'Projet introuvable' });
      }
  
      const updatedBacklog = project.backlog.map((userstoryId) => {
        if (userstoryId.toString() === userstory._id.toString()) {
          return userstory._id;
        }
        return userstoryId;
      });
  
      project.backlog = updatedBacklog;
      await project.save();
  
      res.status(200).send(userstory);
    } catch (error) {
      res.status(400).send(error);
    }
  });
  

  
// //SUPPRIMER
router.delete('/delete/:id', async function(req, res) {
    let id = req.params.id;

    try {
        const userstory = await userStory.findById(id);
        if (!userstory) {
            return res.status(404).send({ message: 'User story introuvable' });
        }

        const projectId = userstory.projet;
        const project = await Projet.findById(projectId);

        if (!project) {
            return res.status(404).send({ message: 'Projet introuvable' });
        }

        if (!project.backlog) {
            project.backlog = [];
        } else {
            project.backlog = project.backlog.filter(backlogId => backlogId.toString() !== id.toString());
        }

        await userstory.remove();
        await project.save();

        res.status(200).send({ message: 'User story supprimée avec succès' });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Une erreur est survenue' });
    }
});



  //afficher tous les backlog d'un projet
router.get('/userstories/:id', async (req, res) => {
    try {
      const projectId = req.params.id;
      const userStories = await userStory.find({ projet: projectId }).populate('projet', 'nom');
      res.status(200).json(userStories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });
  
module.exports = router;