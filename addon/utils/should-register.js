import Ember from 'ember';
import config from 'ember-get-config';

const {
  isPresent,
  A: emberArray
} = Ember;

const {
  modulePrefix
} = config;

export default function shouldRegister(name) {
  let moduleMap = self.requirejs.entries;
  let matchRegex = new RegExp(`${modulePrefix}/mirage/models/${name}`, 'i');

  return !isPresent(emberArray(Object.keys(moduleMap))
    .find((module) => isPresent(module.match(matchRegex))));
}
