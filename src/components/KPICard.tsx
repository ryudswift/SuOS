import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon?: React.ReactNode;
  color?: 'blue' | 'green' | 'red' | 'orange' | 'purple';
}

const KPICard: React.FC<KPICardProps> = ({ 
  title, 
  value, 
  change, 
  changeLabel, 
  icon,
  color = 'blue' 
}) => {
  const getColorClasses = () => {
    switch (color) {
      case 'green': return 'bg-green-50 border-green-200 text-green-800';
      case 'red': return 'bg-red-50 border-red-200 text-red-800';
      case 'orange': return 'bg-orange-50 border-orange-200 text-orange-800';
      case 'purple': return 'bg-purple-50 border-purple-200 text-purple-800';
      default: return 'bg-blue-50 border-blue-200 text-blue-800';
    }
  };

  const getIconColorClasses = () => {
    switch (color) {
      case 'green': return 'text-green-600';
      case 'red': return 'text-red-600';
      case 'orange': return 'text-orange-600';
      case 'purple': return 'text-purple-600';
      default: return 'text-blue-600';
    }
  };

  const renderChangeIndicator = () => {
    if (change === undefined) return null;
    
    if (change > 0) {
      return (
        <div className="flex items-center text-green-600">
          <TrendingUp className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">+{change.toFixed(1)}%</span>
        </div>
      );
    } else if (change < 0) {
      return (
        <div className="flex items-center text-red-600">
          <TrendingDown className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">{change.toFixed(1)}%</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center text-gray-500">
          <Minus className="h-4 w-4 mr-1" />
          <span className="text-sm font-medium">0%</span>
        </div>
      );
    }
  };

  return (
    <div className={`p-6 rounded-lg border-2 ${getColorClasses()} transition-all duration-200 hover:shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        {icon && <div className={`${getIconColorClasses()}`}>{icon}</div>}
      </div>
      
      <div className="flex items-end justify-between">
        <div>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          {changeLabel && (
            <p className="text-sm text-gray-500 mt-1">{changeLabel}</p>
          )}
        </div>
        {renderChangeIndicator()}
      </div>
    </div>
  );
};

export default KPICard;