import React from 'react';
import { CampaignBreakdown as CampaignBreakdownType } from '../types';
import { timeZoneLabels } from '../data/mockData';
import { Globe, Mail, Clock, Users } from 'lucide-react';

interface CampaignBreakdownProps {
  breakdown: CampaignBreakdownType;
}

const CampaignBreakdown: React.FC<CampaignBreakdownProps> = ({ breakdown }) => {
  const timeZoneEntries = Object.entries(breakdown.byTimeZone);
  const senderEntries = Object.entries(breakdown.bySender);
  
  const totalTimeZoneEmails = timeZoneEntries.reduce((sum, [, count]) => sum + count, 0);
  const totalSenderEmails = senderEntries.reduce((sum, [, count]) => sum + count, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Time Zone Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <Globe className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Emails by Time Zone</h3>
        </div>
        
        <div className="space-y-4">
          {timeZoneEntries.map(([timeZone, count]) => {
            const percentage = totalTimeZoneEmails > 0 ? (count / totalTimeZoneEmails) * 100 : 0;
            const label = timeZoneLabels[timeZone as keyof typeof timeZoneLabels] || timeZone;
            
            return (
              <div key={timeZone} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex items-center mr-3">
                    <Clock className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900">{label}</span>
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
        
        {timeZoneEntries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No email data available</p>
          </div>
        )}
      </div>

      {/* Sender Breakdown */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center mb-6">
          <Mail className="h-5 w-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Emails by Sender</h3>
        </div>
        
        <div className="space-y-4">
          {senderEntries.map(([sender, count]) => {
            const percentage = totalSenderEmails > 0 ? (count / totalSenderEmails) * 100 : 0;
            
            return (
              <div key={sender} className="flex items-center justify-between">
                <div className="flex items-center flex-1">
                  <div className="flex items-center mr-3">
                    <Users className="h-4 w-4 text-gray-500 mr-2" />
                    <span className="text-sm font-medium text-gray-900 truncate">{sender}</span>
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
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
        
        {senderEntries.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No email data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignBreakdown;