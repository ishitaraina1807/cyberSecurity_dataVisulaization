// formatData.js
import { rawData } from '../data/dummyData';
import { countAlertsPerSourceIP } from './utils';

export const formatDataForBarChart = (limit = 8) => {
  const alertCounts = countAlertsPerSourceIP(rawData);
  const formattedData = Object.keys(alertCounts).map((src_ip) => ({
    sourceIP: src_ip,
    count: alertCounts[src_ip],
  }));

  // Sort the data by alert count in descending order and take the top 'limit' entries
  const sortedData = formattedData.sort((a, b) => b.count - a.count).slice(0, limit);

  return sortedData;
};
