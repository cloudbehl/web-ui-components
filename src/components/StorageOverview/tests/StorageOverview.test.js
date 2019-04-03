import React from 'react';
import { render } from 'enzyme';

import { StorageOverview } from '../StorageOverview';
import { default as StorageOverviewFixtures } from '../fixtures/StorageOverview.fixture';

const testStorageOverviewOverview = () => <StorageOverview {...StorageOverviewFixtures[0].props} />;

describe('<StorageOverview />', () => {
  it('renders correctly', () => {
    const component = render(testStorageOverviewOverview());
    expect(component).toMatchSnapshot();
  });
});
