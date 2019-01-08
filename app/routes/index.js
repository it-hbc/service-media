var express = require('express');
var router = express.Router();
var fs = require('fs');
var youtubedl = require('youtube-dl');
var childProcess = require('child_process');
var ytSearch = require('youtube-search');
var files = [];
var models = require('../models');
var config = require('config');
var passport = require('passport');
var passportMiddleware = require('../passport_middleware');
/* GET home page. */
router.get('/logout', function (req, res){
    req.session.destroy(function (err) {
        res.redirect('/'); //Inside a callback… bulletproof!
    });
});
router.get('/', passportMiddleware.ensureAuthenticated, function (req, res, next) {
    models.Media.findOne({},{},{sort:{'created_at': -1}}, function(err, file){
        if(file) {
            var url = 'http://www.youtube.com/watch?v=' + file.file_id;
            youtubedl.getInfo(url, [], function (err, info) {
                if (err) throw err;
                console.dir(info);
                res.render('index', {file: file, auth: true, currentUrl: '/', latest_title: info.title, latest_thumbnail: info.thumbnail, latest_status: file.status, latest_file_id: file.file_id});
            });
        }else{
            res.render('index', {file: null, auth: true, currentUrl: '/'});
        }
    });
});

router.get("/download/:fileID/:dlType?", passportMiddleware.ensureAuthenticated, function (req, res) {
    var file_id = req.params.fileID;
    models.Media.find({file_id: file_id}, function (err, file) {
        if (err) throw err;
        if (Array.isArray(file) && file.length === 0) {
            var url = 'http://www.youtube.com/watch?v=' + file_id;
            var filename = '';
            var path = '/tmp/' + file_id + '.mp4';

            file = new models.Media({
                file_name: filename,
                path: path,
                status: 'started',
                file_id: file_id
            });
            youtubedl.getInfo(url, [], function(err, info) {
                if (err) throw err;
                file.file_name = info._filename;

                file.save(function(err){
                    if (err) throw err;
                    res.redirect("/files");
                });
                var command = 'youtube-dl -o /tmp/' + file_id + ' -f \'bestvideo[ext=mp4]+bestaudio[ext=m4a]/mp4\' --merge-output-format mp4 ';

                if (req.params.dlType === 'm'){
                    command = 'youtube-dl -o ' + path + ' -f \'bestaudio[ext=m4a]/mp4\' ';
                }
                childProcess.exec(command + url, (err, stderr, stdout)=>{
                    if (err) {
                        console.dir(err);
                    }else {
                        console.log(stdout);
                        console.log(stderr);
                        file.status = 'completed';
                        file.save(function (err) {
                            if (err) throw err;
                        });
                    }
                });
            });
        } else {
            file = file[0];
            if (file.status === 'completed') {
                res.download(file.path, file.file_name, function(err){
                    if (!config.get('save_files')) {
                        fs.unlink(file.path, function(err){
                            file.status = 'deleted';
                            file.remove(function(err){
                                if (err) throw err;
                            });
                        });
                    }
                });

            } else {
                res.redirect("/files");
            }
        }
    });
});

router.get('/files', passportMiddleware.ensureAuthenticated, function (req, res) {
    models.Media.find({}, function(err, files){
        res.render('files', {files: files, auth: true, currentUrl: '/files'});
    });
});
router.get('/login', function(req,res){
   res.render('login', {auth: false, currentUrl: '/login'});
});

router.post("/login", passportMiddleware.mylogin);

router.get("/search/:searchterm", passportMiddleware.ensureAuthenticated, function (req, res) {
    var opts = {
        maxResults: 12,
        type: 'video',
        key: 'AIzaSyA6MPNLLvkFuWI4ZL_Bh_08B5OSUFZN3RQ'
    };
    ytSearch(req.params.searchterm, opts, function (err, r) {
        if (err) throw err
        res.json({'results': r});
    });
});
module.exports = router;
