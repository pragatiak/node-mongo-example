var express = require("express");
var app = express();
var port = 8888;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const fs = require('fs');
const path = require('path');
// var parser = require('xml2json');
xml2js = require('xml2js');
var parser = new xml2js.Parser();

// var mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// mongoose.connect("mongodb://localhost:27017/finapp");
// var nameSchema = new mongoose.Schema({
//     firstName: String,
//     lastName: String
// });
// var User = mongoose.model("User", nameSchema);

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/index.html");
// });

// app.post("/addname", (req, res) => {
//     var myData = new User(req.body);
//     myData.save()
//         .then(item => {
//             res.send("Name saved to database");
//         })
//         .catch(err => {
//             res.status(400).send("Unable to save to database");
//         });
// });



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


// function getDetailWidget(filename) {

// fs.readFile( filename , function(err, data) {
//     var json = parser.toJson(data);
//     console.log("to json ->", json);
//  });

// }

function getDetailWidget(filename) {
fs.readFile(filename, function(err, data) {
    parser.parseString(data, function (err, result) {
        console.log('filename : ',filename);
        nameFinapp = result.widget.$.name;
        titleFinapp = result.widget.$.title;
        descFinapp = result.widget.$.description;
        console.log('nameFinapp', nameFinapp);
        console.log('titleFinapp', titleFinapp);
        console.log('descFinapp', descFinapp);
        // console.dir(result);
        // console.log('Done');
    });
});
}



// dirTree("/Users/pkhettry/Perforce/pkhettry/razor/finapps/wellness", function(err, data){
//     if(err){
//         throw err;
//     }
    
//     // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
//     console.log(data);
// });


  filewalker("/Users/pkhettry/Perforce/pkhettry/razor/finapps/wellness", function(err, data){
    if(err){
        throw err;
    }
    
    // ["c://some-existent-path/file.txt","c:/some-existent-path/subfolder"]
    // console.log(data);
});


app.listen(port, () => {
    console.log("Server listening on port " + port);
});