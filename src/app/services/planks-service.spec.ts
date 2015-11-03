// import {provide} from 'angular2/angular2';
// import {
//   it,
//   iit,
//   describe,
//   ddescribe,
//   expect,
//   inject,
//   injectAsync,
//   beforeEachProviders
// } from 'angular2/testing';

// import {GroceryItem} from '../models/grocery-item/grocery-item';
// import {GroceryService} from './grocery-service';
// import {UserService} from './user-service';
// import {FirebaseService} from './firebase-service';


// describe('GroceryService', () => {

//   beforeEachProviders(() => [
//     FirebaseService,
//     UserService,
//     GroceryService
//   ]);

//   describe('addItem', () => {

//     it('pushes the item', inject([GroceryService, FirebaseService], (grocery, fire) => {
//       spyOn(fire.items, 'push').and.returnValue(null);

//       var item: GroceryItem = {
//         name: 'Name',
//         quantity: 1,
//         units: 'cups',
//         key: null
//       }
//       grocery.addItem(item);

//       expect(fire.items.push).toHaveBeenCalled();
//     }));

//     it('logs an error on failure', inject([GroceryService, FirebaseService], (grocery, fire) => {
//       spyOn(fire.items, 'push').and.callFake((item, callback) => { callback("error")});
//       spyOn(console, 'log');

//       grocery.addItem({});

//       expect(fire.items.push).toHaveBeenCalled();
//       expect(console.log).toHaveBeenCalledWith("error");
//     }));

//   });

//   describe('updateItem', () => {
//     it('updates the item', inject([GroceryService, FirebaseService], (grocery, fire) => {
//       var child = jasmine.createSpyObj("child", ["update"]);
//       spyOn(fire.items, 'child').and.returnValue(child);

//       var item: GroceryItem = {
//         name: 'Name',
//         quantity: 1,
//         units: 'cups',
//         key: "1234"
//       }
//       grocery.updateItem(item.key, item);

//       expect(fire.items.child).toHaveBeenCalledWith("1234");
//       expect(child.update).toHaveBeenCalled();
//     }));

//     it('logs an error on failure', inject([GroceryService, FirebaseService], (grocery, fire) => {
//       var updater = {
//         update: (item, callback) => {
//           callback("error");
//         }
//       }
//       spyOn(fire.items, 'child').and.returnValue(updater);
//       spyOn(console, 'log');

//       grocery.updateItem("1234", {});

//       expect(fire.items.child).toHaveBeenCalledWith("1234");
//       expect(console.log).toHaveBeenCalledWith("error");
//     }));
//   });

//   describe('removeItem', () => {
//     it('removes the item', inject([GroceryService, FirebaseService], (grocery, fire) => {
//       var child = jasmine.createSpyObj("child", ["remove"]);
//       spyOn(fire.items, 'child').and.returnValue(child);

//       var item: GroceryItem = {
//         name: 'Name',
//         quantity: 1,
//         units: 'cups',
//         key: "1234"
//       }
//       grocery.removeItem(item);

//       expect(fire.items.child).toHaveBeenCalledWith("1234");
//       expect(child.remove).toHaveBeenCalled();
//     }));

//     it('logs an error on failure', inject([GroceryService, FirebaseService], (grocery, fire) => {
//       var remover = {
//         remove: (callback) => {
//           callback("error");
//         }
//       }
//       spyOn(fire.items, 'child').and.returnValue(remover);
//       spyOn(console, 'log');

//       grocery.removeItem({key: "1234"});

//       expect(fire.items.child).toHaveBeenCalledWith("1234");
//       expect(console.log).toHaveBeenCalledWith("error");
//     }));
//   });

//   describe('getBlankItem', () => {
//     it('returns a blank GroceryItem', inject([GroceryService, FirebaseService], (grocery) => {
//       expect(grocery.getBlankItem()).toEqual(new GroceryItem());
//     }));
//   });

// });