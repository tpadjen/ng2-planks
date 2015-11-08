import {
  iit,
  it,
  ddescribe,
  describe,
  expect,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/angular2';
import {UserService} from '../../services/user-service';
import {Navbar} from './navbar';

class MockUserService {
  public loggedIn = false;

  isLoggedIn() {
    return this.loggedIn;
  }

}


describe('navbar component', () => {

  beforeEachProviders(() => [
    provide(UserService, {useClass: MockUserService})
  ]);

  describe('brand', () => {

    describe('not logged in', () => {

      it('should not have the logged-in class', injectAsync([TestComponentBuilder], (tcb) => {
        return tcb.overrideTemplate(Navbar, `
            <p class="navbar-brand" [class.logged-in]="User.isLoggedIn()"></p>`)
          .createAsync(Navbar).then((fixture) => {
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement;

            expect(compiled.querySelector('.navbar-brand')).not.toHaveCssClass('logged-in');
          });
      }));

    });


    describe('logged in', () => {

      it('should have the logged-in class',
          injectAsync([TestComponentBuilder, UserService], (tcb, user) => {
        return tcb.overrideTemplate(Navbar, `
            <p class="navbar-brand" [class.logged-in]="User.isLoggedIn()"></p>`)
          .createAsync(Navbar).then((fixture) => {
            user.loggedIn = true;
            fixture.detectChanges();
            var compiled = fixture.debugElement.nativeElement;

            expect(compiled.querySelector('.navbar-brand')).toHaveCssClass('logged-in');
          });
      }));

    });

  });

});