interface FrontendConfig {
  publicBaseUrl: string;
  oauth: {
    googleAppId: string;
  };
}

const FRONTEND_CONFIG: FrontendConfig = {
  publicBaseUrl: 'http://furnituro.com',
  oauth: {
    googleAppId: '213962799516-54mk54eoqi2t7b9mnnerhd5nqmm6taqj.apps.googleusercontent.com'
  }
};

export { FRONTEND_CONFIG, FrontendConfig };

