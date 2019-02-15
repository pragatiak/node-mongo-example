const fs = require('fs');
const path = require('path');
// var parser = require('xml2json');
xml2js = require('xml2js');
var parser = new xml2js.Parser({explicitArray : false});



var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
      }
      else {
        filelist.push(file);
      }
    });
    return filelist;
  };
  
  /**
   * Explores recursively a directory and returns all the filepaths and folderpaths in the callback.
   * 
   * @see http://stackoverflow.com/a/5827895/4241030
   * @param {String} dir 
   * @param {Function} done 
   */
  function filewalker(dir, done) {
      let results = [];
  
      fs.readdir(dir, function(err, list) {
          if (err) return done(err);
  
          var pending = list.length;
  
          if (!pending) return done(null, results);
  
          list.forEach(function(file){
              file = path.resolve(dir, file);
  
              fs.stat(file, function(err, stat){
                  // If directory, execute a recursive call
                  if (stat && stat.isDirectory()) {
                      // Add directory to array [comment if you need to remove the directories from the array]
                      results.push(file);

                    //   if (module.parent == undefined) {
                        // node dirTree.js ~/foo/bar
                        var util = require('util');
                        util.inspect(dirTree(file), false, null);
                        // }
  
                      filewalker(file, function(err, res){
                          results = results.concat(res);
                          if (!--pending) done(null, results);
                      });
                  } else {
                      results.push(file);
  
                      if (!--pending) done(null, results);
                  }
              });
          });
      });
  };


  function dirTree(filename) {
    var stats = fs.lstatSync(filename)
        // info = {
        //     path: filename,
        //     name: path.basename(filename)
        // };
    if (stats.isDirectory()) {
        // info.type = "folder";
        var children = fs.readdirSync(filename).map(function(child) {
            // console.log('path.basename(filename)' , path.basename(filename));
            // console.log('(filename)' , (filename));
            if(path.basename(filename) === 'src'){
                return dirTree(filename + '/' + child);
            }
        });
    } else {
        // Assuming it's a file. In real life it could be a symlink or
        // something else!
        // info.type = "file";
        if(path.basename(filename) === 'widget.xml'){
            // console.log('Done');
            getDetailWidget(filename)
            // return info;
        }
    }

    // return info;
}

var docs =[];

function getDetailWidget(filename) {

fs.readFile(filename, function(err, data) {
    parser.parseString(data, function (err, result) {
        serviceList=[];
        idFinapp = result.widget.widgetInfo.$.appId;
        nameFinapp = result.widget.$.name;
        titleFinapp = result.widget.$.title;
        versionFinapp = result.widget.$.version;
        descFinapp = result.widget.$.description;

        // console.log('idFinapp', idFinapp);
        // console.log('titleFinapp', titleFinapp);
        // console.log('versionFinapp', versionFinapp);
        // console.log('descFinapp', descFinapp);

        if(result.widget.serviceList){
            //  console.log('descFinapp', result.widget.serviceList);
            if(result.widget.serviceList.service){
                
            var jsonData = (result.widget.serviceList.service);
            console.log(jsonData.length);
            for (var i = 0; i < jsonData.length; i++) {
                // console.log(jsonData);
                var counter = jsonData[i];
                // debugger;
                // console.log('serviceList',counter["uri-template"]);
                serviceList.push(counter["uri-template"]);
            }
            // serviceList = result.widget.serviceList.service;
            
            }
        }
        console.log('serviceList',serviceList);
        docs.push({ 
            'idFinapp': idFinapp, 
            'nameFinapp': nameFinapp, 
            'titleFinapp': titleFinapp, 
            'versionFinapp': versionFinapp,
            'descFinapp': descFinapp,
            'services': serviceList
        });
        // console.log(docs)
       
    });
});

}



filewalker("/Users/pkhettry/Perforce/pkhettry/razor/finapps/wellness", function(err, data){
    if(err){
        throw err;
    }
    // console.log(docs)
// we create 'users' collection in newdb database
var url = "mongodb://localhost:27017/listfinapp";
// create a client to mongodb
var MongoClient = require('mongodb').MongoClient;

// make client connect to mongo service
MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    // db pointing to newdb
    // console.log('db',db);
    // var collectionExixts = db.getCollection("users").exists();
    // if(!collectionExixts){ 
    console.log("Switched to "+db.databaseName+" database");
 
    // documents to be inserted
   
    
    // insert multiple documents to 'users' collection using insertOne
    db.collection("finapps").insertMany(docs, function(err, res) {
        if (err) throw err;
        console.log(res.insertedCount+" documents inserted");
        // close the connection to db when you are done with it
        db.close();
    });
    // }
});

});




