import React from 'react';
import { Lead, KPIData, CampaignBreakdown as CampaignBreakdownType } from '../../types';
import { calculateKPIs, calculateCampaignBreakdown } from '../../utils/dataUtils';
import KPICard from '../KPICard';
import LeadStatusChart from '../LeadStatusChart';
import PerformanceMetrics from '../PerformanceMetrics';
import CampaignBreakdown from '../CampaignBreakdown';
import RecentLeads from '../RecentLeads';
import CampaignPerformance from '../CampaignPerformance';
import { 
  Users, 
  Mail, 
  MessageSquare, 
  UserMinus
} from 'lucide-react';

interface DashboardSectionProps {
  leads: Lead[];
}

const DashboardSection: React.FC<DashboardSectionProps> = ({ leads }) => {
  const kpis = calculateKPIs(leads);
  const campaignBreakdown = calculateCampaignBreakdown(leads);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KPICard
          title="Total Leads"
          value={kpis.totalLeads}
          icon={<Users className="h-5 w-5" />}
          color="purple"
          change={12.5}
          changeLabel="vs last month"
        />
        <KPICard
          title="Emails Sent"
          value={kpis.totalEmailsSent}
          icon={<Mail className="h-5 w-5" />}
          color="blue"
          change={8.2}
          changeLabel="vs last month"
        />
        <KPICard
          title="Replies Received"
          value={kpis.totalReplies}
          icon={<MessageSquare className="h-5 w-5" />}
          color="green"
          change={15.7}
          changeLabel="vs last month"
        />
        <KPICard
          title="Opt-Outs"
          value={kpis.totalOptOuts}
          icon={<UserMinus className="h-5 w-5" />}
          color="red"
          change={-3.4}
          changeLabel="vs last month"
        />
      </div>

      {/* Performance Metrics */}
      <PerformanceMetrics kpis={kpis} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LeadStatusChart leads={leads} />
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Campaign Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Active Campaigns</span>
              <span className="text-2xl font-bold text-green-600">{kpis.activeCampaigns}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Avg. Response Time</span>
              <span className="text-sm text-gray-900">2.3 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Campaign Completion</span>
              <span className="text-sm text-gray-900">78%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Breakdown */}
      <CampaignBreakdown breakdown={campaignBreakdown} />

      {/* Recent Activity */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2">
          <RecentLeads leads={leads.slice(0, 5)} />
        </div>
        <div>
          <CampaignPerformance />
        </div>
      </div>
    </div>
  );
};

export default DashboardSection;