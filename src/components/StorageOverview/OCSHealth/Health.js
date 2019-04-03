import React from 'react';
import PropTypes from 'prop-types';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import HealthBody from './HealthBody';
// import TaskBody from './TaskBody';
import { ClusterOverviewContextGenericConsumer } from '../../ClusterOverview/ClusterOverviewContext';
import { InlineLoading } from '../../Loading';

export const OCSHealth = ({ data, loaded }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Health</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody
      className="kubevirt-ocshealth__row-status-item"
      isLoading={!loaded}
      LoadingComponent={InlineLoading}
    >
      <HealthBody data={data} />
    </DashboardCardBody>
  </DashboardCard>
);

OCSHealth.defaultProps = {
  loaded: false,
};

OCSHealth.propTypes = {
  data: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
};

const OCSHealthConnected = () => (
  <ClusterOverviewContextGenericConsumer Component={OCSHealth} dataPath="ocsHealthData" />
);

export default OCSHealthConnected;
