import { rawData } from './dummyData';

export const processData = (groupByField, entityField) => {
  const groupCount = {};

  // Iterate over the first 15 entries of rawData
  rawData.slice(0, 60).forEach((entry) => {
    if (entry[groupByField] && entry[entityField]) {
      const group = entry[groupByField];
      const entity = entry[entityField];

      if (!groupCount[group]) {
        groupCount[group] = {};
      }

      if (!groupCount[group][entity]) {
        groupCount[group][entity] = 0;
      }

      groupCount[group][entity] += 1;
    }
  });

  const formattedData = Object.entries(groupCount).map(([group, entityCount]) => ({
    id: group,
    data: Object.entries(entityCount).map(([entity, count]) => ({
      x: entity,
      y: count,
    })),
  }));

  return formattedData;
};