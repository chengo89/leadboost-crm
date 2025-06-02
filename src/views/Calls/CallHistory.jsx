import React from 'react';
import { 
  Phone, PhoneOff, Mic, Tag, Download, Play, Pause, 
  FileText, Brain, Share2, CheckCircle 
} from 'lucide-react';
import { getSentimentIcon } from '../../utils/helpers';

export default function CallHistory({ calls, onPlayPause, isPlaying, selectedCall, onShowTranscript }) {
  return (
    <div className="p-4 lg:p-6">
      <div className="space-y-3 lg:space-y-4">
        {calls.map((call) => (
          <div key={call.id} className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg lg:rounded-xl p-4 lg:p-6 hover:shadow-lg transition-all duration-300">
            {/* Call Header */}
            <div className="flex flex-col sm:flex-row items-start justify-between gap-3 mb-3 lg:mb-4">
              <div className="flex items-center gap-3 lg:gap-4">
                <div className={`w-10 h-10 lg:w-14 lg:h-14 rounded-full flex items-center justify-center ${
                  call.status === 'completed' ? 'bg-gradient-to-br from-green-400 to-green-600' : 'bg-gradient-to-br from-red-400 to-red-600'
                }`}>
                  {call.status === 'completed' ? (
                    <Phone className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                  ) : (
                    <PhoneOff className="w-5 h-5 lg:w-7 lg:h-7 text-white" />
                  )}
                </div>
                <div>
                  <p className="font-bold text-base lg:text-lg text-gray-800">{call.leadName}</p>
                  <div className="flex items-center gap-2 lg:gap-3 mt-1">
                    <span className="text-xs lg:text-sm text-gray-500">{call.date} | {call.time}</span>
                    <span className="text-xs lg:text-sm font-semibold text-gray-700">{call.duration}</span>
                    {call.recording && (
                      <span className="flex items-center gap-1 text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        <Mic className="w-3 h-3" />
                        מוקלט
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Call Quality Score */}
                <div className="text-center">
                  <div className={`text-lg lg:text-2xl font-bold ${
                    call.callQuality > 90 ? 'text-green-600' :
                    call.callQuality > 70 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {call.callQuality}%
                  </div>
                  <p className="text-xs text-gray-500">איכות</p>
                </div>
                
                {/* Sentiment */}
                <div className="text-center">
                  <span className="text-2xl lg:text-3xl">{getSentimentIcon(call.sentiment)}</span>
                  <p className="text-xs text-gray-500">סנטימנט</p>
                </div>
              </div>
            </div>

            {/* Keywords */}
            {call.keywords.length > 0 && (
              <div className="mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <Tag className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                  {call.keywords.map((keyword, idx) => (
                    <span key={idx} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call Summary */}
            {call.summary && (
              <div className="mb-3 lg:mb-4 p-3 bg-white rounded-lg">
                <p className="text-xs lg:text-sm text-gray-700">{call.summary}</p>
              </div>
            )}

            {/* Recording Player */}
            {call.recording && (
              <div className="mb-3 lg:mb-4">
                <div className="bg-white rounded-lg p-3 lg:p-4">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <button
                      onClick={() => onPlayPause(call)}
                      className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full transition-colors duration-200"
                    >
                      {isPlaying && selectedCall?.id === call.id ? (
                        <Pause className="w-4 h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <Play className="w-4 h-4 lg:w-5 lg:h-5" />
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="absolute h-full bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transition-all duration-300"
                          style={{ width: isPlaying && selectedCall?.id === call.id ? '35%' : '0%' }}
                        ></div>
                      </div>
                      <div className="flex justify-between mt-1">
                        <span className="text-xs text-gray-500">
                          {isPlaying && selectedCall?.id === call.id ? '2:03' : '0:00'}
                        </span>
                        <span className="text-xs text-gray-500">{call.duration}</span>
                      </div>
                    </div>
                    
                    <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                      <Download className="w-4 h-4 lg:w-5 lg:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex gap-2 flex-wrap">
                {call.recording && (
                  <button
                    onClick={() => onShowTranscript(call)}
                    className="px-3 py-1.5 text-xs lg:text-sm bg-purple-100 text-purple-700 hover:bg-purple-200 rounded-lg transition-colors duration-200 flex items-center gap-1"
                  >
                    <FileText className="w-3 h-3 lg:w-4 lg:h-4" />
                    תמלול
                  </button>
                )}
                <button className="px-3 py-1.5 text-xs lg:text-sm bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors duration-200 flex items-center gap-1">
                  <Brain className="w-3 h-3 lg:w-4 lg:h-4" />
                  ניתוח AI
                </button>
                <button className="px-3 py-1.5 text-xs lg:text-sm bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors duration-200 flex items-center gap-1">
                  <Share2 className="w-3 h-3 lg:w-4 lg:h-4" />
                  שתף
                </button>
              </div>
              
              {/* Action Items */}
              {call.actionItems && call.actionItems.length > 0 && (
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-gray-400" />
                  <span className="text-xs lg:text-sm text-gray-600">{call.actionItems.length} משימות</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}