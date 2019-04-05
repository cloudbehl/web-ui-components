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

const TopConsumersBody = ({ stats }) => (
  <div>
    <Row>
      <Col lg={7} md={7} sm={7} xs={7}>
        <LineChart
          id="line-chart"
          data={{
            x: 'x',
            columns: stats.columns,
            names: {
              data1: 'Project 1',
              data2: 'Project 2',
              data3: 'Project 3',
            },
            type: 'line',
          }}
          axis={{
            y: {
              label: {
                text: 'Used Capacity',
                position: 'outer-top',
              }
            }
          }}
          size={{ width: 700, height: 250 }}
        />
      </Col>
    </Row>
  </div>
);

TopConsumersBody.propTypes = {
  stats: PropTypes.object.isRequired,
};

export const TopConsumers = ({ stats, loaded }) => (
  <DashboardCard>
    <DashboardCardHeader>
      <DashboardCardTitle>Top Consumers</DashboardCardTitle>
    </DashboardCardHeader>
    <DashboardCardBody isLoading={!loaded}>
      <TopConsumersBody stats={stats} />
    </DashboardCardBody>
  </DashboardCard>
);

TopConsumers.defaultProps = {
  loaded: false,
};

TopConsumers.propTypes = {
  stats: PropTypes.object.isRequired,
  loaded: PropTypes.bool,
};

const TopConsumersConnected = () => (
  <ClusterOverviewContextGenericConsumer Component={TopConsumers} dataPath="TopConsumersStats" />
);

export default TopConsumersConnected;