interface FrontendConfig {
  publicBaseUrl: string;
  oauth: {
    googleAppId: string;
  };
}

const FRONTEND_CONFIG: FrontendConfig = {
  publicBaseUrl: 'http://furnituro.com',
  oauth: {
    googleAppId: '757962824139-o3erncpmc9rqtshvq440ainjsfdu52ft.apps.googleusercontent.com'
  }
};

export { FRONTEND_CONFIG, FrontendConfig };

