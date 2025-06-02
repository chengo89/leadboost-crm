export const formatCallDuration = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatCurrency = (amount) => {
  return `₪${amount.toLocaleString('he-IL')}`;
};

export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('he-IL');
};

export const formatTime = (timeString) => {
  return timeString.substring(0, 5);
};