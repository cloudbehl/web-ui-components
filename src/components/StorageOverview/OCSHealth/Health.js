import React from 'react';
import PropTypes from 'prop-types';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import HealthBody from './HealthBody';
import { StorageOverviewContextGenericConsumer } from '../StorageOverviewContext';
import Alert from '../Alert/Alert';
import { InlineLoading } from '../../Loading';

export const OCSHealth = ({ data, loaded }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Health</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody className="kubevirt-ocs-health__body" isLoading={!loaded} LoadingComponent={InlineLoading}>
      <HealthBody data={data} />
    </DashboardCardBody>
    <hr />
    {data.healthy !== "0" ? <Alert /> : null}

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
  <StorageOverviewContextGenericConsumer Component={OCSHealth} dataPath="ocsHealthData" />
);

export default OCSHealthConnected;
