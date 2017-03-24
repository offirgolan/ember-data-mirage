import Ember from 'ember';
import shouldRegister from 'ember-data-mirage/utils/should-register';
import { getModels } from 'ember-data-mirage/-private/resources';

const {
  assert,
  isPresent,
} = Ember;

function registerModels(server) {
  let models = getModels();
  let modelsToRegister = {};

  Object.keys(models).forEach(modelName => {
    if (shouldRegister(modelName)) {
      modelsToRegister[modelName] = models[modelName];
    }
  });

  server.schema.registerModels(modelsToRegister);
}

function modelFor(name) {
  let models = getModels();

  assert(`Model of type '${name}' does not exist.`, isPresent(models[name]));

  return models[name];
}

export {
  modelFor,
  registerModels
};
