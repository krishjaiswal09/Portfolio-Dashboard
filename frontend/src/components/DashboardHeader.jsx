import React from 'react';
import { PieChart, RefreshCw } from 'lucide-react';
import { formatTime } from '../utils/formatters';

const DashboardHeader = ({ lastUpdated, refreshing, onRefresh }) => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <PieChart className="text-blue-600" />
              Portfolio Dashboard
            </h1>
            {lastUpdated && (
              <p className="text-gray-500 mt-1">
                Last updated: {formatTime(lastUpdated)}
              </p>
            )}
          </div>
          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;