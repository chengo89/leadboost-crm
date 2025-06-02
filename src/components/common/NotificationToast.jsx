import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function NotificationToast({ message }) {
  return (
    <div className="fixed bottom-4 left-4 right-4 sm:right-auto bg-green-500 text-white px-4 lg:px-6 py-3 rounded-lg shadow-lg animate-bounce text-sm lg:text-base z-50">
      <div className="flex items-center gap-2">
        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5" />
        <span>{message}</span>
      </div>
    </div>
  );
}