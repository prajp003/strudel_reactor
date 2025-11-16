import React, { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
//take strudel data and return gain:
const handleD3Data = (event) => {
    console.log(event.detail);
};
function LogToNum(input) {
    if (!input) { return 0 }
    var stringArray = input.split(/(\s+)/);
    for (const item of stringArray) {
        if (item.startsWith("gain:")) {
            let val = item.substring(5);
            return Number(val);
        }
    }
    return 0;
}
function Graph({ data }) {
    const svgRef = useRef(null);

    
    const series = useMemo(() => {
        
        const vals = (data || []).map(LogToNum)
            // filter nulls 
            .filter((v) => v !== null && !Number.isNaN(v));

        // create data for D3
        return vals.map((y, i) => ({ x: i, y }));
    }, [data]);

    useEffect(() => {
        const svg = d3.select(svgRef.current);
        if (!svg.node()) return;

        const { width, height } = svg.node().getBoundingClientRect();
        if (!width || !height) return;

        // margins
        const margin = { top: 10, right: 10, bottom: 24, left: 36 };
        const w = width - margin.left - margin.right;
        const h = height - margin.top - margin.bottom;

        svg.selectAll("*").remove(); 

        const g = svg
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // scales
        const x = d3
            .scaleLinear()
            .domain([Math.max(0, series.length - 100), Math.max(99, series.length - 1)]) // shows last 100 points
            .range([0, w]);

        const y = d3.scaleLinear().domain([0, 1.5]).range([h, 0]);

        // axes 
        g.append("g")
            .attr("transform", `translate(0,${h})`)
            .call(d3.axisBottom(x).ticks(5).tickFormat(() => "")); //hide x labels

        g.append("g").call(d3.axisLeft(y).ticks(5));

        // line generator
        const line = d3
            .line()
            .x((d, i) => x(i))
            .y((d) => y(d.y))
            .curve(d3.curveMonotoneX);

        // gradient (green->red vertically)
        const grad = svg
            .append("defs")
            .append("linearGradient")
            .attr("id", "gainGrad")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "0%")
            .attr("y2", "100%");

        grad.append("stop").attr("offset", "0%").attr("stop-color", "red");
        grad.append("stop").attr("offset", "100%").attr("stop-color", "green");

        // path
        g.append("path")
            .datum(series)
            .attr("fill", "none")
            .attr("stroke", "url(#gainGrad)")
            .attr("stroke-width", 2)
            .attr("d", line);

        
    }, [series]);

    
    return (
        <svg
            ref={svgRef}
            width="100%"
            height="400"
            style={{ display: "block" }}
        />
    );
}
  ;


export default Graph;