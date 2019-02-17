
    /* eslint-disable */
    /* tslint:disable */
     
    import {assignImportedComponents} from 'react-imported-component';
    
    const applicationImports = [
      () => import('../shared/pages/about'),
    ];
    
    assignImportedComponents(applicationImports);
    export default applicationImports;