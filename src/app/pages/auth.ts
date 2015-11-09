import {Router, CanActivate} from 'angular2/router';
import {UserService} from '../services/user-service';
import {appInjector} from '../app-injector';

export const isLoggedIn = (to, from) => {
  let injector = appInjector();
  let User = injector.get(UserService);
  let router = injector.get(Router);

  if (!User.doesExist()) {
    router.navigate(['/Root']);
    return false;
  }

  return true;
};