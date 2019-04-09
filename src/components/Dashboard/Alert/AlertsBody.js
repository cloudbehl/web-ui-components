import React from 'react';
import PropTypes from 'prop-types';

import { AlertItem } from './AlertItem';

export const AlertsBody = ({ alerts }) => (
  <div className="kubevirt-alert__alerts-body">
    {alerts.map((alert, index) => (
      <AlertItem key={`alert-${index}`} alert={alert} />
    ))}
  </div>
);

AlertsBody.propTypes = {
  alerts: PropTypes.array.isRequired,
};
