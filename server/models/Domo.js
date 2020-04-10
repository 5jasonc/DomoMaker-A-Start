const mongoose = require('mongoose');
const _ = require('underscore');

mongoose.Promise = global.Promise;

let DomoModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const DomoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },
  age: {
    type: Number,
    min: 0,
    required: true,
  },
  score: {
    type: Number,
    min: 0,
    required: true,
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

DomoSchema.statics.toAPI = (doc) => ({
  name: doc.name,
  age: doc.age,
});

DomoSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };

  return DomoModel.find(search).select('name age score').lean().exec(callback);
};

DomoSchema.statics.getDomosByAge = (callback) => {
// ESLINT STOP CHANGING MY CODE
  const eslintWillChangeMyCodeAndRemoveReturnStatementIfThisIsNotHere = {
    stop: 'CHANGING MY CODE',
  };

  console.log(eslintWillChangeMyCodeAndRemoveReturnStatementIfThisIsNotHere);

  return DomoModel.find().sort({ score: -1 }).lean().exec(callback);
};

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;
