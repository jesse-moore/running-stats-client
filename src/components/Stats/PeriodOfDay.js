import React, { useEffect } from "react";
import * as d3 from "d3";

const PeriodOfDay = ({ data }) => {
  useEffect(() => {
    const chart = d3.select("#periodOfDayChart").selectAll("div");
    if (!chart.node()) {
      buildChart(data);
    }
    updateChart(data);
  }, [data]);

  return (
    <div className="w-64 p-5 relative bg-white shadow rounded text-center">
      <div id="periodOfDayChart" />
    </div>
  );
};

const buildChart = (data) => {
  const dataMap = createDataMap(data);
  const scale = createScale(data);
  const colorScale = createColorScale(data);

  const chart = d3.select("#periodOfDayChart");
  chart
    .selectAll()
    .data(dataMap)
    .enter()
    .append("div")
    .style("font-size", "1em")
    .style("color", "rgb(0,0,0)")
    .text((d) => `${d.text}: ${d.value}`)
    .transition()
    .style("font-size", (d) => `${scale(d.value)}em`)
    .style("color", (d) => colorScale(d.value))
    .duration(1000)
    .ease(d3.easeQuadOut);
};

const updateChart = (data) => {
  const dataMap = createDataMap(data);
  const scale = createScale(data);
  const colorScale = createColorScale(data);

  const chart = d3.select("#periodOfDayChart");
  chart
    .selectAll("div")
    .data(dataMap)
    .text((d) => `${d.text}: ${d.value}`)
    .transition()
    .style("font-size", (d) => `${scale(d.value)}em`)
    .style("color", (d) => colorScale(d.value))
    .duration(1000)
    .ease(d3.easeQuadOut);
};

const createScale = (data) => {
  return d3
    .scaleLinear()
    .domain([0, Math.max(...Object.values(data))])
    .range([1, 2]);
};

const createColorScale = (data) => {
  return d3
    .scaleLinear()
    .domain([0, Math.max(...Object.values(data))])
    .interpolate(d3.interpolateHcl)
    .range([d3.rgb(0, 0, 0), d3.rgb(18, 79, 121)]);
};

const createDataMap = (data) => {
  return Object.entries(data).map((d) => {
    const [key, value] = d;
    switch (key) {
      case "earlyMorning":
        return { text: "Early Morning", value };
      case "morning":
        return { text: "Morning", value };
      case "afternoon":
        return { text: "Afternoon", value };
      case "evening":
        return { text: "Evening", value };
      case "night":
        return { text: "Night", value };
      default:
        return { text: "", value: 0 };
    }
  });
};

export default PeriodOfDay;
