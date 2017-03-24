import Ember from 'ember';
import requireModule from 'ember-require-module';
import config from 'ember-get-config';
import { Model, Factory, belongsTo, hasMany, association } from 'ember-cli-mirage';

const {
  assign,
  canInvoke,
  isPresent,
} = Ember;

const {
  modulePrefix
} = config;

const options = assign({
  Model: {},
  Factory: {
     associateBelongsTo: true
   }
}, config['ember-data-mirage'] || {});

let DsModels;
let Models;
let Factories;

function isDsModel(model) {
  return model && canInvoke(model, 'eachRelationship');
}

export function getDsModels() {
  if (DsModels) {
    return DsModels;
  }

  let moduleMap = self.requirejs.entries;
  let modelMatchRegex = new RegExp(`${modulePrefix}/models`, 'i');

  DsModels = {};

  Object.keys(moduleMap)
    .filter((module) => isPresent(module.match(modelMatchRegex)))
    .forEach((path) => {
      let paths = path.split('/');
      let modelName = paths[paths.length - 1];
      let model = requireModule(path);

      if (isDsModel(model)) {
        DsModels[modelName] = model;
      }
    });

    return DsModels;
}

export function getModels() {
  if (Models) {
    return Models;
  }

  let models = getDsModels();
  Models = {};

  Object.keys(models).forEach(modelName => {
    let model = models[modelName];
    let attrs = {};

    model.eachRelationship((name, r) => {
      if (r.kind === 'belongsTo') {
        attrs[name] = belongsTo(r.type, r.options);
      } else if (r.kind === 'hasMany') {
        attrs[name] = hasMany(r.type, r.options);
      }
    });

    Models[modelName] = Model.extend(attrs);
  });

  return Models;
}

export function getFactories() {
  if (Factories) {
    return Factories;
  }

  let models = getDsModels();
  Factories = {};

  Object.keys(models).forEach(modelName => {
    let model = models[modelName];
    let attrs = {};

    model.eachRelationship((name, r) => {
      if (options.Factory.associateBelongsTo && r.kind === 'belongsTo') {
        attrs[name] = association();
      }
    });

    Factories[modelName] = Factory.extend(attrs);
  });

  return Factories;
}
