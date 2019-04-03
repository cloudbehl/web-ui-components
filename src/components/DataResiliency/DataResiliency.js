import React from 'react';
import PropTypes from 'prop-types';

import { UtilizationBar } from 'patternfly-react';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../Dashboard/DashboardCard';
import HealthBody from '../ClusterOverview/Health/HealthBody';
import { ClusterOverviewContext } from '../ClusterOverview/ClusterOverviewContext';
import { InlineLoading } from '../Loading';


export const DataResiliency = ({ data, loaded, buildDone, progressPercentage }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Data Resiliency</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody isLoading={!loaded} LoadingComponent={InlineLoading}>
      {buildDone? <HealthBody data={data} /> : <UtilizationBar now={progressPercentage}  description="Rebuilding in Progress" descriptionPlacementTop = {true}  label = {`${progressPercentage}%`}/>}
    </DashboardCardBody>
  </DashboardCard>
);


DataResiliency.defaultProps = {
  loaded: true,
};

DataResiliency.propTypes = {
  data: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
  buildDone: PropTypes.bool,
  progressPercentage: PropTypes.number
};

export const DataResiliencyConnected = () => (
  <ClusterOverviewContext.Consumer>{props => <DataResiliency {...props} />}</ClusterOverviewContext.Consumer>
);


