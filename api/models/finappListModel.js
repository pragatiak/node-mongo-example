'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


// var TaskSchema = new Schema({
//   finappName: {
//     type: String,
//     required: 'Kindly enter the name of the task'
//   },
//   Created_date: {
//     type: Date,
//     default: Date.now
//   },
//   status: {
//     type: [{
//       type: String,
//       enum: ['pending', 'ongoing', 'completed']
//     }],
//     default: ['pending']
//   }
// });


var FinappSchema = new Schema({
    idFinapp: {
      type: String,
      required: 'Kindly enter the id of the Finapp'
    },
    nameFinapp: {
      type: String,
      required: 'Kindly enter the name of the Finapp'
    },
    titleFinapp: {
      type: String,
      required: 'Kindly enter the title of the Finapp'
    },
    versionFinapp: {
      type: String,
      required: 'Kindly enter the version of the Finapp'
    },
    descFinapp: {
      type: String,
      required: 'Kindly enter the desc of the Finapp'
    },
    services: {
      type: Object,
      required: 'Kindly enter the services of the Finapp'
    }
  });
//  module.exports = mongoose.model('Tasks', TaskSchema);
  module.exports = mongoose.model('Finapps', FinappSchema);