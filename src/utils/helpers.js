import { STAGE_INFO, SENTIMENT_ICONS } from './constants';

export const getStatusColor = (status) => {
  switch (status) {
    case 'hot': return 'bg-red-500 text-white';
    case 'warm': return 'bg-orange-500 text-white';
    case 'cold': return 'bg-blue-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

export const getSentimentIcon = (sentiment) => {
  return SENTIMENT_ICONS[sentiment] || SENTIMENT_ICONS.neutral;
};

export const getStageInfo = (stage) => {
  return STAGE_INFO[stage] || { label: 'לא ידוע', color: 'bg-gray-500' };
};