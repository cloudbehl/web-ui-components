import { DataResiliency } from '../DataResiliency';

export const dataResiliencyData = {
  activePgRaw: {},
  totalPgRaw: {},
};

export default [
  {
    component: DataResiliency,
    props: { ...dataResiliencyData },
  },
];
