import { AlertItem } from '../AlertItem';

export const warningAlert = {
  annotations: {
    message: '20% of the metrics targets are down.',
  },
  labels: {
    alertname: 'TargetDown',
    severity: 'warning',
  },
};

export const watchDogAlert = {
  annotations: {
    message: 'This is an alert meant to ensure that the entire alerting pipeline is functional',
  },
  labels: {
    alertname: 'Watchdog',
    severity: 'none',
  },
};

export const criticalAlert = {
  annotations: {
    message: 'Critical alert',
  },
  labels: {
    alertname: 'fooName',
    severity: 'critical',
  },
};

export const unknownTypeAlert = {
  annotations: {
    message: 'unknown type alert',
  },
  labels: {
    alertname: 'fooName',
    severity: 'unknown',
  },
};

export const cephDiskInaccessibleAlert = {
  annotations: {
    description: 'Disk inaccessible on host ip-10-0-154-62.ec2.internal (device xvda)',
    message: 'Disk is inaccessible',
    storage_type: 'ceph',
  },
  labels: {
    alertname: 'CephOSDDiskUnavailable',
    severity: 'critical',
  },
};

export const cephDataRecoveryAlert = {
  annotations: {
    description: 'Data recovery has been active for over 2h. Contact Support',
    message: 'Data recovery is slow',
    storage_type: 'ceph',
  },
  labels: {
    alertname: 'CephDataRecoveryTakingTooLong',
    severity: 'warning',
  },
};

export default [
  {
    component: AlertItem,
    name: 'Warning alert item',
    props: {
      alert: warningAlert,
    },
  },
  {
    component: AlertItem,
    name: 'Critical alert item',
    props: {
      alert: criticalAlert,
    },
  },
  {
    component: AlertItem,
    name: 'Unknown alert item',
    props: {
      alert: unknownTypeAlert,
    },
  },
];
