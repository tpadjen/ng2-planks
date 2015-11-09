let appInjectorRef;

export const appInjector = (injector: any = false) => {
  if (!injector) {
    return appInjectorRef;
  }

  appInjectorRef = injector;

  return appInjectorRef;
};