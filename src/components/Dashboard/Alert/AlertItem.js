import React from 'react';
import PropTypes from 'prop-types';
import { get } from 'lodash';
import { Col, Row, Icon } from 'patternfly-react';

const getSeverityIcon = severity => {
  switch (severity) {
    case 'critical':
      return <Icon type="fa" name="exclamation-circle" className="kubevirt-alert__icon-critical" />;
    case 'warning':
    default:
      return <Icon type="fa" name="exclamation-triangle" className="kubevirt-alert__icon-warning" />;
  }
};

export const AlertItem = ({ alert }) => (
  <Row className="kubevirt-alert__item">
    <Col lg={1} md={1} sm={1} xs={1}>
      {getSeverityIcon(get(alert, 'labels.severity'))}
    </Col>
    <Col lg={11} md={11} sm={11} xs={11}>
      {get(alert, 'annotations.message')}
    </Col>
  </Row>
);

AlertItem.propTypes = {
  alert: PropTypes.object.isRequired,
};
