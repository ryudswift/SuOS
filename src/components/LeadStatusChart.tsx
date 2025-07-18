import React from 'react';
import { Lead } from '../types';
import { getLeadStatus, getStatusColor } from '../utils/dataUtils';

interface LeadStatusChartProps {
  leads: Lead[];
}

const LeadStatusChart: React.FC<LeadStatusChartProps> = ({ leads }) => {
  const statusCounts = leads.reduce((acc, lead) => {
    const status = getLeadStatus(lead);
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as { [key: string]: number });

  const statuses = Object.entries(statusCounts).sort(([,a], [,b]) => b - a);
  const total = leads.length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Status Distribution</h3>
      
      <div className="space-y-4">
        {statuses.map(([status, count]) => {
          const percentage = total > 0 ? (count / total) * 100 : 0;
          const colorClass = getStatusColor(status);
          
          return (
            <div key={status} className="flex items-center justify-between">
              <div className="flex items-center flex-1">
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${colorClass} mr-3`}>
                  {status}
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-gray-900">{count}</span>
                <span className="text-xs text-gray-500 ml-1">({percentage.toFixed(1)}%)</span>
              </div>
            </div>
          );
        })}
      </div>
      
      {total === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p>No leads to display</p>
        </div>
      )}
    </div>
  );
};

export default LeadStatusChart;