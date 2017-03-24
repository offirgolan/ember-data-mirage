import Ember from 'ember';
import config from 'ember-get-config';

const {
  assign
} = Ember;

// Options + Defaults
export default assign({
  Model: {},
  Factory: {
     associateBelongsTo: true
   }
}, config['ember-data-mirage'] || {});
