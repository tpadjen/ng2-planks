import {Router} from 'angular2/router';
import {
  CanActivate as CanActivateAnnotation
} from 'angular2/src/router/lifecycle_annotations_impl';
import {UserService} from '../services/user-service';
import {appInjector} from '../app-injector';

const isLoggedIn = (to, from) => {
  let injector = appInjector();
  let User = injector.get(UserService);
  let router = injector.get(Router);

  if (!User.doesExist()) {
    router.navigate(['/Root']);
    return false;
  }

  return true;
};

// must come before @Component and @CanActivate in annotation order
export function Authorize() {
  return function(cls) {
    var annotations = (<any>Reflect).getMetadata('annotations', cls) || [];

    // default CanActivate if no previous one exists
    var fn = (to, from) => { return true; }

    // look for and remove previously defined CanActivate
    annotations = annotations.filter((annotation) => {
      if (annotation.constructor.name === 'CanActivate') {
        // set fallback function
        fn = annotation.fn;
        return false;
      }
      return true;
    });

    // Set new CanActivate annotation with wrapped Authorization
    annotations.push(new CanActivateAnnotation((to, from) => {
      return isLoggedIn(to, from) ? fn(to, from) : false;
    }));

    // Redefine annotations
    (<any>Reflect).defineMetadata('annotations', annotations, cls);
    return cls;
  }
}