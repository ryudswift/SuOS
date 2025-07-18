import React from 'react';
import { KPIData } from '../types';
import { formatPercentage } from '../utils/dataUtils';
import { Target, TrendingUp, Users, AlertCircle } from 'lucide-react';

interface PerformanceMetricsProps {
  kpis: KPIData;
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({ kpis }) => {
  const metrics = [
    {
      label: 'Reply Rate',
      value: formatPercentage(kpis.replyRate),
      icon: <TrendingUp className="h-5 w-5" />,
      color: 'green',
      benchmark: 15, // Industry benchmark
    },
    {
      label: 'Opt-Out Rate',
      value: formatPercentage(kpis.optOutRate),
      icon: <AlertCircle className="h-5 w-5" />,
      color: 'red',
      benchmark: 5, // Industry benchmark
    },
    {
      label: 'Analysis Rate',
      value: formatPercentage(kpis.analyzedRate),
      icon: <Target className="h-5 w-5" />,
      color: 'blue',
      benchmark: 90, // Target benchmark
    },
    {
      label: 'Active Campaigns',
      value: kpis.activeCampaigns,
      icon: <Users className="h-5 w-5" />,
      color: 'purple',
      benchmark: null, // No benchmark for count
    },
  ];

  const getBenchmarkStatus = (current: number, benchmark: number | null) => {
    if (benchmark === null) return null;
    
    if (current >= benchmark) {
      return { status: 'good', text: 'Above benchmark' };
    } else {
      return { status: 'needs-improvement', text: 'Below benchmark' };
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const benchmarkStatus = getBenchmarkStatus(
            typeof metric.value === 'string' ? parseFloat(metric.value) : metric.value,
            metric.benchmark
          );
          
          return (
            <div key={metric.label} className="p-4 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex items-center justify-between mb-2">
                <div className={`text-${metric.color}-600`}>{metric.icon}</div>
                {benchmarkStatus && (
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    benchmarkStatus.status === 'good' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {benchmarkStatus.text}
                  </div>
                )}
              </div>
              
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {metric.value}
              </div>
              
              <div className="text-sm text-gray-600">
                {metric.label}
              </div>
              
              {metric.benchmark && (
                <div className="text-xs text-gray-500 mt-1">
                  Benchmark: {formatPercentage(metric.benchmark)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PerformanceMetrics;