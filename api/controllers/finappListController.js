'use strict';


var mongoose = require('mongoose'),
Finapp = mongoose.model('Finapps');

exports.list_all_finapp = function(req, res) {
  console.log('mongoose',mongoose)
  console.log('Finapppppppppppppppppppp',Finapp)
  Finapp.find({}, function(err, finapp) {
    if (err)
      res.send(err);
    console.log(finapp)
    res.json(finapp);
  });
};



exports.get_finapp = function(req, res) {
 console.log('Finapp',req.params.finappId);
 var finappId = req.params.finappId.toString();
 console.log('finappId',typeof finappId);

//  Finapp.find( { idFinapp : req.params.finappId } )
//  Finapp.findById( ''+finappId , function(err, finapp) {
  Finapp.findOne( { idFinapp : ''+finappId } , function(err, finapp) {
    if (err){
      res.send(err);
      // console.log('errrrrrrrrrrrrrrrrrrrr',err);
    }
    
    
    console.log('ressssssssssssssssssssssssss',finapp.services);
    console.log('finapp.services',typeof finapp.services)
    
    // var chk= JSON.parse(finapp[0].services);
    // console.log('ressssssssssssssssssssssssss',chk);
     res.json(finapp);
    
  });
};



exports.create_finapp_list = function(req, res) {
  var new_finapp = new Finapp(req.body);
  new_finapp.save(function(err, finapp) {
    if (err)
      res.send(err);
    res.json(JSON.parse(finapp));
  });
};
