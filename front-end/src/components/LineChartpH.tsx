import React, { useEffect, useContext } from "react";
import * as d3 from "d3";
import styles from "../styles/components/LineChart.module.css";
import { DeviceDataContext } from '../contexts/DeviceDataContext';

interface climateWebData {
  year: number | Date;
  data: number;
}

interface equipmentData {
  id: number;
  deviceEUI: string;
  ph: number;
  turbidity: number;
  date: string | Date;
}

interface lineChartProps {
  width: number;
  height: number;
}

export function LineChartpH(props: lineChartProps) {
    const { equipmentData } = useContext(DeviceDataContext);

    useEffect(()=>{
        if(equipmentData && equipmentData.length > 0){
            console.log("equipmentData",equipmentData)
            renderMultiChart()
        }
    },[equipmentData])
    
    let width = props.width;
    let height = props.height;
    
    function renderMultiChart() {
        console.log("renderMultiChart")
        var parseDate = d3.timeParse("%Y");
        let ph = JSON.parse(JSON.stringify(equipmentData));
        ph.forEach(function (item: equipmentData, idx: number) {
            item.date = new Date(item.date);
            console.log(item.date);
        });

        var margin = { top: 30, right: 50, bottom: 40, left: 45 };
        width = width - margin.left - margin.right;
        height = height - margin.top - margin.bottom;
        var lineOpacity = "0.6";

        /* Scale */
        var xScale = d3
            .scaleTime()
            .domain(d3.extent(ph, (d: equipmentData) => d.date as Date))
            .range([0, width]);
        var yScale = d3.scaleLinear().domain([0, 14]).range([height, 0]);

        /* Add SVG */
        // d3.select("svg").remove();
        //create new
        var svg = d3
            // .select(svgRef.current)
            .select("#ChartpH")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        
        //remove Old
        // svg.selectAll("*").remove();
        let acxTeste = 10

        var linepH = d3
            .line<equipmentData>()
            .x((d: equipmentData) => xScale(d.date as Date))
            .y((d: equipmentData) => yScale(d.ph));

        svg
            .append("path")
            .datum(ph)
            .attr("class", "line")
            .attr("d", linepH)
            .style("stroke", "var(--purple)")
            .style("opacity", lineOpacity);

        /* Add Axis into SVG */
        var xAxis2 = d3.axisBottom(xScale).tickSize(0).tickValues([]);
        var yAxis2 = d3.axisLeft(yScale);
        // .ticks(14);

        //X year
        svg
            .append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis2)
            .append("text")
            .style("font-size", 15)
            // .attr("y", 40)
            .attr(
                "transform",
                "translate(" + width / 2 + "," + (margin.bottom - 7) + ")"
            )
            .attr("fill", "black")
            .text("Time");

        //Y pH
        svg
            .append("g")
            .attr("class", "y axis")
            .call(yAxis2)
            .append("text")
            .style("font-size", 19)
            .attr("transform", "translate(-30," + height / 4 + ")rotate(-90)")
            .attr("fill", "black")
            .text("pH");

        svg
            .append("rect")
            .attr("y", yScale(9.5))
            .attr("width", width)
            .attr("height", yScale(6) - yScale(9.5))
            .style("fill", "var(--blue-light)")
            .style("fill-opacity", 0.3);


            svg.append("circle")
            .attr("cx",width - 50)
            .attr("cy",-10)
            .attr("r", 6)
            .style("fill", "var(--blue-light)")
            .style("fill-opacity", 0.3);
    
        svg.append("text")
            .attr("x", width - 40)
            .attr("y", -10 )
            .text("Recomendado")
            .style("font-size", "13px")
            .style("fill", "var(--black)")
            .attr("alignment-baseline","middle")
            .style("fill-opacity", 0.9);
  }

  return (
    <div className={styles.ContainerLineChart}>
      <div className={styles.chart} id="ChartpH" />
    </div>
  );
}