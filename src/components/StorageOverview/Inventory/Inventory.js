import React from 'react';
import PropTypes from 'prop-types';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
  DashboardCardTitleHelp,
} from '../../Dashboard/DashboardCard';
import { ClusterOverviewContext } from '../../ClusterOverview/ClusterOverviewContext';
import { mapNodesToProps, mapPodsToProps, mapPvcsToProps, mapPvsToProps, mapVmsToProps } from './utils';
import { InventoryRow } from '../../Dashboard/Inventory/InventoryRow';

const InventoryBody = ({ nodes, pods, vms, vmis, pvs, pvcs, migrations }) => (
  <React.Fragment>
    <InventoryRow title="Nodes" {...mapNodesToProps(nodes)} />
    <InventoryRow title="Pods" {...mapPodsToProps(pods)} />
    <InventoryRow title="PVs" {...mapPvsToProps(pvs)} />
    <InventoryRow title="PVCs" {...mapPvcsToProps(pvcs)} />
    <InventoryRow title="VMs" {...mapVmsToProps(vms, pods, migrations)} />
  </React.Fragment>
);

InventoryBody.defaultProps = {
  nodes: undefined,
  pods: undefined,
  vms: undefined,
  vmis: undefined,
  pvs: undefined,
  pvcs: undefined,
  migrations: undefined,
};

InventoryBody.propTypes = {
  nodes: PropTypes.array,
  pods: PropTypes.array,
  vms: PropTypes.array,
  vmis: PropTypes.array,
  pvs: PropTypes.array,
  pvcs: PropTypes.array,
  migrations: PropTypes.array,
};

export const Inventory = props => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Inventory</DashboardCardTitle>
      <DashboardCardTitleHelp>help for inventory</DashboardCardTitleHelp>
    </DashboardCardHeader>
    <DashboardCardBody>
      <InventoryBody {...props} />
    </DashboardCardBody>
  </DashboardCard>
);

Inventory.defaultProps = {
  ...InventoryBody.defaultProps,
};

Inventory.propTypes = {
  ...InventoryBody.propTypes,
};

export const InventoryConnected = () => (
  <ClusterOverviewContext.Consumer>{props => <Inventory {...props} />}</ClusterOverviewContext.Consumer>
);
