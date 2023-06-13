// import mongoose 
const mongoose =require('mongoose')


// creation de modele
const util=mongoose.model('util',{
     nom:{
         type:String,
         required:true
         
     },

     prenom:{
         type:String,
         required:true
     },
     cin:{
        type:Number,
        unique:true,
        required:true
    },
     email:{
        type:String,
        unique:true,
        required:true
    },
    mot_de_passe:{
        type:String,
        required:true
    },
    image:{
        type:String
    },
    role:{
        type:String,
        enum: ['admin', 'chef', 'membre'],
        required:true
        
    },
    resetToken: {
        type: String,
      },
      resetTokenExpiration: {
        type: Date,
      },

})

// export de model
module.exports= util;
