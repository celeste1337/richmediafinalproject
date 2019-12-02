//this needs to be a collection of modules? help
//https://mongoosejs.com/docs/populate.html
//USE POPULATE SOMEHOW

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const _ = require('underscore');

/*
let ProjectModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  cost: {
    type: Float,
    min: 0,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
    trim: true,
  },
  wears: {
    type: Number,
    min: 0,
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

ItemSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  cost: doc.cost,
  imageUrl: doc.imageUrl,
  wears: doc.wears,
});

ItemSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return ItemModel.find(search).select('name cost imageUrl wears').exec(callback);
};

ItemSchema.statics.findByOwnerAndID = (ownerId, _id, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id,
  };

  return ItemModel.find(search).select('name cost imageUrl wears').exec(callback);
};

ItemSchema.statics.deleteItem = (ownerId, _id, callback) => {
  const search = {
    owner: convertId(ownerId),
    _id,
  };

  return ItemModel.deleteOne(search).exec(callback);
}

ItemModel = mongoose.model('Item', ItemSchema);

module.exports.ItemModel = ItemModel;
module.exports.ItemSchema = ItemSchema; */