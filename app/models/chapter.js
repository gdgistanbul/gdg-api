var mongoose = require('mongoose');
var baseSchema = require('../../core/mongoose/baseSchema');

var ChapterSchema = baseSchema.extend({
    chapterId: {type: String},
    city: {type: String},
    country: {type: String},
    loc: {
      type: [Number],
      index: '2d'
    },
    groupType: {type: String},
    name: {type: String},
    site: {type: String},
    state: {type: String},
    status: {type: String},
    street: {type: String}
  }
);

ChapterSchema.methods.import = function (chapter) {
  this._id = chapter.gplus_id; // jshint ignore:line
  this.chapterId = chapter.chapter_id; // jshint ignore:line
  this.city = chapter.city;
  this.country = chapter.country;
  if (chapter.geo) {
    this.loc = [chapter.geo.lat, chapter.geo.lng];
  }
  this.groupType = chapter.group_type; // jshint ignore:line
  this.name = chapter.name;
  this.site = chapter.site;
  this.state = chapter.state;
  this.status = chapter.status;
  this.street = chapter.street;
};

mongoose.model('Chapter', ChapterSchema);
