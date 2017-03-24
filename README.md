# Ember Data Mirage

[![ember-cli-mirage](https://embadge.io/v1/badge.svg?start=0.3.0&label=ember-cli-mirage)](https://embadge.io/v1/badge.svg?start=0.3.0&label=ember-cli-mirage)
[![Build Status](https://travis-ci.org/offirgolan/ember-data-mirage.svg)](https://travis-ci.org/offirgolan/ember-data-mirage)
[![npm version](https://badge.fury.io/js/ember-data-mirage.svg)](http://badge.fury.io/js/ember-data-mirage)

Automatically create Mirage models based on the app's Ember Data models

## Features

- Automatically create mirage models based off of your ember data models
- Models will include the appropriate relationships and associations
- Easily build on top of the pre created models

## Installation

```
ember install ember-data-mirage
```

## Helpful Links

- ### [Changelog](CHANGELOG.md)

## Looking for help?
If it is a bug [please open an issue on GitHub](http://github.com/offirgolan/ember-data-mirage/issues).

## Usage

### Register the Models

In your `mirage/config.js` add the following two line to the top:

```js
import { registerModels } from 'ember-data-mirage';

export default function() {
  // Register Models
  registerModels(this);

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
