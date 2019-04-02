import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'patternfly-react';

const healtyIcon = (
  <div className="kubevirt-health__icon--ok">
    <Icon type="fa" name="check-circle" />
  </div>
);

const errorIcon = (
  <div className="kubevirt-health__icon--error">
    <Icon type="fa" name="exclamation-circle" />
  </div>
);

const TaskBody = ({ data }) => <React.Fragment>{data.healthy ? healtyIcon : errorIcon}</React.Fragment>;

TaskBody.propTypes = {
  data: PropTypes.object.isRequired,
};

export default TaskBody;
