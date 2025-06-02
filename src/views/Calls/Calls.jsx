import React, { useState } from 'react';
import { Search } from 'lucide-react';
import ActiveCall from './ActiveCall';
import CallHistory from './CallHistory';
import TranscriptModal from '../../components/modals/TranscriptModal';
import { DEMO_CALLS, DEMO_LEADS } from '../../data/mockData';
import { useCallTimer } from '../../hooks/useCallTimer';

export default function Calls({ showToast }) {
  const [calls, setCalls] = useState(DEMO_CALLS);
  const [selectedLead, setSelectedLead] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedCall, setSelectedCall] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [searchCallTerm, setSearchCallTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [showTranscript, setShowTranscript] = useState(false);

  const { callDuration, isOnCall, startCall, endCall } = useCallTimer();

  const handleStartCall = (lead) => {
    setSelectedLead(lead);
    startCall();
  };

  const handleEndCall = () => {
    setCalls(prev => [...prev, {
      id: prev.length + 1,
      leadName: selectedLead.name,
      duration: formatCallDuration(callDuration),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().split(' ')[0].substring(0, 5),
      status: 'completed',
      recording: isRecording,
      sentiment: 'positive',
      notes: '',
      leadScore: selectedLead.score,
      callQuality: Math.floor(Math.random() * 20) + 80,
      keywords: [],
      transcript: [],
      summary: 'סיכום אוטומטי יופיע כאן לאחר עיבוד השיחה',
      actionItems: []
    }]);
    endCall();
    setIsRecording(false);
    showToast('השיחה נשמרה בהצלחה');
  };

  const formatCallDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlayPause = (call) => {
    if (isPlaying && selectedCall?.id === call.id) {
      setIsPlaying(false);
    } else {
      setSelectedCall(call);
      setIsPlaying(true);
    }
  };

  const filteredCalls = calls.filter(call => {
    const matchesSearch = call.leadName.toLowerCase().includes(searchCallTerm.toLowerCase()) ||
                         call.notes.toLowerCase().includes(searchCallTerm.toLowerCase()) ||
                         call.keywords.some(k => k.includes(searchCallTerm));
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'recorded' && call.recording) ||
                         (filterType === 'missed' && call.status === 'missed');
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-4 lg:space-y-6">
      {/* Active Call Interface */}
      {isOnCall && selectedLead && (
        <ActiveCall 
          selectedLead={selectedLead}
          callDuration={callDuration}
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          onEndCall={handleEndCall}
          formatCallDuration={formatCallDuration}
        />
      )}

      {/* Call History */}
      <div className="bg-white rounded-xl lg:rounded-2xl shadow-lg">
        <div className="p-4 lg:p-6 border-b border-gray-200">
          <div className="flex flex-col gap-3 lg:gap-4">
            <h3 className="text-base lg:text-xl font-bold text-gray-800">היסטוריית שיחות והקלטות</h3>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <div className="relative flex-1">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 lg:w-5 lg:h-5" />
                <input
                  type="text"
                  placeholder="חיפוש בשיחות..."
                  className="w-full pr-8 lg:pr-10 pl-4 py-2 text-sm lg:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={searchCallTerm}
                  onChange={(e) => setSearchCallTerm(e.target.value)}
                />
              </div>
              
              <select
                className="px-3 lg:px-4 py-2 text-sm lg:text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <option value="all">כל השיחות</option>
                <option value="recorded">עם הקלטה</option>
                <option value="missed">לא נענו</option>
              </select>
            </div>
          </div>
        </div>

        <CallHistory 
          calls={filteredCalls}
          onPlayPause={handlePlayPause}
          isPlaying={isPlaying}
          selectedCall={selectedCall}
          onShowTranscript={(call) => {
            setSelectedCall(call);
            setShowTranscript(true);
          }}
        />
      </div>

      {/* Demo: Start a call with first lead */}
      {!isOnCall && (
        <div className="bg-blue-50 rounded-lg p-4 text-center">
          <p className="text-sm text-blue-700 mb-3">לדוגמה: התחל שיחה עם ליד</p>
          <button
            onClick={() => handleStartCall(DEMO_LEADS[0])}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            התחל שיחה עם {DEMO_LEADS[0].name}
          </button>
        </div>
      )}

      {/* Transcript Modal */}
      {showTranscript && selectedCall && (
        <TranscriptModal 
          call={selectedCall}
          onClose={() => setShowTranscript(false)}
        />
      )}
    </div>
  );
}