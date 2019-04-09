import React from 'react';
import PropTypes from 'prop-types';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import { StorageOverviewContext } from '../StorageOverviewContext';
import { AlertsBody } from '../../Dashboard/Alert/AlertsBody';
import { filterAlerts } from './utils';

export const Alerts = ({ alertsResponse }) => {
  if (!Array.isArray(alertsResponse)) {
    return false;
  }

  const alerts = filterAlerts(alertsResponse);

  return alerts.length > 0 ? (
    <DashboardCard>
      <DashboardCardHeader>
        <DashboardCardTitle>Alerts</DashboardCardTitle>
      </DashboardCardHeader>
      <DashboardCardBody>
        <AlertsBody alerts={alerts} />
      </DashboardCardBody>
    </DashboardCard>
  ) : (
    false
  );
};

Alerts.propTypes = {
  alertsResponse: PropTypes.array,
};

Alerts.defaultProps = {
  alertsResponse: null,
};

export const AlertsConnected = () => (
  <StorageOverviewContext.Consumer>
    {props => <Alerts alertsResponse={props.alertsResponse} />}
  </StorageOverviewContext.Consumer>
);

AlertsConnected.propTypes = {
  ...Alerts.propTypes,
};

AlertsConnected.defaultProps = {
  ...Alerts.defaultProps,
};
