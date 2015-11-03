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

// import {FirebaseService, FirebaseWrapper} from './firebase-service';


// describe('FirebaseWrapper', () => {

//   describe('change', () => {
//     it('should callback the converted snapshot', () => {
//       var wrapper = new FirebaseWrapper('https://brilliant-torch-9227.firebaseio.com/url');
//       spyOn(wrapper, 'convertSnapshot').and.returnValue([1, 2, 3]);

//       var snap = {
//         val: () => {
//           return "value";
//         }
//       }

//       var callback = jasmine.createSpy("callback");

//       wrapper.change('value', callback);

//       wrapper._valueChanged(snap); // simulate value changing

//       expect(wrapper.convertSnapshot).toHaveBeenCalledWith("value");
//       expect(callback).toHaveBeenCalledWith([1, 2, 3]);
//     });

//     it('not implement convertSnapshot', () => {
//       var wrapper = new FirebaseWrapper('https://brilliant-torch-9227.firebaseio.com/url');
//       expect(function() { wrapper.convertSnapshot({}); }).toThrowError();
//     });

//     it('force subclasses to implement convertSnapshot', () => {
//       class FirebaseWrapperSub extends FirebaseWrapper {};

//       var wrapper = new FirebaseWrapperSub('https://brilliant-torch-9227.firebaseio.com/url');
//       expect(function() { wrapper.convertSnapshot({}); }).toThrowError();
//     });

//   });

// });


// describe('FirebaseService', () => {



// });