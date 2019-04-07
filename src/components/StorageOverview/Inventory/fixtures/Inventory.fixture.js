import { Inventory } from '../Inventory';
import { nodes, pvcs, pvs, disks } from '../../fixtures/StorageOverview.fixture';

export default [
  {
    component: Inventory,
    props: {
      nodes,
      pvcs,
      pvs,
      disks,
    },
  },
  {
    name: 'loading',
    component: Inventory,
    props: {},
  },
];
