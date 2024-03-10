export const getShortString = (msg: string, end = 100) => {
  return msg.length <= end ? msg : msg.substring(0, end) + "...";
};
