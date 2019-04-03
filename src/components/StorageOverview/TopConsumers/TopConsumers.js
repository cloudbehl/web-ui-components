import React from 'react';
import { LineChart, Row, Col } from 'patternfly-react';
import PropTypes from 'prop-types';

import {
  DashboardCard,
  DashboardCardBody,
  DashboardCardHeader,
  DashboardCardTitle,
} from '../../Dashboard/DashboardCard';
import { ClusterOverviewContextGenericConsumer } from '../../ClusterOverview/ClusterOverviewContext';

const StorageTopConsumersBody = stats => (
  <div>
    <Row>
      <Col lg={7} md={7} sm={7} xs={7}>
        <LineChart
          id="line-chart"
          data={{
            x: 'x',
            columns: [
              ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05', '2013-01-06'],
              ['data1', 30, 200, 100, 400, 150, 250],
              ['data2', 130, 340, 200, 500, 250, 350],
            ],
            unload: true,
            names: {
              data1: 'Project 1',
              data2: 'Project 2',
            },
            type: 'line',
          }}
          axis={{
            x: {
              type: 'timeseries',
              tick: {
                format: '%Y-%m-%d',
              },
            },
            y: {
              label: {
                text: 'Used Capacity',
                position: 'outer-top',
              },
            },
          }}
          unloadBeforeLoad
          size={{ width: 700, height: 250 }}
        />
        `
      </Col>
    </Row>
  </div>
);

StorageTopConsumersBody.propTypes = {
  stats: PropTypes.object.isRequired,
};

export const StorageTopConsumers = ({ stats, loaded }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Top Consumers</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody isLoading={!loaded}>
      <StorageTopConsumersBody stats={stats} />
    </DashboardCardBody>
  </DashboardCard>
);

StorageTopConsumers.defaultProps = {
  loaded: false,
};

StorageTopConsumers.propTypes = {
  stats: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
};

const StorageTopConsumersConnected = () => (
  <ClusterOverviewContextGenericConsumer Component={StorageTopConsumers} dataPath="StorageTopConsumersStats" />
);

export default StorageTopConsumersConnected;
