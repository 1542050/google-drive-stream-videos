/*
* @Author: kimbui
* @Date:   2017-03-09 23:08:42
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-10 00:05:44
*/

'use strict';

var notes = require('../models/notes');
exports.add = function(req, res, next) {
    res.render('noteedit', {
        title: "Add a note",
        docreate: true,
        notekey: "",
        note: undefined
    });
}

exports.save = function(req, res, next) {
    if (req.body.docreate === 'create') {
        notes.create(req.body.notekey,
                     req.body.title,
                     req.body.body);
    } else {
        notes.update(req.body.notekey,
                     req.body.title,
                     req.body.body);
    }
    res.redirect('/noteview?key='+req.body.notekey);
}

exports.view = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('notes/noteview', {
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });
}

exports.edit = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('notes/noteedit', {
        title: note ? ("Edit " + note.title) : "Add a Note",
        docreate: note ? false : true,
        notekey: req.query.key,
        note: note
    });
}

exports.destroy = function(req, res, next) {
    var note = undefined;
    if(req.query.key) {
        note = notes.read(req.query.key);
    }
    res.render('notes/notedestroy', {
        title: note ? note.title : "",
        notekey: req.query.key,
        note: note
    });
}

exports.dodestroy = function(req, res, next) {
   notes.destroy(req.body.notekey);
   res.redirect('/');
}