import { AlertsBody } from '../AlertsBody';
import { criticalAlert, unknownTypeAlert, warningAlert } from './AlertItem.fixture';

export default {
  component: AlertsBody,
  props: {
    alerts: [criticalAlert, unknownTypeAlert, warningAlert],
  },
};
