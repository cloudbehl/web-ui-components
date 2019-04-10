import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Icon, UtilizationBar } from 'patternfly-react';
import { isNumber } from 'lodash';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import { StorageOverviewContext } from '../StorageOverviewContext';
import { InlineLoading } from '../../Loading';
import { getCapacityStats } from '../../../selectors/prometheus/selectors';

const DataResiliencyStatusBody = ({ isStatusSuccessful }) =>
  isStatusSuccessful ? (
    <Fragment>
      <div className="kubevirt-data-resiliency__status-title-ok">Your Data Is Resilient</div>
      <div className="kubevirt-data-resiliency__icon-ok">
        <Icon type="fa" name="check-circle" size="2x" />
      </div>
    </Fragment>
  ) : (
    <Fragment>
      <div className="kubevirt-data-resiliency__icon-error">
        <Icon type="fa" name="exclamation-triangle" size="2x" />
      </div>
      <div className="kubevirt-data-resiliency__status-title-error">Some Error Occurred</div>
    </Fragment>
  );

const DataResiliencyBuildBody = ({ progressPercentage }) => (
  <Fragment>
    <div className="kubevirt-data-resiliency__title">Rebuilding data resiliency</div>
    <UtilizationBar
      className="kubevirt-data-resiliency__utilization-bar"
      now={progressPercentage}
      description="Rebuilding in Progress"
      descriptionPlacementTop
      label={`${progressPercentage}%`}
    />
  </Fragment>
);

export const DataResiliency = ({ stalePgRaw, totalPgRaw, cleanPgRaw, LoadingComponent }) => {
  const stalePg = getCapacityStats(stalePgRaw);
  const totalPg = getCapacityStats(totalPgRaw);
  const cleanPg = getCapacityStats(cleanPgRaw);
  let progressPercentage = 0;
  const checkNumber = isNumber(stalePg) && isNumber(totalPg) && isNumber(cleanPg);
  if (checkNumber) {
    progressPercentage = (((cleanPg - stalePg) / totalPg) * 100).toFixed(1);
  }

  return (
    <DashboardCard>
      <DashboardCardHeader>
        <DashboardCardTitle>Data Resiliency</DashboardCardTitle>
      </DashboardCardHeader>
      <DashboardCardBody
        className="kubevirt-data-resiliency__dashboard-body"
        isLoading={!(stalePgRaw && totalPgRaw && cleanPgRaw)}
        LoadingComponent={LoadingComponent}
      >
        {stalePg === 0 ? (
          <DataResiliencyStatusBody isStatusSuccessful={checkNumber && stalePg === 0} />
        ) : (
          <DataResiliencyBuildBody progressPercentage={parseInt(progressPercentage)} />
        )}
      </DashboardCardBody>
    </DashboardCard>
  );
};

DataResiliency.defaultProps = {
  stalePgRaw: null,
  totalPgRaw: null,
  cleanPgRaw: null,
  LoadingComponent: InlineLoading,
};

DataResiliencyStatusBody.defaultProps = {
  isStatusSuccessful: null,
};

DataResiliencyBuildBody.defaultProps = {
  progressPercentage: null,
};

DataResiliency.propTypes = {
  stalePgRaw: PropTypes.object,
  totalPgRaw: PropTypes.object,
  cleanPgRaw: PropTypes.object,
  LoadingComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

DataResiliencyBuildBody.propTypes = {
  progressPercentage: PropTypes.number,
};

DataResiliencyStatusBody.propTypes = {
  status: PropTypes.bool,
};

export const DataResiliencyConnected = () => (
  <StorageOverviewContext.Consumer>{props => <DataResiliency {...props} />}</StorageOverviewContext.Consumer>
);
