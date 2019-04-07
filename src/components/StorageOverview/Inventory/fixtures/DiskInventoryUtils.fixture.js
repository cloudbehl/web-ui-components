import { disks } from '../../fixtures/StorageOverview.fixture';

import DiskInventoryUtils from '../DiskInventoryUtils';

export default [
  {
    component: DiskInventoryUtils,
    props: { disks },
  },
];
