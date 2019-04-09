import React from 'react';
import PropTypes from 'prop-types';
import { Icon, UtilizationBar } from 'patternfly-react';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import { StorageOverviewContext } from '../StorageOverviewContext';
import { InlineLoading } from '../../Loading';
import { getDataResiliencyData } from '../../../selectors/prometheus/selectors';

const DataResiliencyStatusBody = ({ status }) =>
  status ? (
    <React.Fragment>
      <div className="kubevirt-data-resiliency__status-title--ok">Your Data Is Resilient</div>
      <div className="kubevirt-data-resiliency__icon--ok">
        <Icon type="fa" name="check-circle" size="3x" />
      </div>
    </React.Fragment>
  ) : (
    <React.Fragment>
      <div className="kubevirt-data-resiliency__icon--error">
        <Icon type="fa" name="exclamation-triangle" size="1x" />
      </div>
      <div className="kubevirt-data-resiliency__status-title--error">Some Error Occurred</div>
    </React.Fragment>
  );

const DataResiliencyBuildBody = ({ progressPercentage }) => (
  <React.Fragment>
    <div className="kubevirt-data-resiliency__title">Rebuilding data resiliency</div>
    <UtilizationBar
      now={progressPercentage}
      description="Rebuilding in Progress"
      descriptionPlacementTop
      label={`${progressPercentage}%`}
    />
  </React.Fragment>
);

export const DataResiliency = ({ activePgRaw, totalPgRaw }) => {
  const activePg = getDataResiliencyData(activePgRaw);
  const totalPg = getDataResiliencyData(totalPgRaw);
  const progressPercentage = (activePg / totalPg) * 100;

  return (
    <DashboardCard>
      <DashboardCardHeader>
        <DashboardCardTitle>Data Resiliency</DashboardCardTitle>
      </DashboardCardHeader>
      <DashboardCardBody
        className="kubevirt-data-resiliency__dashboard-body"
        isLoading={!(activePgRaw && totalPgRaw)}
        LoadingComponent={InlineLoading}
      >
        {progressPercentage === 100 || !(activePg && totalPg) ? (
          <DataResiliencyStatusBody status={activePg && totalPg} />
        ) : (
          <DataResiliencyBuildBody progressPercentage={progressPercentage} />
        )}
      </DashboardCardBody>
    </DashboardCard>
  );
};

DataResiliency.propTypes = {
  activePgRaw: PropTypes.object.isRequired,
  totalPgRaw: PropTypes.object.isRequired,
};

DataResiliencyBuildBody.propTypes = {
  progressPercentage: PropTypes.number.isRequired,
};

DataResiliencyStatusBody.propTypes = {
  status: PropTypes.bool.isRequired,
};

export const DataResiliencyConnected = () => (
  <StorageOverviewContext.Consumer>{props => <DataResiliency {...props} />}</StorageOverviewContext.Consumer>
);
