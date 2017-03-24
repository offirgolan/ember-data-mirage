# Ember Data Mirage

[![Build Status](https://travis-ci.org/offirgolan/ember-data-mirage.svg)](https://travis-ci.org/offirgolan/ember-data-mirage)
[![npm version](https://badge.fury.io/js/ember-data-mirage.svg)](http://badge.fury.io/js/ember-data-mirage)

Automatically create Mirage models and factories based on the app's Ember Data models

## Features

- Automatically create mirage models and factories based off of your ember data models
- Models and Factories will include the appropriate relationships and associations
- Easily build on top of the pre created models and factories

## Installation

```
ember install ember-data-mirage
```

## Helpful Links

- ### [Changelog](CHANGELOG.md)

## Looking for help?
If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-data-mirage/issues).

## Usage

### Register the Models and Factories

In your `mirage/config.js` add the following two line to the top:

```js
import { registerModels, registerFactories } from 'ember-data-mirage';

export default function() {
  // Register Models & Factories
  registerModels(this);
  registerFactories(this);

  // Everything else goes here
  this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  this.namespace = '/api';    // make this `/api`, for example, if your API is namespaced
  this.timing = 300;      // delay for each request, automatically set to 0 during testing
}
```

### Extending a Model

You can extend a pre created model via the following syntax

```js
// mirage/models/foo.js

import { modelFor } from 'ember-data-mirage';

export default modelFor('foo').extend({
  bar: belongsTo('foo')
});
```

### Extending a Factory

You can extend a pre created factory via the following syntax

```js
// mirage/factories/foo.js

import { factoryFor } from 'ember-data-mirage';

export default factoryFor('foo').extend({
  bar: association()
});
```

## Options

In your app's `config/environment.js` file, you can specifcy some options via the following object

```js
ENV['ember-data-mirage'] = {
  Model: {
    // No options yet
  }
  Factory: {
    // There are many time where factory associations may cause some issues
    // Set this to false to not have them be automatically Set
    // Default: true
    associateBelongsTo: false
  }
};
```
