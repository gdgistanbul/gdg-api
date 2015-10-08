var _ = require('underscore');
var mongoose = require('mongoose');
var shortId = require('shortid');
var IdentityCounter = mongoose.model('IdentityCounter');

var baseSchema = new mongoose.Schema({
  _id: {
    type: String,
    unique: true,
    'default': shortId.generate
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  no: {
    type: Number,
    required: true,
    default: -1, //this line will be ignored
    index: true
  }
});

baseSchema.options.toJSON = {
  transform: function (doc, ret) {
    var fields = '__v __t'.split(' ');
    _.each(fields, function (field) {
      if (ret && ret[field]) {
        delete ret[field];
      }
    });
    return ret;
  }
};

baseSchema.pre('save', function (next) {
  var self = this;
  if (self.updatedAt) {
    self.updatedAt = new Date();
  }
  if (!self.isNew) {
    return next();
  }
  IdentityCounter.findByIdAndUpdate(
    self.constructor.modelName,
    {
      $inc: {
        count: 1
      }
    },
    {
      upsert: true
    },
    function (err, counter) {
      if (err) {
        return next(err);
      }
      if (counter != null) {
        self.no = counter.count + 1;
      } else {
        self.no = 1;
      }
      return next();
    });
});

module.exports = baseSchema;