import { StorageDetails } from '../Details';

export const clusterDetailsData = {
  openshiftClusterVersions: [
    {
      metric: {
        gitVersion: 'v4.0.0',
      },
    },
  ],
  infrastructure: {
    status: {
      platform: 'AWS',
      apiServerURL: 'https://api.clusterName.clusterDoman',
    },
  },
};

export default [
  {
    component: StorageDetails,
    props: clusterDetailsData,
  },
  {
    component: StorageDetails,
    name: 'Loading cluster details',
  },
];
