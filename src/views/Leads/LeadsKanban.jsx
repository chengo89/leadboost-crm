import React from 'react';
import { STATUS_LABELS } from '../../utils/constants';
import { getStatusColor, getSentimentIcon } from '../../utils/helpers';

export default function LeadsKanban({ leads, onDragDrop }) {
  const handleDragStart = (e, leadId) => {
    e.dataTransfer.setData('leadId', leadId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const leadId = parseInt(e.dataTransfer.getData('leadId'));
    onDragDrop(leadId, newStatus);
  };

  return (
    <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg p-4 lg:p-6">
      <h3 className="text-base lg:text-xl font-bold text-gray-800 mb-4 lg:mb-6">
        לוח משימות - גרור ושחרר לעדכון סטטוס
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 overflow-x-auto pb-2">
        {['cold', 'warm', 'hot'].map((status) => (
          <div
            key={status}
            className="bg-gray-50 rounded-lg lg:rounded-xl p-3 lg:p-4 min-h-[150px] lg:min-h-[200px] min-w-[250px] sm:min-w-0"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, status)}
          >
            <h4 className={`font-semibold mb-3 lg:mb-4 px-2 lg:px-3 py-1 rounded-full text-white text-center text-sm lg:text-base ${
              status === 'hot' ? 'bg-red-500' : status === 'warm' ? 'bg-orange-500' : 'bg-blue-500'
            }`}>
              {STATUS_LABELS[status]}
            </h4>
            <div className="space-y-2">
              {leads.filter(lead => lead.status === status).map((lead) => (
                <div
                  key={lead.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, lead.id)}
                  className="bg-white p-2 lg:p-3 rounded-lg shadow cursor-move hover:shadow-lg transition-shadow duration-200"
                >
                  <p className="font-semibold text-gray-800 text-sm lg:text-base">{lead.name}</p>
                  <p className="text-xs lg:text-sm text-gray-500">{lead.currentProvider}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs text-gray-400">₪{lead.monthlyValue}/חודש</span>
                    <span className="text-base lg:text-lg">{getSentimentIcon(lead.sentiment)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}