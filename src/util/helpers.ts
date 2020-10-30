const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];
export const formatDate = (date: string): string => {
  const d = new Date(date);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
};

const fileSizes = ['', 'K', 'M', 'G', 'T'];
export const formatNumber = (number: number): string => {
  const k = 1000;
  const i = Math.floor(Math.log(number) / Math.log(k));
  return `${parseFloat((number / Math.pow(k, i)).toFixed(1))}${fileSizes[i]}`;
};
