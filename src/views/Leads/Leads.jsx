import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import LeadsKanban from './LeadsKanban';
import LeadsTable from './LeadsTable';
import LeadDetailsModal from '../../components/modals/LeadDetailsModal';
import { DEMO_LEADS } from '../../data/mockData';

export default function Leads({ showToast }) {
  const [leads, setLeads] = useState(DEMO_LEADS);
  const [selectedLead, setSelectedLead] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [viewType, setViewType] = useState('kanban'); // 'kanban' or 'table'

  const handleDragDrop = (leadId, newStatus) => {
    setLeads(prevLeads => 
      prevLeads.map(lead => 
        lead.id === leadId ? { ...lead, status: newStatus } : lead
      )
    );
    showToast('הסטטוס עודכן בהצלחה!');
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         lead.currentProvider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || lead.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Kanban Board */}
      <LeadsKanban 
        leads={leads}
        onDragDrop={handleDragDrop}
      />

      {/* Leads Table */}
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg">
        {/* Search and Filters */}
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex flex-col gap-3 lg:gap-4">
            <div className="flex-1 relative">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
              <input
                type="text"
                placeholder="חיפוש לפי שם, מייל, ספק או טלפון..."
                className="w-full pr-8 lg:pr-10 pl-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <select
                className="flex-1 sm:flex-initial px-3 lg:px-4 py-2 lg:py-3 text-sm lg:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="all">כל הסטטוסים</option>
                <option value="hot">חם 🔥</option>
                <option value="warm">חמים ☀️</option>
                <option value="cold">קר ❄️</option>
              </select>
              <button 
                onClick={() => showToast('פתיחת טופס ליד חדש')}
                className="px-4 lg:px-6 py-2 lg:py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-1 lg:gap-2 text-sm lg:text-base"
              >
                <Plus className="w-4 h-4 lg:w-5 lg:h-5" />
                <span className="hidden sm:inline">ליד חדש</span>
              </button>
            </div>
          </div>
        </div>

        <LeadsTable 
          leads={filteredLeads}
          onSelectLead={setSelectedLead}
        />
      </div>

      {/* Lead Details Modal */}
      {selectedLead && (
        <LeadDetailsModal 
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
        />
      )}
    </div>
  );
}