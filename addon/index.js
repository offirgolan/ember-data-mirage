import Ember from 'ember';
import shouldRegister from 'ember-data-mirage/utils/should-register';
import { getModels, getFactories } from 'ember-data-mirage/-private/resources';

const {
  assert,
  isPresent,
} = Ember;

function registerModels(server) {
  let models = getModels();
  let modelsToRegister = {};

  Object.keys(models).forEach(modelName => {
    if (shouldRegister('model', modelName)) {
      modelsToRegister[modelName] = models[modelName];
    }
  });

  server.schema.registerModels(modelsToRegister);
}

function registerFactories(server) {
  let factories = getFactories();
  let factoriesToRegister = {};

  Object.keys(factories).forEach(factoryName => {
    if (shouldRegister('factory', factoryName)) {
      factoriesToRegister[factoryName] = factories[factoryName];
    }
  });

  server.loadFactories(factoriesToRegister);
}

function factoryFor(name) {
  let factories = getFactories();

  assert(`Factory of type '${name}' does not exist.`, isPresent(factories[name]));

  return factories[name];
}

function modelFor(name) {
  let models = getModels();

  assert(`Model of type '${name}' does not exist.`, isPresent(models[name]));

  return models[name];
}

export {
  modelFor,
  factoryFor,
  registerModels,
  registerFactories
};
