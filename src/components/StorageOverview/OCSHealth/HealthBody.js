import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

const healtyIcon = (
  <div className="kubevirt-ocs-health__icon--ok">
    <Icon type="fa" size="2x" name="check-circle" />
  </div>
);

const errorIcon = (
  <div className="kubevirt-ocs-health__icon--error">
    <Icon type="fa" size="2x" name="exclamation-circle" />
  </div>
);

const warningIcon = (
  <div className="kubevirt-ocs-health__icon--warning">
    <Icon type="fa" size="2x" name="exclamation-triangle" />
  </div>
);

const OCSHealthMap = {
  '0': {
    icon: healtyIcon,
    message: 'OCS is Healthy',
  },
  '1': {
    icon: warningIcon,
    message: 'OCS is Degraded',
  },
  '2': {
    icon: errorIcon,
    message: ' OCS is in Error State',
  },
};

const HealthBody = ({ data }) => (
  <React.Fragment>
    {OCSHealthMap[data.healthy].icon}
    <span className="kubevirt-ocs-health__row-status-item-text">{OCSHealthMap[data.healthy].message}</span>
  </React.Fragment>
);

HealthBody.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HealthBody;
