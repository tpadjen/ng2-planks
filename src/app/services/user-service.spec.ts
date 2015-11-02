import {provide} from 'angular2/angular2';
import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  beforeEachProviders
} from 'angular2/testing';

import {FirebaseService} from './firebase-service';
import {UserService} from './user-service';

describe('UserService', () => {

  describe('without a user', () => {

    beforeEachProviders(() => [
      UserService,
      provide(FirebaseService, {useClass: NoUserFirebaseService})
    ]);

    it('should not be logged in', inject([UserService, FirebaseService], (user) => {
      expect(user.isLoggedIn()).toBe(false);
    }));

    it('can sign in with a google popup', inject([UserService, FirebaseService], (user, fire) => {
      spyOn(fire, 'authWithOAuthPopup');

      user.authWithGoogle();

      expect(fire.authWithOAuthPopup).toHaveBeenCalledWith("google", jasmine.any(Function));
    }));

    it('has a null profile', inject([UserService, FirebaseService], (user) => {
      expect(user.profile).toBeNull();
    }));

    it('has a null uid', inject([UserService, FirebaseService], (user) => {
      expect(user.uid).toBeNull();
    }));

  });

  describe('with a user', () => {

    beforeEachProviders(() => [
      UserService,
      FirebaseService
    ]);

    it('authorizes the user', inject([UserService, FirebaseService], (user) => {
      expect(user.user.profile.name).toEqual('User Name');
    }));

    it('should be logged in', inject([UserService, FirebaseService], (user) => {
      expect(user.isLoggedIn()).toBe(true);
    }));

    it('can sign out', inject([UserService, FirebaseService], (user, fire) => {
      spyOn(fire, 'unauth');

      user.signOut();

      expect(fire.unauth).toHaveBeenCalled();
    }));

    it('has a profile', inject([UserService, FirebaseService], (user) => {
      expect(user.profile).not.toBeNull();
    }));

    it('has a uid', inject([UserService, FirebaseService], (user) => {
      expect(user.uid).toBe('1234');
    }));

  });


});

class NoUserFirebase extends Firebase {

  onAuth(callback) {
    callback(null);
  }

}

class NoUserFirebaseService extends FirebaseService {
  get ref(): Firebase {
    return new NoUserFirebase('https://brilliant-torch-9227.firebaseio.com/url');
  }
}