import React from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';

export default function ActiveCall({ 
  selectedLead, 
  callDuration, 
  isRecording, 
  setIsRecording, 
  onEndCall,
  formatCallDuration 
}) {
  return (
    <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl lg:rounded-2xl p-4 lg:p-6 text-white shadow-xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <Phone className="w-6 h-6 lg:w-8 lg:h-8" />
          </div>
          <div>
            <h3 className="text-lg lg:text-2xl font-bold">{selectedLead.name}</h3>
            <p className="text-green-100 text-sm lg:text-base">{selectedLead.phone}</p>
          </div>
        </div>
        <div className="text-center">
          <p className="text-2xl lg:text-3xl font-bold font-mono">{formatCallDuration(callDuration)}</p>
          <p className="text-green-100 text-sm lg:text-base">משך השיחה</p>
        </div>
      </div>

      {/* Recording Indicator */}
      {isRecording && (
        <div className="bg-white/20 rounded-lg p-2 lg:p-3 mb-4 flex items-center gap-3">
          <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          <p className="text-xs lg:text-sm">מקליט שיחה...</p>
        </div>
      )}

      {/* Call Controls */}
      <div className="flex items-center justify-center gap-2 lg:gap-4 mt-4 lg:mt-6">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`p-3 lg:p-4 rounded-full transition-all duration-200 ${
            isRecording ? 'bg-red-500 hover:bg-red-600 animate-pulse' : 'bg-white/20 hover:bg-white/30'
          }`}
          title={isRecording ? 'עצור הקלטה' : 'התחל הקלטה'}
        >
          {isRecording ? <Mic className="w-5 h-5 lg:w-6 lg:h-6" /> : <MicOff className="w-5 h-5 lg:w-6 lg:h-6" />}
        </button>
        <button
          onClick={onEndCall}
          className="px-6 py-3 lg:px-8 lg:py-4 bg-red-500 hover:bg-red-600 rounded-full transition-all duration-200 flex items-center gap-2 text-sm lg:text-base"
        >
          <PhoneOff className="w-5 h-5 lg:w-6 lg:h-6" />
          סיים שיחה
        </button>
        <button className="p-3 lg:p-4 bg-white/20 hover:bg-white/30 rounded-full transition-all duration-200">
          <Volume2 className="w-5 h-5 lg:w-6 lg:h-6" />
        </button>
      </div>

      {/* Quick Notes */}
      <div className="mt-4">
        <textarea
          placeholder="הערות מהירות לשיחה..."
          className="w-full p-3 lg:p-4 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 text-sm lg:text-base"
          rows="2"
        ></textarea>
      </div>
    </div>
  );
}