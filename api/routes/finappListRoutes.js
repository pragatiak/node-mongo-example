'use strict';
module.exports = function(app) {
  var finappList = require('../controllers/finappListController');
  // var tasksList = require('../controllers/takListController');

  // finappList Routes
  // app.route('/tasks')
  //   .get(tasksList.list_all_tasks)
  //   .post(tasksList.create_a_task);


  // app.route('/tasks/:taskId')
  //   .get(tasksList.read_a_task)
  //   .put(tasksList.update_a_task)
  //   .delete(tasksList.delete_a_task);


  app.route('/finappList') 
    .get(finappList.list_all_finapp)

  app.route('/finapp/:finappId') 
    .get(finappList.get_finapp)
};