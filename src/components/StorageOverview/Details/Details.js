import React from 'react';
import PropTypes from 'prop-types';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import { StorageOverviewContext } from '../StorageOverviewContext';
import { InlineLoading } from '../../Loading';
import { DetailItem } from '../../Dashboard/Details/DetailItem';
import { DetailsBody } from '../../Dashboard/Details/DetailsBody';
import { getName } from '../../../selectors';

export const StorageDetails = ({ LoadingComponent, cephCluster }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Details</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody>
      <DetailsBody>
        <DetailItem
          key="name"
          title="Name"
          value={getClusterName(cephCluster)}
          isLoading={!cephCluster}
          LoadingComponent={LoadingComponent}
        />
        <DetailItem
          key="provider"
          title="Provider"
          value="Ceph"
          isLoading={false}
          LoadingComponent={LoadingComponent}
        />
        <DetailItem
          key="ocs"
          title="OCS version"
          value="4.1" // this will be hardcoded for the demo
          isLoading={false}
          LoadingComponent={LoadingComponent}
        />
      </DetailsBody>
    </DashboardCardBody>
  </DashboardCard>
);

const getClusterName = cephCluster => {
  const clusterName = cephCluster && getName(cephCluster);
  return clusterName;
};

StorageDetails.defaultProps = {
  cephCluster: null,
  LoadingComponent: InlineLoading,
};

StorageDetails.propTypes = {
  cephCluster: PropTypes.object,
  LoadingComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export const StorageDetailsConnected = () => (
  <StorageOverviewContext.Consumer>{props => <StorageDetails {...props} />}</StorageOverviewContext.Consumer>
);
