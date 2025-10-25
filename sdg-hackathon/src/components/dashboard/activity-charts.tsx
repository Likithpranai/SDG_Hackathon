"use client";

import React, { useRef, useEffect } from 'react';
import { LineChart, TrendingUp, DollarSign, Heart, Eye } from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ActivityData {
  month: string;
  sales: number;
  views: number;
  likes: number;
}

interface ActivityChartsProps {
  data: ActivityData[];
}

export function ActivityCharts({ data }: ActivityChartsProps) {
  const chartRef = useRef<ChartJS<'line'>>(null);
  
  // Format data for Chart.js
  const chartData: ChartData<'line'> = {
    labels: data.map(item => item.month),
    datasets: [
      {
        label: 'Sales',
        data: data.map(item => item.sales),
        borderColor: '#22c55e', // green
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        pointBackgroundColor: '#22c55e',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#22c55e',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
      {
        label: 'Views',
        data: data.map(item => item.views),
        borderColor: '#3b82f6', // blue
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        pointBackgroundColor: '#3b82f6',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#3b82f6',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
      {
        label: 'Likes',
        data: data.map(item => item.likes),
        borderColor: '#a855f7', // purple
        backgroundColor: 'rgba(168, 85, 247, 0.5)',
        pointBackgroundColor: '#a855f7',
        pointBorderColor: '#ffffff',
        pointHoverBackgroundColor: '#ffffff',
        pointHoverBorderColor: '#a855f7',
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.3,
      },
    ],
  };
  
  // Chart options
  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 10,
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 10,
          },
        },
      },
    },
    plugins: {
      legend: {
        position: 'top' as const,
        align: 'center' as const,
        labels: {
          boxWidth: 12,
          usePointStyle: true,
          pointStyle: 'circle',
          color: '#4b5563',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#111827',
        bodyColor: '#4b5563',
        borderColor: 'rgba(203, 213, 225, 0.5)',
        borderWidth: 1,
        padding: 10,
        boxWidth: 8,
        boxHeight: 8,
        usePointStyle: true,
        bodyFont: {
          size: 12,
        },
        titleFont: {
          size: 14,
          weight: 'bold',
        },
        callbacks: {
          // Format the tooltip title
          title: (tooltipItems) => {
            return `${tooltipItems[0].label}`;
          },
          // Format the tooltip label
          label: (context) => {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.dataset.label === 'Sales' ? `$${context.parsed.y}` : context.parsed.y;
            }
            return label;
          },
        },
      },
    },
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
  };
  
  // Apply dark mode styles conditionally
  useEffect(() => {
    const applyDarkModeStyles = () => {
      if (!chartRef.current) return;
      
      const isDarkMode = document.documentElement.classList.contains('dark');
      
      if (isDarkMode) {
        chartRef.current.options.scales!.y!.grid!.color = 'rgba(75, 85, 99, 0.2)';
        chartRef.current.options.scales!.y!.ticks!.color = '#9ca3af';
        chartRef.current.options.scales!.x!.ticks!.color = '#9ca3af';
        chartRef.current.options.plugins!.legend!.labels!.color = '#d1d5db';
        chartRef.current.options.plugins!.tooltip!.backgroundColor = 'rgba(31, 41, 55, 0.9)';
        chartRef.current.options.plugins!.tooltip!.titleColor = '#f9fafb';
        chartRef.current.options.plugins!.tooltip!.bodyColor = '#e5e7eb';
        chartRef.current.options.plugins!.tooltip!.borderColor = 'rgba(75, 85, 99, 0.3)';
      } else {
        chartRef.current.options.scales!.y!.grid!.color = 'rgba(156, 163, 175, 0.1)';
        chartRef.current.options.scales!.y!.ticks!.color = '#9ca3af';
        chartRef.current.options.scales!.x!.ticks!.color = '#9ca3af';
        chartRef.current.options.plugins!.legend!.labels!.color = '#4b5563';
        chartRef.current.options.plugins!.tooltip!.backgroundColor = 'rgba(255, 255, 255, 0.9)';
        chartRef.current.options.plugins!.tooltip!.titleColor = '#111827';
        chartRef.current.options.plugins!.tooltip!.bodyColor = '#4b5563';
        chartRef.current.options.plugins!.tooltip!.borderColor = 'rgba(203, 213, 225, 0.5)';
      }
      
      chartRef.current.update();
    };
    
    // Apply styles initially
    applyDarkModeStyles();
    
    // Set up observer for theme changes
    const observer = new MutationObserver(applyDarkModeStyles);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    return () => observer.disconnect();
  }, []);
  
  return (
    <div className="space-y-8">
      {/* Combined Metrics Chart */}
      <div className="bg-white dark:bg-[#1a1a2e] rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full mr-3">
              <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Performance Metrics</h3>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">Last 6 months</div>
        </div>
        
        {/* Chart.js Line Chart */}
        <div className="h-80 mb-4">
          <Line 
            data={chartData} 
            options={chartOptions} 
            ref={chartRef as React.RefObject<ChartJS<'line'>>}
          />
        </div>
        
        <div className="mt-4 flex justify-between items-center text-sm">
          <div className="flex items-center text-green-600 dark:text-green-400">
            <TrendingUp className="h-4 w-4 mr-1" />
            <span className="font-medium">+12% overall growth</span>
          </div>
          <div className="text-gray-500 dark:text-gray-400">Total Sales: $1,240</div>
        </div>
      </div>
    </div>
  );
}
