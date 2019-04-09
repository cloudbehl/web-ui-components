import { get } from 'lodash';

export const filterAlerts = alerts => alerts.filter(alert => get(alert, 'annotations.storage_type') === 'ceph');
