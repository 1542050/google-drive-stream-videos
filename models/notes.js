/*
* @Author: kimbui
* @Date:   2017-03-09 23:03:31
* @Last Modified by:   kimbui
* @Last Modified time: 2017-03-09 23:03:46
*/

var notes = [];
exports.update = exports.create = function(key, title, body) {
    notes[key] = { title: title, body: body };
}
 
exports.read = function(key) {
    return notes[key];
}
 
exports.destroy = function(key) {
    delete notes[key];
}
 
exports.keys = function() {
    return Object.keys(notes);
}