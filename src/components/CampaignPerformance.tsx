import React from 'react';
import { Plus } from 'lucide-react';

const CampaignPerformance: React.FC = () => {
  const campaigns = [
    {
      name: 'Tech Services',
      leads: 412,
      replyRate: 22,
      optOutRate: 1.8,
      progress: 72,
      color: 'blue'
    },
    {
      name: 'Marketing',
      leads: 278,
      replyRate: 18,
      optOutRate: 2.1,
      progress: 61,
      color: 'green'
    },
    {
      name: 'Financial Consulting',
      leads: 189,
      replyRate: 15,
      optOutRate: 3.4,
      progress: 54,
      color: 'purple'
    },
    {
      name: 'HR Solutions',
      leads: 156,
      replyRate: 12,
      optOutRate: 4.2,
      progress: 48,
      color: 'orange'
    },
    {
      name: 'Legal Services',
      leads: 112,
      replyRate: 9,
      optOutRate: 5.1,
      progress: 42,
      color: 'red'
    }
  ];

  const getProgressColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600';
      case 'green': return 'bg-green-600';
      case 'purple': return 'bg-purple-600';
      case 'orange': return 'bg-orange-600';
      case 'red': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
          <button className="px-2 py-1 text-xs bg-blue-100 text-blue-600 rounded-md">
            This Month
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="space-y-6">
          {campaigns.map((campaign, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-sm font-medium text-gray-900">{campaign.name}</h4>
                <span className="text-xs font-medium text-gray-500">{campaign.leads} leads</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${getProgressColor(campaign.color)}`}
                  style={{ width: `${campaign.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>{campaign.replyRate}% Reply Rate</span>
                <span>{campaign.optOutRate}% Opt-Out Rate</span>
              </div>
            </div>
          ))}
          
          <button className="w-full py-2 px-4 mt-4 border border-dashed border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:border-solid hover:bg-gray-50 transition-colors">
            <Plus className="h-4 w-4 mr-2 inline" />
            Add New Campaign
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignPerformance;