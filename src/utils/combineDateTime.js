// export const combineDateTime = (date, time) => {
//   if (!date || !time) return null;
//   const [hours, minutes] = time.split(":");
//   const utcDate = new Date(Date.UTC(
//     date.getUTCFullYear(),
//     date.getUTCMonth(),
//     date.getUTCDate(),
//     parseInt(hours, 10),
//     parseInt(minutes, 10)
//   ));
//   return utcDate.toISOString();
// };

export const combineDateTime = (date, time) => {
  if (!date || !time) return null;

  const [hours, minutes] = time.split(":");

  const localDate = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
    parseInt(hours, 10),
    parseInt(minutes, 10)
  );

  return localDate.toISOString(); 
};