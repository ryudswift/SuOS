import React from 'react';
import { Lead } from '../../types';
import { calculateKPIs } from '../../utils/dataUtils';
import { TrendingUp, Download, Calendar, BarChart } from 'lucide-react';

interface ReportsSectionProps {
  leads: Lead[];
}

const ReportsSection: React.FC<ReportsSectionProps> = ({ leads }) => {
  const kpis = calculateKPIs(leads);

  const reports = [
    {
      name: 'Weekly Performance Report',
      description: 'Comprehensive overview of campaign performance for the past week',
      lastGenerated: '2 hours ago',
      type: 'PDF',
      icon: TrendingUp
    },
    {
      name: 'Lead Conversion Analysis',
      description: 'Detailed analysis of lead conversion rates by industry and time zone',
      lastGenerated: '1 day ago',
      type: 'Excel',
      icon: BarChart
    },
    {
      name: 'Monthly Campaign Summary',
      description: 'Monthly summary of all campaigns with ROI calculations',
      lastGenerated: '3 days ago',
      type: 'PDF',
      icon: Calendar
    }
  ];

  return (
    <div className="space-y-6">
      {/* Report Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Reply Rate Trend</p>
              <p className="text-2xl font-bold text-gray-900">+15.7%</p>
              <p className="text-xs text-green-600">vs last month</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <BarChart className="h-8 w-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Best Performing TZ</p>
              <p className="text-2xl font-bold text-gray-900">T1</p>
              <p className="text-xs text-blue-600">US/Canada</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center">
            <Calendar className="h-8 w-8 text-purple-600 mr-3" />
            <div>
              <p className="text-sm font-medium text-gray-500">Reports Generated</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-purple-600">this month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Available Reports */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Available Reports</h3>
        </div>
        
        <div className="p-6">
          <div className="space-y-4">
            {reports.map((report, index) => {
              const Icon = report.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center">
                    <Icon className="h-8 w-8 text-gray-600 mr-4" />
                    <div>
                      <h4 className="text-sm font-medium text-gray-900">{report.name}</h4>
                      <p className="text-sm text-gray-500">{report.description}</p>
                      <p className="text-xs text-gray-400 mt-1">Last generated: {report.lastGenerated}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">{report.type}</span>
                    <button className="flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
                      <Download className="h-4 w-4 mr-1" />
                      Download
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Quick Statistics</h3>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-600">{kpis.replyRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">Overall Reply Rate</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600">{kpis.analyzedRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">Analysis Completion</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-purple-600">{kpis.activeCampaigns}</p>
              <p className="text-sm text-gray-500">Active Campaigns</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-orange-600">{kpis.optOutRate.toFixed(1)}%</p>
              <p className="text-sm text-gray-500">Opt-Out Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;