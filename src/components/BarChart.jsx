import React, { useState } from 'react';
import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { formatDataForBarChart } from '../data/formData';

const BarChart = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const data = formatDataForBarChart();
  const [tooltipData, setTooltipData] = useState(null);

  // Custom tooltip to display source IP
  const CustomTooltip = ({ id, value, indexValue }) => (
    tooltipData && tooltipData.indexValue === indexValue ? (
      <div
        style={{
          position: 'absolute',
          top: tooltipData.y - 50,
          left: tooltipData.x - 50,
          padding: '12px 16px',
          background: 'white',
          color: 'black',
          border: '1px solid #ccc',
        }}
      >
        <strong>Source IP:</strong> {indexValue}<br />
        <strong>Count:</strong> {value}
      </div>
    ) : null
  );

  return (
    <>
      <ResponsiveBar
        data={data}
        keys={['count']}
        indexBy="sourceIP"
        theme={{
          axis: {
            domain: {
              line: {
                stroke: colors.grey[100],
              },
            },
            legend: {
              text: {
                fill: colors.grey[100],
              },
            },
            ticks: {
              line: {
                stroke: colors.grey[100],
                strokeWidth: 1,
              },
              text: {
                fill: colors.grey[100],
              },
            },
          },
          legends: {
            text: {
              fill: colors.grey[100],
            },
          },
        }}
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        valueScale={{ type: "linear" }}
        indexScale={{ type: "band", round: true }}
        colors={{ scheme: "nivo" }}
        borderColor={{
          from: "color",
          modifiers: [["darker", "1.6"]],
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Source IP",
          legendPosition: "middle",
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: isDashboard ? undefined : "Alert Count",
          legendPosition: "middle",
          legendOffset: -40,
        }}
        enableLabel={false}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
          from: "color",
          modifiers: [["darker", 1.6]],
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "bottom-right",
            direction: "column",
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: "left-to-right",
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: "hover",
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        tooltip={({ id, value, indexValue, x, y }) => {
          setTooltipData({ id, value, indexValue, x, y });
        }}
        onMouseLeave={() => setTooltipData(null)}
        role="application"
        barAriaLabel={function (e) {
          return e.id + ": " + e.formattedValue + " in source IP: " + e.indexValue;
        }}
      />
      <CustomTooltip />
    </>
  );
};

export default BarChart;
