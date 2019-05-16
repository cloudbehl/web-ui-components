import React from 'react';
import PropTypes from 'prop-types';

import { Row, Col } from 'patternfly-react';
import { ChartAxis } from '@patternfly/react-charts';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import { StorageOverviewContext } from '../StorageOverviewContext';
import { InlineLoading } from '../../Loading';
import { UtilizationBody } from '../../Dashboard/Utilization/UtilizationBody';
import { UtilizationItem } from '../../Dashboard/Utilization/UtilizationItem';
import { getUtilizationVectorStats, getUtilizationVectorTime } from '../../../selectors';
import { formatBytes, formatToShortTime } from '../../../utils';

const getUtilizationData = data => {
  let stats = null;
  let maxValueConverted;

  const statsRaw = getUtilizationVectorStats(data);
  if (statsRaw) {
    const maxValue = Math.max(0, ...statsRaw);
    maxValueConverted = formatBytes(maxValue);
    stats = statsRaw.map(bytes => formatBytes(bytes, maxValueConverted.unit, 1).value);
  } else {
    maxValueConverted = formatBytes(0);
    stats = null;
  }

  const timeRaw = getUtilizationVectorTime(data);

  return {
    unit: `${maxValueConverted.unit}/s`,
    values: stats,
    timestamps: timeRaw,
    maxValue: Number(maxValueConverted.value.toFixed(1)),
  };
};

export class Utilization extends React.PureComponent {
  render() {
    const {
      iopsUtilization,
      latencyUtilization,
      throughputUtilization,
      recoveryRateUtilization,
      LoadingComponent,
    } = this.props;
    const throughputData = getUtilizationData(throughputUtilization);
    const recoveryRateData = getUtilizationData(recoveryRateUtilization);

    const iopsStats = getUtilizationVectorStats(iopsUtilization);
    let iopsStatsMax = 0;
    if (iopsStats) {
      iopsStatsMax = Math.ceil(Math.max(0, ...iopsStats));
    }
    const latencyStats = getUtilizationVectorStats(latencyUtilization);
    let latencyStatsMax = 0;
    if (latencyStats) {
      latencyStatsMax = Math.max(0, ...latencyStats);
    }
    const { timestamps } = throughputData;

    return (
      <DashboardCard>
        <DashboardCardHeader>
          <DashboardCardTitle>Utilization</DashboardCardTitle>
        </DashboardCardHeader>
        <DashboardCardBody>
          <Row>
            <Col className="kubevirt-utilization__time-duration kubevirt-utilization__time-duration--left">Time </Col>
            <Col className="kubevirt-utilization__time-duration kubevirt-utilization__time-duration--right">
              6 hour average
            </Col>
          </Row>
          <ChartAxis
            scale={{ x: 'time' }}
            tickValues={timestamps}
            tickFormat={x => formatToShortTime(x)}
            orientation="top"
            height={30}
            padding={{ top: 25, bottom: 0, left: 43, right: 20 }}
          />
          <UtilizationBody>
            <UtilizationItem
              unit={throughputData.unit}
              id="throughput"
              title="Throughput"
              data={throughputData.values}
              maxY={throughputData.maxValue}
              decimalPoints={1}
              LoadingComponent={LoadingComponent}
              isLoading={!throughputUtilization}
            />
            <UtilizationItem
              unit="IOPS"
              id="iops"
              title="IOPS"
              data={iopsStats}
              maxY={iopsStatsMax}
              decimalPoints={0}
              LoadingComponent={LoadingComponent}
              isLoading={!iopsUtilization}
            />
            <UtilizationItem
              unit="ms"
              id="latency"
              title="Latency"
              data={latencyStats}
              maxY={latencyStatsMax}
              decimalPoints={1}
              LoadingComponent={LoadingComponent}
              isLoading={!latencyUtilization}
            />
            <UtilizationItem
              unit={recoveryRateData.unit}
              id="recoveryRate"
              title="Recovery rate"
              data={recoveryRateData.values}
              maxY={recoveryRateData.maxValue}
              decimalPoints={1}
              LoadingComponent={LoadingComponent}
              isLoading={!recoveryRateUtilization}
            />
          </UtilizationBody>
        </DashboardCardBody>
      </DashboardCard>
    );
  }
}

Utilization.defaultProps = {
  iopsUtilization: null,
  latencyUtilization: null,
  throughputUtilization: null,
  recoveryRateUtilization: null,
  LoadingComponent: InlineLoading,
};

Utilization.propTypes = {
  iopsUtilization: PropTypes.object,
  latencyUtilization: PropTypes.object,
  throughputUtilization: PropTypes.object,
  recoveryRateUtilization: PropTypes.object,
  LoadingComponent: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
};

export const UtilizationConnected = () => (
  <StorageOverviewContext.Consumer>
    {props => (
      <Utilization
        iopsUtilization={props.iopsUtilization}
        latencyUtilization={props.latencyUtilization}
        throughputUtilization={props.throughputUtilization}
        recoveryRateUtilization={props.recoveryRateUtilization}
        LoadingComponent={props.LoadingComponent}
      />
    )}
  </StorageOverviewContext.Consumer>
);

UtilizationConnected.defaultProps = {
  ...Utilization.defaultProps,
};

UtilizationConnected.propTypes = {
  ...Utilization.propTypes,
};
