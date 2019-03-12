
    /* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component';
    
    const applicationImports = [
      () => import(/* webpackChunkName: 'features' */'../../src/routes/features'),
      () => import(/* webpackChunkName: 'home' */'../../src/routes/home'),
      () => import(/* webpackChunkName: 'login' */'../../src/routes/login'),
      () => import(/* webpackChunkName: 'profile' */'../../src/routes/profile'),
      () => import(/* webpackChunkName: 'register' */'../../src/routes/register'),
    ];
    
    assignImportedComponents(applicationImports);
    export default applicationImports;