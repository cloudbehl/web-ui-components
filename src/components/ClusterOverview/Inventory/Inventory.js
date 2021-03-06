import React from 'react';
import PropTypes from 'prop-types';
import { Col, Icon } from 'patternfly-react';

import { getNodeErrorStatuses } from './nodeStatus';

const InventoryItemStatus = ({ item }) => {
  let ok = true;
  if (item.kind === 'Node') {
    ok = !item.data.some(i => getNodeErrorStatuses(i).length > 0);
  }
  return ok ? (
    <div className="kubevirt-inventory__item-status">
      <Icon type="fa" name="check-circle" size="2x" className="kubevirt-inventory__item-status-icon" />
      <span>{item.data.length}</span>
    </div>
  ) : (
    <div>
      <span className="glyphicon glyphicon-remove-circle" />
    </div>
  );
};

InventoryItemStatus.propTypes = {
  item: PropTypes.object.isRequired,
};

export const Inventory = ({ inventory }) =>
  Object.keys(inventory).map(key => {
    const item = inventory[key];
    return (
      <div key={inventory.key} className="kubevirt-inventory__item">
        <Col lg={9} md={9} sm={9} xs={9}>
          {item.data.length} {item.title}
        </Col>
        <Col lg={3} md={3} sm={3} xs={3}>
          <InventoryItemStatus item={item} />
        </Col>
      </div>
    );
  });

Inventory.title = 'Cluster inventory';
Inventory.help = 'help for inventory';
Inventory.propTypes = {
  inventory: PropTypes.object.isRequired,
};
