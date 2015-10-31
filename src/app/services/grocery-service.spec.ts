import {provide} from 'angular2/angular2';
import {
  it,
  describe,
  expect,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import {GroceryService} from './grocery-service';


describe('GroceryService', () => {

  beforeEachProviders(() => [
    GroceryService,
  ]);

  describe('construction', () => {

    it('sets the items', inject([GroceryService], (service) => {
      expect(service.items.length).toEqual(4);
    }));

  });

});