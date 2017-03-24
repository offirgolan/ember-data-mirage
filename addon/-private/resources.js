import Ember from 'ember';
import requireModule from 'ember-require-module';
import config from 'ember-get-config';
import { Model, belongsTo, hasMany } from 'ember-cli-mirage';

const {
  canInvoke,
  isPresent,
} = Ember;

const {
  modulePrefix
} = config;

// Caches
let DsModels;
let Models;

// Rudimentary DS.Model check
function isDsModel(model) {
  return model && canInvoke(model, 'eachRelationship');
}

/**
 * Get all ember data models under the app's namespaces
 *
 * @method getDsModels
 * @private
 * @return {Object} models
 */
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

/**
 * Get all mirage models for each of the ember-data models
 *
 * @method getModels
 * @private
 * @return {Object} models
 */
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
