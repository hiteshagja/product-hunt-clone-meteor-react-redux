import {ServiceConfiguration} from 'meteor/service-configuration';

ServiceConfiguration.configurations.remove({
  service: 'facebook'
});
ServiceConfiguration.configurations.remove({
  service: 'twitter'
});

if (process.env.ROOT_URL == 'http://192.168.0.102:3000/') {
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1050660914976763',
    secret: 'b83c538204cc2565103f15576496147d'
  });

  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'mpyZqnQosY4CgBeYnXlDnxxRR',
    secret: 'Xt1R3X2pGZHKaRjgU7mLU9KLMoib5pBfiVh0j8RSYIvVUOAFdE'
  });
}
else {
  ServiceConfiguration.configurations.insert({
    service: 'facebook',
    appId: '1050660914976763',
    secret: '94fe7e7a1672c4a8007e4c29b08615ce'
  });

  ServiceConfiguration.configurations.insert({
    service: 'twitter',
    consumerKey: 'PwkWb3Xz4DO26qfl6FXBmNOw4',
    secret: 'mIOZo1y6B2iEzGKmeE3zk7zV2g1CXmEe3fmlauD5Fj4odHK5Vg'
  });
}
