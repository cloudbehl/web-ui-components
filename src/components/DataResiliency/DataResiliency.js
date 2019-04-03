import React from 'react';
import PropTypes from 'prop-types';

import { UtilizationBar } from 'patternfly-react';

import { DashboardCard, DashboardCardBody, DashboardCardHeader, DashboardCardTitle } from '../Dashboard/DashboardCard';
import HealthBody from '../ClusterOverview/Health/HealthBody';
import { ClusterOverviewContextGenericConsumer } from '../ClusterOverview/ClusterOverviewContext';
import { InlineLoading } from '../Loading';

const healthyData = {
  healthy: true,
  message: 'Your Data is Resilient',
};

export const DataResiliency = ({ data, loaded }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Data Resiliency</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody isLoading={!loaded} LoadingComponent={InlineLoading}>
      {data.progressPercentage === '100' ? (
        <HealthBody data={healthyData} />
      ) : (
        <UtilizationBar
          now={data.progressPercentage}
          description="Rebuilding in Progress"
          descriptionPlacementTop={true}
          label={`${data.progressPercentage}%`}
        />
      )}
    </DashboardCardBody>
  </DashboardCard>
);

DataResiliency.defaultProps = {
  loaded: true,
};

DataResiliency.propTypes = {
  data: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
  progressPercentage: PropTypes.number,
};

const DataResiliencyConnected = () => (
  <ClusterOverviewContextGenericConsumer Component={DataResiliency} dataPath="dataResiliencyData" />
);

export default DataResiliencyConnected;
