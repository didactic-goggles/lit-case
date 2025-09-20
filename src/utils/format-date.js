import { localeManager } from './i18n.js';

export const formatDate = (date) => {
  const currentLocale = localeManager.getCurrentLocale();
  const localeMap = {
    'tr': 'tr-TR',
    'en': 'en-US'
  };
  const intlLocale = localeMap[currentLocale] || 'tr-TR';
  
  return new Date(date).toLocaleDateString(intlLocale, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};
