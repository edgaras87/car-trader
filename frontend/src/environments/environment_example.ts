// dont forget tochange name !!! 'src/environments/environment_example.ts' --> 'src/environments/environment.ts'


// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:80/api',
    firebase: {
      apiKey: "your key",
      authDomain: "domain",
      projectId: "project id",
      storageBucket: "bucket",
      messagingSenderId: "sender id",
      appId: "app id",
      measurementId: "measurement Id"
    },
    imagekit:{
      urlEndpoint:"imagekit urlEndpoint",
      publicKey:"imagekit publicKey"
    }
  };
  
  /*
   * For easier debugging in development mode, you can import the following file
   * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
   *
   * This import should be commented out in production mode because it will have a negative impact
   * on performance if an error is thrown.
   */
  // import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
  