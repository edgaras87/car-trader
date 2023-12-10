// dont forget tochange name !!! 'src/environments/environment_example.prod.ts' --> 'src/environments/environment.prod.ts'

export const environment = {
    production: true,
    apiUrl: 'http://130.162.237.17/api',
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
  