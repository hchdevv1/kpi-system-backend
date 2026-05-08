export const CODE_FORMAT = {
  MEASURE: { prefix: 'M', pad: 3 },
  //KPI: { prefix: 'K', pad: 4 },
  BENCHMARK: { prefix: 'B', pad: 3 },
  KPITOPIC: { prefix: 'KPI', pad: 4 },
  FREQUENCY: { prefix: 'F', pad: 2 },
  CONDITIONOPERATOR: { prefix: 'C', pad: 3 },
  UNIT: { prefix: 'U', pad: 3 },
  SERVICEUNITGROUP: { prefix: 'SG', pad: 3 },
  SERVICEUNIT: { prefix: 'SU', pad: 3 },
  KPISIMPLEGROUP: { prefix: 'KSG', pad: 3 },
  KPISIMPLE: { prefix: 'KS', pad: 3 },
  STRATEGYGROUP: { prefix: 'STG', pad: 3 },
  STRATEGY: { prefix: 'ST', pad: 3 },
  ORGANGROUP: { prefix: 'OGG', pad: 3 },
  ORGAN: { prefix: 'OG', pad: 3 },
} as const;

export type CodeType = keyof typeof CODE_FORMAT;