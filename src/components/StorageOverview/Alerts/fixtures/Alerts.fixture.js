import { Alerts } from '../Alerts';
import {
  cephDiskInaccessibleAlert,
  cephDataRecoveryAlert,
  warningAlert,
} from '../../../Dashboard/Alert/fixtures/AlertItem.fixture';

export default {
  component: Alerts,
  props: {
    alertsResponse: [cephDiskInaccessibleAlert, cephDataRecoveryAlert, warningAlert],
  },
};
