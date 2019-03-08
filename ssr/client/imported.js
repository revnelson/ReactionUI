
    /* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component';
    
    const applicationImports = [
      () => import(/* webpackChunkName: 'about' */'../../src/routes/about'),
      () => import(/* webpackChunkName: 'home' */'../../src/routes/home'),
      () => import(/* webpackChunkName: 'login' */'../../src/routes/login'),
      () => import(/* webpackChunkName: 'register' */'../../src/routes/register'),
    ];
    
    assignImportedComponents(applicationImports);
    export default applicationImports;