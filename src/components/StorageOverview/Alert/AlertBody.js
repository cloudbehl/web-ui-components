import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';
import * as _ from 'lodash-es';

const AlertStates = {
  Warning: 'warning',
  Critical: 'Critical',
};

const AlertState = ({ state }) => {
  const klass = {
    [AlertStates.Warning]: 'exclamation-triangle',
    [AlertStates.Critical]: 'exclamation-circle',
  }[state];
  return klass ? (
    <React.Fragment>
      <div className={`ocs-alert__icon--${state}`}>
        <Icon type="fa" name={klass} />
        <span className="kubevirt-ocs-alert__row-state text-secondary">{_.startCase(state)}</span>
      </div>
    </React.Fragment>
  ) : null;
};

const filterAlerts = ({ alerts }) => {
  const alertList = _.get(alerts, 'alerts');
  const filteredAlertList = _.filter(alertList, function (alert) {
    const storageType = _.get(alert, 'annotations.storage_type');
    const storageSeverity = _.get(alert, 'labels.severity');
    return (storageType === 'ceph' && _.startCase(storageSeverity) in AlertStates);
  });
  return filteredAlertList;
};

const AlertBody = ({ data }) => {
  const ocsAlerts = filterAlerts(data);
  return (
    <div>
      {ocsAlerts.map((m, i) => (
        <React.Fragment key={i}>
          <div className="kubevirt-ocs-alert__row-status-item">
            <AlertState state={_.get(m, 'labels.severity')} />
            {/* <span className="kubevirt-ocs-alert__row-status-item-text">{_.get(m, 'annotations.message')}</span> */}
            <span className="kubevirt-ocs-alert__row-status-item-text">{_.get(m, 'annotations.description')}</span>
          </div>

        </React.Fragment>
      ))}
    </div>
  );
};

AlertBody.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AlertBody;
