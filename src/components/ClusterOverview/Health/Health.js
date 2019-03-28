import React from 'react';
import PropTypes from 'prop-types';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import HealthBody from './HealthBody';
import { InlineLoading } from '../../Loading';
import { ClusterOverviewContextGenericConsumer } from '../ClusterOverviewContext';

export const Health = ({ data, loaded, heading, LoadingComponent }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>{heading}</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody className="kubevirt-health__body">
      {loaded ? <HealthBody data={data} /> : <LoadingComponent />}
    </DashboardCardBody>
  </DashboardCard>
);

Health.defaultProps = {
  loaded: false,
  heading: 'Health',
  LoadingComponent: InlineLoading,
};

Health.propTypes = {
  data: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
  heading: PropTypes.string,
  LoadingComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

const HealthConnected = () => <ClusterOverviewContextGenericConsumer Component={Health} dataPath="healthData" />;

export default HealthConnected;
