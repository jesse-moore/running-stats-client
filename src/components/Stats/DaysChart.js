import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
dayjs.extend(isoWeek);

const chartHeight = 140;
const chartWidth = 240;
const marginLeft = 30;
const marginRight = 10;
const marginTop = 10;
const marginBottom = 20;
const barWidth = 18;

function Chart({ data }) {
  const chart = useRef(null);
  const toolTip = useRef(null);
  const dataArray = Object.entries(data)
    .map((e) => {
      const [key, value] = e;
      switch (key) {
        case "mo":
          return { id: 1, value };
        case "tu":
          return { id: 2, value };
        case "we":
          return { id: 3, value };
        case "th":
          return { id: 4, value };
        case "fr":
          return { id: 5, value };
        case "sa":
          return { id: 6, value };
        case "su":
          return { id: 7, value };
        default:
          return { id: 8, value: 0 };
      }
    })
    .sort((a, b) => (a.id < b.id ? -1 : 1))
    .map((e) => e.value);

  useEffect(() => {
    const chartBars = d3.select(chart.current).selectAll("rect");
    if (!chartBars.node()) {
      buildChart(dataArray, chart);
    }
    updateChart(dataArray, chart, toolTip);
  }, [data]);

  return (
    <div className="w-max p-5 relative bg-white shadow rounded mr-4 mb-4 sm:mb-0">
      <div
        ref={toolTip}
        className="absolute bg-gray-600 text-white py-1 px-2 rounded opacity-0 text-sm"
      />
      <div ref={chart}></div>
    </div>
  );
}

function updateChart(data, chartRef, toolTipRef) {
  const tickStep = getTickStep(Math.max(...data));
  const yTicks = d3.range(0, tickStep * 4, tickStep);
  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...yTicks)])
    .range([0, chartHeight]);

  const toolTip = d3.select(toolTipRef.current);

  d3.select(chartRef.current)
    .selectAll("rect")
    .data(data)
    .on("mouseover", function (_event, d) {
      toolTip.style("opacity", 1);
      toolTip.html(d);
      d3.select(this).style("opacity", 0.5);
    })
    .on("mousemove", function (event) {
      toolTip
        .style("left", event.offsetX + 15 + "px")
        .style("top", event.offsetY + 15 + "px");
    })
    .on("mouseleave", function () {
      toolTip.html("");
      toolTip.style("opacity", 0);
      d3.select(this).style("opacity", 1);
    })
    .transition()
    .attr("height", function (d) {
      return d === 0 ? 1 : yScale(d);
    })
    .attr("y", function (d) {
      return d === 0 ? chartHeight - 1 : chartHeight - yScale(d);
    })
    .duration(1000)
    .ease(d3.easeQuadOut);

  d3.select("#day-chart-yAxis")
    .selectAll("text")
    .data(yTicks)
    .text((d) => d);
}

function buildChart(data, chartRef) {
  const tickStep = getTickStep(Math.max(...data));
  const yTicks = d3.range(0, tickStep * 4, tickStep);

  const yScale = d3
    .scaleLinear()
    .domain([0, Math.max(...yTicks)])
    .range([0, chartHeight]);

  const xScale = d3
    .scaleLinear()
    .domain([0, 6])
    .range([1, chartWidth - barWidth]);

  const chart = d3
    .select(chartRef.current)
    .append("svg")
    .attr("width", chartWidth + marginLeft + marginRight)
    .attr("height", chartHeight + marginBottom + marginTop)
    .attr("font-size", "0.75em");

  chart
    .append("g")
    .attr("transform", `translate(${marginLeft},${marginTop})`)
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("fill", "rgb(18, 79, 121)")
    .attr("y", () => chartHeight - yScale(0))
    .attr("x", (_d, i) => xScale(i))
    .attr("height", () => yScale(0))
    .attr("width", barWidth)
    .transition()
    .attr("height", function (d) {
      return d === 0 ? 1 : yScale(d);
    })
    .attr("y", function (d) {
      return d === 0 ? chartHeight - 1 : chartHeight - yScale(d);
    })
    .duration(1000)
    .ease(d3.easeQuadOut);

  const yAxis = makeYAxis({ yTicks, yScale });
  const xAxis = makeXAxis({ xScale, data });
  chart.append(() => yAxis);
  chart.append(() => xAxis);
}

function makeYAxis({ yTicks, yScale }) {
  const axisGroup = d3
    .create("svg:g")
    .attr("transform", `translate(${marginLeft},${marginTop})`)
    .attr("id", "day-chart-yAxis");

  axisGroup
    .append("line")
    .style("stroke-width", ".5")
    .style("stroke", "black")
    .attr("x1", 0)
    .attr("y1", 0)
    .attr("x2", 0)
    .attr("y2", chartHeight);

  axisGroup
    .selectAll("g")
    .data(yTicks)
    .enter()
    .append("line")
    .style("stroke-width", ".5")
    .style("stroke", "black")
    .attr("x1", -5)
    .attr("y1", (d) => chartHeight - yScale(d))
    .attr("x2", 0)
    .attr("y2", (d) => chartHeight - yScale(d));

  axisGroup
    .selectAll("g")
    .data(yTicks)
    .enter()
    .append("text")
    .attr("x", -6)
    .attr("y", (d) => chartHeight - yScale(d) + 5)
    .style("text-anchor", "end")
    .text((d) => d);

  return axisGroup.node();
}

function makeXAxis({ xScale, data }) {
  const axisGroup = d3
    .create("svg:g")
    .attr("transform", `translate(${marginLeft},${marginTop})`);

  axisGroup
    .append("line")
    .style("stroke-width", ".5")
    .style("stroke", "black")
    .attr("x1", 0)
    .attr("y1", chartHeight)
    .attr("x2", chartWidth)
    .attr("y2", chartHeight);

  axisGroup
    .selectAll("g")
    .data(data)
    .enter()
    .append("text")
    .attr("x", (_d, i) => xScale(i) + 9)
    .attr("y", chartHeight)
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text((_d, i) =>
      dayjs()
        .isoWeekday(i + 1)
        .format("ddd")
    );

  return axisGroup.node();
}

function getTickStep(num) {
  const tick = num === 0 ? 1 : Math.ceil(num / 3);
  const tickBase = Math.pow(10, Math.floor(Math.log10(tick)));
  return Math.ceil(tick / tickBase) * tickBase;
}

export default Chart;
