import React from 'react';
import { Lead, FilterOptions } from '../../types';
import FilterControls from '../FilterControls';
import LeadsTable from '../LeadsTable';

interface LeadsSectionProps {
  leads: Lead[];
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
}

const LeadsSection: React.FC<LeadsSectionProps> = ({ leads, filters, onFiltersChange }) => {
  return (
    <div className="space-y-6">
      <FilterControls filters={filters} onFiltersChange={onFiltersChange} />
      <LeadsTable leads={leads} />
    </div>
  );
};

export default LeadsSection;