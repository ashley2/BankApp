'use strict';

var express = require('express');
var router = express.Router();

var Trans = require('../models/trans');

router.post('/add', (req, res) => {
  var newTrans = req.body;
  Trans.create(newTrans, function(err){
    if(err){
     res.status(455).send(err);
   } 
   else {
    res.send()
  }
})
})

router.get('/', (req, res) => {
  Trans.read(function(err, transactions){
    if(err){
     res.status(400).send(err);
     return;
   }
   res.send(transactions);
 });
});

router.delete('/delete/:id', function(req, res){
  var id = req.params.id; 
  Trans.delete(id, function(err){
    if(err){
      res.status(400).send(err);
      return;
    } else {
      res.send();
    }
  })
})


module.exports = router;