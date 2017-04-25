import {ServiceConfiguration} from 'meteor/service-configuration';

ServiceConfiguration.configurations.remove({
  service: 'facebook'
});
ServiceConfiguration.configurations.remove({
  service: 'twitter'
});


ServiceConfiguration.configurations.insert({
  service: 'facebook',
  appId: '1407327315985113',
  secret: 'ef40c68cf3620c491c62242cd2d2073d'
});

ServiceConfiguration.configurations.insert({
  service: 'twitter',
  consumerKey: 'mpyZqnQosY4CgBeYnXlDnxxRR',
  secret: 'Xt1R3X2pGZHKaRjgU7mLU9KLMoib5pBfiVh0j8RSYIvVUOAFdE'
});
