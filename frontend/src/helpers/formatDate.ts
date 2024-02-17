export const formatDate = (date?: Date): string => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate().toString();
  const month = (d.getMonth() + 1) < 10 ? `0${d.getMonth() + 1}` : (d.getMonth() + 1).toString();

  return `${day}/${month}/${d.getFullYear()}`;
}