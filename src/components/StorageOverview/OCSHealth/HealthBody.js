import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

const healtyIcon = (
  <div className="storage-health__icon--ok">
    <Icon type="fa" name="check-circle" />
  </div>
);

const errorIcon = (
  <div className="storage-health__icon--error">
    <Icon type="fa" name="exclamation-circle" />
  </div>
);

const warningIcon = (
  <div className="storage-health__icon--warning">
    <Icon type="fa" name="exclamation-triangle" />
  </div>
);

const OCSHealthMap = {
  '0': {
    icon: healtyIcon,
    message: 'OCS is Healthy',
  },
  '1': {
    icon: warningIcon,
    message: 'OCS is in Warning',
  },
  '2': {
    icon: errorIcon,
    message: 'OCS is in Error',
  },
};

const HealthBody = ({ data }) => (
  <React.Fragment>
    {OCSHealthMap[data.healthy].icon}
    <span className="storage-ocshealth__row-status-item-text">{OCSHealthMap[data.healthy].message}</span>
  </React.Fragment>
);

HealthBody.propTypes = {
  data: PropTypes.object.isRequired,
};

export default HealthBody;
