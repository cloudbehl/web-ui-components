import { OCSHealth } from '../Health';

export const healthData = {
  data: {
    healthy: false,
    message: 'Error message',
  },
  loaded: true,
};

export default [
  {
    component: OCSHealth,
    props: { ...healthData },
  },
];
