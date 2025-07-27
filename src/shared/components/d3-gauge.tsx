'use client';

import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface GaugeProps {
    value: number;
    maxValue: number;
    title: string;
    color: string;
    size?: number;
}

export default function D3Gauge({ value, maxValue, title, color, size = 200 }: GaugeProps) {
    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        // پاک کردن SVG قبلی
        d3.select(svgRef.current).selectAll("*").remove();

        const svg = d3.select(svgRef.current);
        const width = size;
        const height = size;
        const radius = Math.min(width, height) / 2 - 20;

        // تنظیم SVG
        svg
            .attr('width', width)
            .attr('height', height)
            .append('g')
            .attr('transform', `translate(${width / 2}, ${height / 2})`);

        const g = svg.select('g');

        // ایجاد arc برای gauge
        const arc = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2);

        // ایجاد arc برای background
        const backgroundArc = d3.arc()
            .innerRadius(radius * 0.6)
            .outerRadius(radius)
            .startAngle(-Math.PI / 2)
            .endAngle(Math.PI / 2);

        // محاسبه زاویه بر اساس مقدار
        const percentage = value / maxValue;
        const angle = percentage * Math.PI - Math.PI / 2;

        const arcParams = {
            innerRadius: radius * 0.6,
            outerRadius: radius,
            startAngle: -Math.PI / 2,
            endAngle: angle
        };
        const backgroundArcParams = {
            innerRadius: radius * 0.6,
            outerRadius: radius,
            startAngle: -Math.PI / 2,
            endAngle: Math.PI / 2
        };

        // رسم background
        g.append('path')
            .style('fill', '#374151')
            .attr('d', backgroundArc(backgroundArcParams));

        // رسم gauge
        g.append('path')
            .style('fill', color)
            .attr('d', arc(arcParams))
            .transition()
            .duration(1000)
            .ease(d3.easeElastic);

        // اضافه کردن متن مقدار
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', '0.35em')
            .style('font-size', '24px')
            .style('font-weight', 'bold')
            .style('fill', '#f9fafb')
            .text(`${Math.round(percentage * 100)}%`);

        // اضافه کردن عنوان
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', radius + 30)
            .style('font-size', '14px')
            .style('fill', '#9ca3af')
            .text(title);

        // اضافه کردن مقدار عددی
        g.append('text')
            .attr('text-anchor', 'middle')
            .attr('dy', radius + 50)
            .style('font-size', '12px')
            .style('fill', '#6b7280')
            .text(`${value.toFixed(1)} / ${maxValue}`);

    }, [value, maxValue, title, color, size]);

    return (
        <div className="flex flex-col items-center">
            <svg ref={svgRef}></svg>
        </div>
    );
} 