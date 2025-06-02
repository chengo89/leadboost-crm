import React from 'react';
import { X, Download, Share2, Brain, CheckCircle } from 'lucide-react';

export default function TranscriptModal({ call, onClose }) {
  if (!call) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">תמלול שיחה</h2>
            <p className="text-sm text-gray-600 mt-1">{call.leadName} | {call.date} | {call.duration}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Transcript Content */}
          <div className="space-y-4">
            {call.transcript && call.transcript.length > 0 ? (
              call.transcript.map((line, idx) => (
                <div key={idx} className={`flex gap-4 ${line.speaker === 'agent' ? 'flex-row-reverse' : ''}`}>
                  <div className={`flex-1 ${line.speaker === 'agent' ? 'text-right' : 'text-left'}`}>
                    <div className={`inline-block p-3 rounded-lg ${
                      line.speaker === 'agent' ? 'bg-blue-100 text-blue-900' : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm font-semibold mb-1">
                        {line.speaker === 'agent' ? 'אתה' : call.leadName}
                      </p>
                      <p className="text-sm">{line.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{line.time}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">אין תמלול זמין לשיחה זו</p>
              </div>
            )}
          </div>

          {/* Summary Section */}
          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-600" />
              סיכום AI
            </h4>
            <p className="text-sm text-gray-700">{call.summary}</p>
            
            {call.actionItems && call.actionItems.length > 0 && (
              <div className="mt-4">
                <h5 className="font-medium text-gray-800 mb-2">משימות לביצוע:</h5>
                <ul className="space-y-1">
                  {call.actionItems.map((item, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-6 border-t border-gray-200 flex justify-between">
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
              <Download className="w-5 h-5" />
              הורד תמלול
            </button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              שתף
            </button>
          </div>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
          >
            סגור
          </button>
        </div>
      </div>
    </div>
  );
}