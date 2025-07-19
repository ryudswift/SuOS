import React, { useState, useMemo } from 'react';
import { Lead, FilterOptions } from '../types';
import { getLeadStatus } from '../utils/dataUtils';
import Sidebar from './Sidebar';
import Header from './Header';
import DashboardSection from './sections/DashboardSection';
import CampaignsSection from './sections/CampaignsSection';
import LeadsSection from './sections/LeadsSection';
import ReportsSection from './sections/ReportsSection';
import SettingsSection from './sections/SettingsSection';

interface DashboardProps {
  leads: Lead[];
}

const Dashboard: React.FC<DashboardProps> = ({ leads }) => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: { start: null, end: null },
    timeZone: '',
    sender: '',
    status: '',
    searchQuery: '',
  });

  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const filteredLeads = useMemo(() => {
    return leads.filter(lead => {
      // Date range filter
      if (filters.dateRange.start && lead.createdAt < filters.dateRange.start) return false;
      if (filters.dateRange.end && lead.createdAt > filters.dateRange.end) return false;
      
      // Time zone filter
      if (filters.timeZone && lead.timeZone !== filters.timeZone) return false;
      
      // Sender filter
      if (filters.sender && lead.senderEmail !== filters.sender) return false;
      
      // Status filter
      if (filters.status && getLeadStatus(lead) !== filters.status) return false;
      
      // Search query filter
      if (filters.searchQuery) {
        const query = filters.searchQuery.toLowerCase();
        const searchableFields = [
          lead.firstName,
          lead.lastName,
          lead.email,
          lead.companyName,
          lead.jobTitle,
          lead.industry,
          lead.location,
        ];
        
        if (!searchableFields.some(field => field.toLowerCase().includes(query))) {
          return false;
        }
      }
      
      return true;
    });
  }, [leads, filters]);

  const exportData = () => {
    const csv = [
      ['Name', 'Email', 'Company', 'Status', 'Time Zone', 'Last Updated'],
      ...filteredLeads.map(lead => [
        `${lead.firstName} ${lead.lastName}`,
        lead.email,
        lead.companyName,
        getLeadStatus(lead),
        lead.timeZone,
        lead.lastUpdated.toLocaleDateString(),
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'leads-export.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const getSectionTitle = () => {
    switch (activeSection) {
      case 'dashboard': return 'Outreach Automation Dashboard';
      case 'campaigns': return 'Campaign Management';
      case 'leads': return 'Lead Management';
      case 'reports': return 'Reports & Analytics';
      case 'settings': return 'Settings';
      default: return 'Dashboard';
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <DashboardSection leads={filteredLeads} />;
      case 'campaigns':
        return <CampaignsSection leads={filteredLeads} />;
      case 'leads':
        return <LeadsSection leads={filteredLeads} filters={filters} onFiltersChange={setFilters} />;
      case 'reports':
        return <ReportsSection leads={filteredLeads} />;
      case 'settings':
        return <SettingsSection />;
      default:
        return <DashboardSection leads={filteredLeads} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isCollapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header title={getSectionTitle()} onExportData={exportData} />
        
        <div className="flex-1 p-6 overflow-y-auto">
          {renderActiveSection()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
