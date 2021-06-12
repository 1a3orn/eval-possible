export const getTimeDisplayValue = (
  minutes: number,
  options: { hoursInDay: number; daysInWeek: number }
) => {
  const { hoursInDay, daysInWeek } = options;
  console.log(options);
  if (minutes < 60) {
    return `${minutes} minutes`;
  } else if (minutes < 60 * hoursInDay) {
    return `${round(minutes / 60)} hours`;
  } else if (minutes < 60 * hoursInDay * daysInWeek) {
    return `${round(minutes / (60 * hoursInDay))} days`;
  } else {
    return `${round(minutes / (60 * hoursInDay * daysInWeek))} weeks`;
  }
};

const round = (x: number) => Math.round(x * 10) / 10;
