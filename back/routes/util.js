
 //  route pour user

// importation d'express
const express=require('express');

// creation de router pour user
const router=express.Router();
const crypto = require('crypto');



// importation des models
 const Util =require('../models/util');
 const projet =require('../models/projet');
// permet de traiter les données envoyées dans le corps des requêtes HTTP, telles que les données de formulaire, les données JSON..
 const bodyParser = require('body-parser');
//  importation de multer
const multer=require('multer');

// importation de bcrypt
const bcrypt=require('bcrypt');

// importation de json web token 
const jwt=require('jsonwebtoken');

// importation de nodemailer
const nodemailer = require('nodemailer');

// variable pour enregistrer image
filename = '';

// creation de storage
const mystorage =multer.diskStorage({

    destination: './upload',
    filename :(req ,file , redirect)=>{
        let date= Date.now();
        let fl=date +'.' +file.mimetype.split('/')[1];
        redirect(null , fl);
        filename=fl;
    }
})

const upload =multer({storage:mystorage})

// create a route for adding a new user with an image
router.post('/addd', upload.any('image'), async function(req, res) {
  // Récupérer les données de la requête, y compris le fichier image envoyé
    // recupirer data
    data=req.body;
   
  // Vérifier si l'email existe déjà dans la base de données
  const existingEmail = await Util.findOne({ email: data.email });
  if (existingEmail) {
    return res.status(400).send('L\'adresse e-mail existe déjà');
  }

  // Vérifier si le cin existe déjà dans la base de données
  const existingCin = await Util.findOne({ cin: data.cin });
  if (existingCin) {
    return res.status(400).send('Le cin existe déjà');
  }

  // Créer une instance d'utilisateur avec les données et le chemin du fichier image
   // creation d'instance
   utili =new Util(data);

   utili.image=filename;
   

  // Générer un salt et hasher le mot de passe
  const salt = bcrypt.genSaltSync(10);
  utili.mot_de_passe = bcrypt.hashSync(data.mot_de_passe, salt);

  // Enregistrer l'utilisateur dans la base de données
  try {
    const saved = await utili.save();
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'PROJETGESTION4@gmail.com',
        pass: 'ckfzldjnoalhsago'
      }
    });
    const mailOptions = {
      from: 'PROJETGESTION4@gmail.com', // Remplacez par votre adresse e-mail
      to: saved.email,
      subject: 'Nouveau compte utilisateur créé',
      text: `Votre compte utilisateur a été créé avec succès. Voici vos informations d'identification:\nAdresse e-mail: ${saved.email}\nMot de passe: ${data.mot_de_passe}`
    };
    const info = await transporter.sendMail(mailOptions);
    console.log(`E-mail sent to ${saved.email}: ${info.response}`);
    res.status(200).send(saved);
  } catch (err) {
    console.error(err);
    res.status(400).send(err);
  }
});



// api pour la cnx
  router.post('/connexion', (req, res) => {
    const data = req.body;
  
    // Check if any field is empty
    if (!data.email || !data.mot_de_passe) {
      res.status(400).send({ message: "champs vide" });
      return;
    }
  
    // Rechercher l'utilisateur correspondant à l'adresse e-mail fournie
    Util.findOne({ email: data.email })
      .then(utili => {
        // Comparer le mot de passe fourni avec le mot de passe haché enregistré
        const valid = bcrypt.compareSync(data.mot_de_passe, utili.mot_de_passe);
        if (!valid) {
          // Retourner une erreur "mot de passe incorrect"
          res.status(401).send({ message: "mdp incorrecte" });
        } else {
          // Créer un payload pour le token JWT
          const payload = {
            utilid: utili._id,
            email: utili.email,
            role: utili.role,
            prenom: utili.prenom,
            nom : utili.nom,
          };
          // Signer le token JWT
          const token = jwt.sign(payload, '123456789');
          res.send({ mytoken: token });
        }
      })
      .catch(err => {
        // Retourner une erreur "mail introuvable"
        res.status(404).send({ message: "adresse introuvable dans la base" });
      });
  });
  
  // afficher tous les utilisateurs
router.get('/all' ,async function(req, res) {
    Util.find({})
        .then(
            (util)=>{
                res.status(200).send(util);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})

// get utilisateurs de role membre
router.get('/membres', async function(req, res) {
  Util.find({ role: "membre" }) // Ajouter une condition pour filtrer les utilisateurs ayant un rôle de "membre"
      .then(
          (util)=>{
              res.status(200).send(util);
          }
      )
      .catch(
          (err)=>{
              res.status(400).send(err)
          }
      )
});

// get utilistaeur par cin
router.get('/getbycin/:cin' , (req, res)=>{
    let cin=req.params.cin;

    Util.findOne({cin: cin})
        .then(
            (util)=>{
                res.status(200).send(util);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})

// recherche par nom d'utilisateur
router.get('/rechercher', async function(req, res) {
  let nom = req.query.nom;
  let prenom = req.query.prenom;

  let filtre = {};

  if (nom && prenom) {
    filtre = {nom: nom, prenom: prenom};
  } else if (nom) {
    filtre = {nom: nom};
  } else if (prenom) {
    filtre = {prenom: prenom};
  }
  try {
    const utilisateurs = await Util.find(filtre);
    res.status(200).send(utilisateurs);
  } catch (err) {
    res.status(400).send(err);
  }
});

// get by id
router.get('/getbyid/:id' , async function(req, res) {
    let id=req.params.id

    Util.findOne({_id: id})
        .then(
            (util)=>{
                res.status(200).send(util);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})


// supprimer un utilisateur par son cin
router.delete('/deletebycin/:cin' , async function(req, res) {
    let cin=req.params.cin

    Util.findOneAndDelete({cin: cin})
        .then(
            (util)=>{
                res.status(200).send(util);
            }
        )
        .catch(
            (err)=>{
                res.status(400).send(err)
            }
        )
})




// modifier un util par cin
router.put('/updatebycin/:cin' , async function(req, res) {
    let cin = req.params.cin
    let data = req.body;

    Util.findOneAndUpdate({cin: cin}, data)
    .then(
        (util)=>{
          
            res.status(200).send(util);
        }
    )
    .catch(
        (err)=>{
            res.status(400).send(err)
        }
    )
})

// modifier un util par id
router.put('/updatebyid/:id' , upload.any('image'), async function(req, res) {
  let id = req.params.id
  let data = req.body;
  if(filename.length >0){
      data.image = filename;
  }

  Util.findOneAndUpdate({_id: id}, data)
  .then(
      (util)=>{
          filename= '';
          res.status(200).send(util);
      }
  )
  .catch(
      (err)=>{
          res.status(400).send(err)
      }
  )

})

// modifier mdp par id
router.put('/updatebyid1/:id', async function(req, res) {
  const id = req.params.id;
  const { mot_de_passe } = req.body;

  console.log('Request body:', req.body);

  if (!mot_de_passe) {
    console.log('New password is required');
    return res.status(400).json({ message: 'New password is required' });
  }

  console.log('Updating user with ID:', id);

  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(mot_de_passe, salt);

  Util.findByIdAndUpdate(id, { mot_de_passe: hashedPassword })
    .then((util) => {
      if (!util) {
        console.log(`User with ID ${id} not found`);
        return res.status(404).json({ message: `User with ID ${id} not found` });
      }
      console.log('User updated:', util);
      return res.status(200).send(util);
    })
    .catch((err) => {
      console.log('Error:', err);
      return res.status(400).send(err);
    });
});

// changer mon mdp oublie
  // Step 1: Send password reset email
router.post('/forgot-password', async (req, res) => {
  try {
    const email = req.body.email;
    const util = await Util.findOne({ email });
    if (!util) {
      return res.send(false);
    }
    const token = crypto.randomBytes(20).toString('hex');
    const expirationDate = new Date(Date.now() + 3600000); // Token expires in 1 hour
    util.resetToken = token;
    util.resetTokenExpiration = expirationDate;
    await util.save();

    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'PROJETGESTION4@gmail.com',
        pass: 'ckfzldjnoalhsago'
      }
    });
    const mailOptions = {
      from: 'PROJETGESTION4@gmail.com',
      to: email,
      subject: 'Reset your password',
      html: `Hello ,                    
          your reset password link = http://localhost:4200/changermd/${token}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent: ' + info.response);
        res.send(true);
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});


// Step 2: Process password reset request
router.post('/reset-password', async (req, res) => {
  const token = req.body.token;
  const mot_de_passe = req.body.mot_de_passe;
  try {
    const util = await Util.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
    });
    if (!util) {
      return res.status(400).send('Invalid or expired reset token');
    }
    util.mot_de_passe = await bcrypt.hash(mot_de_passe, 10);
    util.resetToken = null;
    util.resetTokenExpiration = null;
    await util.save();
    res.send(true);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

// export de model
 module.exports=router;
