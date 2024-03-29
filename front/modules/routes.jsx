const RouteName = {
    Eleve : 'eleves',
    EleveDetails : ' EleveDetails',
    Cycle: 'cycles',
    CycleDetails: 'cycleDetails',
    Payment:'payment',
    PaySlip: 'PaySlip',
}
  
  // export const Platform = {
  //   Main : 'Main',
  //   // Subdomain : 'Subdomain',
  // }
  
  //  const Route = {
  //   path: string,
  //   // type: AuthRoute,
  //   completeProfileOnly:boolean
  // };
  
  // const RoutesRoot = {
  //   [key in RouteName] : Route
  // };
  
  const Routes = {
    // Register: {
    //   path: '/register',
    //   type: AuthRoute.Unauthenticated,
    //   platforms: [Platform.Main, Platform.Subdomain],
    // },
    // Dashboard: {
    //   path: '/dashboard',
    //   type: AuthRoute.Authenticated,
    //   platforms: [Platform.Main, Platform.Subdomain],
    //   roles: [AuthRole.Admin],
    // },

    Eleve: {
      path: '/eleves',
      // platforms: [Platform.Main]
    },
    EleveDetails: {
        path: '/eleves/[id]',
        // type: AuthRoute.Public,
        // platforms: [Platform.Main]
    },
    Personnel: {
      path: '/personnel',
      // type: AuthRoute.Public,
      // platforms: [Platform.Main]
    },
    Dashboard:{
    path: '/dashboard'

    },

    Bulletin: {
      path: '/payment/bulletin/[id]'
    }
    ,
    Payment: {
      path: '/payment',
    },
    PaymentDetails: {
      path: '/payment/[id]'
    },
    Receipt:{
      path: '/eleves/recu/[id]'
    },
    // PersonnelDetails: {
    //   path: '/personnel/[id]',
    //   // type: AuthRoute.Public,
    //   // platforms: [Platform.Main]
    // },
    levelEdit: {
      path: '/level/addLevel',
      // type: AuthRoute.Public,
      // platforms: [Platform.Main]
    },
    Cycle: {
      path: '/cycle',
      // platforms: [Platform.Main]
    },
    CycleDetails: {
      path: '/cycleDetails/[id]',
      // platforms: [Platform.Main]
    }
  

  };
  
  export const createURL = (path) =>
    typeof window !== 'undefined' ? `${path}` : '';
  
  export default Routes;
  