import React from 'react';
import PropTypes from 'prop-types';

import { DashboardCardBody, DashboardCardHeader, DashboardCardTitle } from '../../Dashboard/DashboardCard';
import AlertBody from './AlertBody';
import { InlineLoading } from '../../Loading';
import { StorageOverviewContextGenericConsumer } from '../StorageOverviewContext';

export const Alert = ({ data, loaded }) => (
  <div>
    <DashboardCardHeader>
      <DashboardCardTitle>Alerts</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody className="kubevirt-ocs-alert__body" isLoading={!loaded} LoadingComponent={InlineLoading}>
      <AlertBody data={data} />
    </DashboardCardBody>
  </div>
);

Alert.defaultProps = {
  loaded: false,
};

Alert.propTypes = {
  data: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
};

const AlertConnected = () => <StorageOverviewContextGenericConsumer Component={Alert} dataPath="ocsAlertData" />;

export default AlertConnected;
