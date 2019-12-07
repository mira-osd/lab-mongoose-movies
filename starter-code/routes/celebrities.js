const express = require('express');
const router = express.Router();
const Celebrity = require('../models/celebrity.js')

router.get('/', function(req, res, next){
    Celebrity.find().then(function (celebritiesFromDb){
        console.log("mes celeb de Db sont: ", celebritiesFromDb);
        res.render('celebrities/index', {
            celebrities: celebritiesFromDb
        })
    }).catch(function (err){
        next(err);
    })
    
})

router.get('/new', function(req,res,next){
    res.render('celebrities/new');
});
 router.post('/',function(req, res, next){
     const name = req.body.name;
     const occupation = req.body.occupation; 
     const catchPhrase = req.body.catchPhrase;

     Celebrity.create({
         name: name,
         occupation : occupation, 
         catchPhrase : catchPhrase,

     }).then(function(celebrity){
         res.redirect(`/celebrities/${celebrity._id}`);
     }).catch(function(){
         res.redirect('');
     });
 })


router.get('/:id', function(req, res, next){
    const id = req.params.id;
    const { name, occupation, catchPhrase } = req.body;

    Celebrity.findById(id)
    .then(function (showCeleb){
        res.render('celebrities/show', {
            celebrities: showCeleb
        });
    }).catch(err => next(err))
});

router.post('/delete', function (req,res,next){

   Celebrity.findByIdAndRemove({_id:req.query.celebrity_id})
   .then(function (){
       res.redirect('/celebrities')
   }).catch(err => next(err))

})

router.get('/edit', function (req,res,next){
    const id= req.query.celebrity_id
    Celebrity.find(id).then(function (celebrity){
        res.render('edit', {
            celebrity:celebrity
        })
    }).catch(err=>next(err));
})

router.post('/edit', function (req, res, next){
    Celebrity.update({_id:req.query.celebrity_id}, {$set:{
        name: req.body.name,
        occupation: req.body.occupation,
        catchPhrase: req.body.catchPhrase,
    }}).then(function(){
        res.render(`/celebrities/${req.query.celebrity_id}`);
    }).catch(err => next(err))
});

module.exports = router;