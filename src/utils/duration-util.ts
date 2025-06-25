export const formatIsoDuration = (fromDate: Date, toDate?: Date | null) => {
  const diffMinutes = (toDate || new Date()).getTime() - fromDate.getTime();
  const diffDays = Math.floor(diffMinutes / (1000 * 60 * 60 * 24));

  return `P${diffDays}D`;
};

export const estimateReadingTime = (text?: string, wordsPerMinute = 180) => {
  if (!text) return 0;
  const words = text.trim().split(/\s+/).length;

  return Math.ceil(words / wordsPerMinute);
};
