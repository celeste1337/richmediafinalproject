const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ModuleModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

//module schema
const ModuleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  items: {
    items: [String],
    required: true,
    trim: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

ModuleSchema.statics.toAPI = (doc) => ({
  title: doc.title,
  items: doc.items
});

ModuleSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  //populate?
  return ModuleModel.find(search).select('title items').exec(callback);
};

ModuleSchema.statics.findByOwnerAndID = (ownerId, _id, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id,
  };
  //populate??
  return ModuleModel.find(search).select('title items').exec(callback);
};

ModuleModel = mongoose.model('Module', ModuleSchema);


module.exports.ModuleModel = ModuleModel;
module.exports.ModuleSchema = ModuleSchema;
