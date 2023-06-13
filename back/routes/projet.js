const express = require('express');
const router = express.Router();
const Projet = require('../models/projet');
const Util = require('../models/util');
const Sprint = require('../models/sprint');
const userStory = require('../models/userStory');

const Tache = require('../models/tache');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// api pour ajouter un projet
router.post('/teams', async (req, res) => {
  try {
    const { nom, description, membres , date_debut , date_fin,complexite} = req.body;

    // Récupérer l'ID de l'utilisateur à partir du token JWT
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, '123456789');
    const chefId = decodedToken.utilid;

    // Créer la nouvelle équipe avec le chef d'équipe
    const projet = await Projet.create({ nom, description,date_debut, date_fin, complexite ,chef: chefId });

    // Ajouter les membres de l'équipe
    for (const membre of membres) {
      const util = await Util.findOne({ _id: membre });
      if (!util || util.role !== "membre") {
        return res.status(400).send(`Could not find user with name ${membre} or user is not a membre`);
      }
      projet.membres.push(util);
    }

    // Enregistrer de projet dans la base de données
    await projet.save();

    res.status(201).json(projet);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal server error');
  }
});



// api pour mettre à jour un projet  à la fois les informations générales du projet et les membres associés
router.put('/projet/:id', async (req, res) => {
    const { nom, description, date_debut, date_fin, membres ,complexite } = req.body;
    try {
      // Vérifier que les membres sont valides et les récupérer depuis la base de données
      const membresUtil = [];
      for (const membre of membres) {
        const util = await Util.findOne({ nom: membre });
        if (!util || util.role !== "membre") {
          return res.status(400).send(`Could not find user with name ${membre} or user is not a membre`);
        }
        membresUtil.push(util);
      }
      
      // Mettre à jour le projet avec les nouvelles informations et membres
      const projet = await Projet.findByIdAndUpdate(req.params.id, {
        nom,
        description,
        date_debut,
        date_fin,
        membres: membresUtil,
        complexite
      }, { new: true });
      
      res.status(200).send(projet);
    } catch (error) {
      res.status(400).send(error);
    }
  });

// api pour mettre à jour l'apercu d'un projet
  router.put('/projet1/:id', async (req, res) => {
    const { nom, description, date_debut, date_fin, complexite } = req.body;
    try {
      const projet = await Projet.findByIdAndUpdate(req.params.id, {
        nom,
        description,
        date_debut,
        date_fin,
        complexite
      }, { new: true });

      res.status(200).send(projet);
    } catch (error) {
      res.status(400).send(error);
    }
});


// api pour supprimer un projet
router.delete('/delete/:id', async function(req, res) {
  const projetId = req.params.id;

  try {
    // Supprimer le projet
    const projet = await Projet.findOneAndDelete({ _id: projetId });

    if (!projet) {
      return res.status(404).json({ message: "Le projet n'a pas été trouvé." });
    }

    // Supprimer les sprints associés
    const sprints = await Sprint.find({ projet: projetId });

    for (const sprint of sprints) {
      // Supprimer les tâches associées au sprint
      const taches = await Tache.find({ sprint: sprint._id });
      
      for (const tache of taches) {
        await tache.remove();
      }

      await sprint.remove();
    }

    // Supprimer les user stories associées
    await userStory.deleteMany({ projet: projetId });

    // Répondre avec le projet supprimé
    return res.status(200).json({ projet });
  } catch (err) {
    // Gérer les erreurs
    return res.status(500).json({ error: "Une erreur s'est produite lors de la suppression du projet." });
  }
});



// afficher fiche de projet plus precisément les données de chef et des membres
router.get('/get/:id' , (req, res)=>{
    let id=req.params.id;

    Projet.findOne({_id: id})
    .populate('chef', ' image nom prenom ')
    .populate('membres', 'nom prenom   ')
    
        .then(
            (projet)=>{
                res.status(200).send(projet);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})



// afficher les membres d'un projet specifique
router.get('/gettt/:id', (req, res) => {
  let id = req.params.id;

  Projet.findOne({ _id: id })
    .populate('membres', ' _id nom prenom image ') // spécifiez les champs à inclure
    .then((projet) => {
      // transformez la réponse pour inclure uniquement les données des membres
      const membres = projet.membres.map((membre) => {
        return {
          nom: membre.nom,
          prenom: membre.prenom,
          image: membre.image,
          _id:membre._id
        };
      });

      res.status(200).send(membres);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

  // afficher tous les projets dans la base
router.get('/all', (req, res) => {
  Projet.find()
    .populate('chef', 'nom prenom')
    .exec((err, projets) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(projets);
      }
    });
});


// api pour ajouter un membre à un projet
router.post('/membres/:id', async (req, res) => {
  try {
  const projet = await Projet.findById(req.params.id);
  if (!projet) {
  return res.status(404).json({ message: "Le projet n'existe pas" });
  }// Vérifier si les membres ont été fournis dans le corps de la requête
if (!req.body.membres || !Array.isArray(req.body.membres)) {
  return res.status(400).json({ message: "Liste des membres non fournie dans la requête" });
}
const membres = req.body.membres;

// Ajouter les membres de l'équipe
for (const membre of membres) {
  const util = await Util.findOne({ nom: membre });
  if (!util || util.role !== "membre") {
    return res.status(400).send(`Could not find user with name ${membre} or user is not a membre`);
  }

   // Vérifier si le membre n'est pas déjà présent dans le projet
   if (projet.membres.includes(util._id)) {
    return res.status(400).send(`${membre} est déja un membre dans le projet `);
  }
  projet.membres.push(util);
}

await projet.save();

res.status(200).json({ message: "Membre ajouté au projet avec succès" });
} catch (error) {
  console.error(error);
  res.status(500).json({ message: "Une erreur est survenue lors de l'ajout du membre au projet" });
  }
  });


// api pour supprimer un membre de projet
  router.delete('/membres/:id', async (req, res) => {
    try {
      const projet = await Projet.findById(req.params.id);
      if (!projet) {
        return res.status(404).json({ message: "Le projet n'existe pas" });
      }
  
      const membre = await Util.findById(req.body.id);
      if (!membre) {
        return res.status(404).json({ message: "Le membhgdfb n'existe pas" });
      }
  
      const membreIndex = projet.membres.indexOf(membre._id);
      if (membreIndex === -1) {
        return res.status(400).json({ message: "Le membre n'est pas présent dans le projet" });
      }
  
      projet.membres.splice(membreIndex, 1);
      await projet.save();
  
      res.status(200).json({ message: "Membre supprimé du projet avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Une erreur est survenue lors de la suppression du membre du projet" });
    }
  });


// recupirer les projets d'un membre specifique 
router.get('/all2/:id', (req, res) => {
  const userId = req.params.id; // Récupérer l'ID de l'utilisateur spécifique depuis l'URL

  Projet.find({ membres: userId }) // Filtrer les projets en fonction de l'ID de l'utilisateur
    .populate('chef', 'nom prenom')
    .exec((err, projets) => {
      if (err) {
        console.error(err);
        res.status(500).send(err);
      } else {
        res.status(200).send(projets);
      }
    });
});


// afficher fiche de projet specifique y'a compris son statut
  router.get('/projets/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const projet = await Projet.findById(id)
        .populate('sprints', 'nom description')
        .populate('backlog', 'id user_story')
        .populate('chef', ' image nom prenom ');
        
      if (!projet) {
        return res.status(404).json({ message: 'Projet introuvable' });
      }
      
      const statut = await projet.statut; // Obtenir le statut du projet
      
      const projetAvecStatut = {
        ...projet.toObject(), // Convertir le projet en un objet JavaScript
        statut: statut.toString() // Convertir le statut en une chaîne de caractères
      };
      
      res.status(200).json(projetAvecStatut);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Une erreur est survenue' });
    }
  });






router.get('/all3/:id', async (req, res) => {
  const chefId = req.params.id;

  try {
    const projets = await Projet.find({ chef: chefId })
      .populate('chef', 'nom prenom')
      .exec();

    const projetsAvecStatut = await Promise.all(projets.map(async (projet) => {
      const statut = await projet.statut;
      return { ...projet._doc, statut };
    }));

    res.status(200).json(projetsAvecStatut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des projets.' });
  }
});

// afficher tous les projets avec leurs statut
router.get('/all14', async (req, res) => {
  try {
    const projets = await Projet.find()
      .populate('chef', 'nom prenom')
      .exec();

    const projetsAvecStatut = await Promise.all(projets.map(async (projet) => {
      const statut = await projet.statut;
      return { ...projet._doc, statut };
    }));

    res.status(200).json(projetsAvecStatut);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des projets.' });
  }
});

// tous les projet retard d'un chef
router.get('/projetsretard/:chefId', async (req, res) => {
  try {
    const { chefId } = req.params;
    
    const projets = await Projet.find({ chef: chefId })
      .populate('chef', 'nom prenom')
      .exec();

    const projetsRetard = [];

    for (const projet of projets) {
      const statut = await projet.statut;
      if (statut === 'En retard') {
        projetsRetard.push({ ...projet._doc, statut });
      }
    }

    res.status(200).json(projetsRetard);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des projets en retard.' });
  }
});



// // rechercher un projet par nom
// router.get('/get/:nom' , (req, res)=>{
//   let nom=req.params.nom;

//   Projet.findOne({nom: nom})
//   .populate('chef', ' image nom prenom ')
//   .populate('membres', 'nom prenom   ')
  
//       .then(
//           (projet)=>{
//               res.status(200).send(projet);
//           }
//       )
//       .catch(
//           (err)=>{
//               res.status(400).send(err)
//           }
//       )


// })
  module.exports = router;
  