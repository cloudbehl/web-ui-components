import { get } from 'lodash';

import { getCapacityStats } from '../../../selectors';

const STATUS_RESULT_OK = 'ok';
const STATUS_RESULT_ERROR = 'error';

const result = {
  [STATUS_RESULT_OK]: 0,
  [STATUS_RESULT_ERROR]: 0,
  count: null,
};

const mapDiskToProps = disks => {
  const cephOsdUpCount = getCapacityStats(get(disks, 'cephOsdUp'));
  const cephOsdDownCount = getCapacityStats(get(disks, 'cephOsdDown'));

  if (cephOsdUpCount || cephOsdDownCount) {
    result[STATUS_RESULT_OK] = cephOsdUpCount;
    result[STATUS_RESULT_ERROR] = cephOsdDownCount;
    result.count = result[STATUS_RESULT_OK] + result[STATUS_RESULT_ERROR];
  }
  return result;
};

export default mapDiskToProps;
