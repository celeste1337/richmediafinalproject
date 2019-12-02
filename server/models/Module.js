//this needs to be a string, they're basically collections of strings?
//type will determine what type of module it is, then itll display it somehow lol
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

let ModuleModel = {};
let ProjectModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();


//module schema
const ModuleSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  type: {
    type: String,
    required: true,
    trim: true,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Project',
  },
  createdData: {
    type: Date,
    default: Date.now,
  },
});

//project schema ????
const ProjectSchema = new mongoose.Schema({
  modules: {
    type: mongoose.Schema.ObjectID,
    ref: 'Module'
  }
});

ModuleSchema.statics.toAPI = (doc) => ({
  text: doc.text,
  type: doc.type
});

ModuleSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  //populate?
  return ModuleModel.find(search).select('text type').exec(callback);
};

ModuleSchema.statics.findByOwnerAndID = (ownerId, _id, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id,
  };
  //populate??
  return ModuleModel.find(search).select('text type').exec(callback);
};

ModuleModel = mongoose.model('Module', ModuleSchema);
ProjectModel = mongoose.model('Project', projectSchema);


module.exports.ModuleModel = ModuleModel;
module.exports.ModuleSchema = ModuleSchema;
