import { Inventory } from '../Inventory';
import { nodes, pvcs, pods, vms, vmis, migrations } from '../../../ClusterOverview/fixtures/ClusterOverview.fixture';

export default [
  {
    component: Inventory,
    props: {
      nodes,
      pvcs,
      pods,
      vms,
      vmis,
      migrations,
    },
  },
  {
    name: 'loading',
    component: Inventory,
    props: {},
  },
];