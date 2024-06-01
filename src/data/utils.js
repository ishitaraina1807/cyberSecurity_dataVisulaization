// utils.js
export const countAlertsPerSourceIP = (data) => {
    const alertCounts = {};
  
    data.forEach((entry) => {
      if (entry.event_type === 'alert') {
        const src_ip = entry.src_ip;
        if (!alertCounts[src_ip]) {
          alertCounts[src_ip] = 0;
        }
        alertCounts[src_ip]++;
      }
    });
  
    return alertCounts;
  };
  