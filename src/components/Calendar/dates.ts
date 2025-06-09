export const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export const isDateToday = (date: Date) => {
  const now = new Date();
  return (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  );
};

export const getDaysMatrix = (date: Date) => {
  // Returns a 6x7 matrix of days for the calendar grid
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const prevMonthLastDay = new Date(year, month, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const daysInPrevMonth = prevMonthLastDay.getDate();
  // Shift so Monday is 0, Sunday is 6
  const startDay = (firstDayOfMonth.getDay() + 6) % 7;
  return Array.from({ length: 6 }, (_, week) => {
    return Array.from({ length: 7 }, (_, day) => {
      if (week === 0 && day < startDay) {
        // Previous month
        return {
          day: daysInPrevMonth - startDay + day + 1,
          isOutOfMonth: true,
          date: new Date(year, month - 1, daysInPrevMonth - startDay + day + 1),
        };
      }

      const currentDay = week * 7 + day - startDay + 1;
      if (currentDay > daysInMonth) {
        // Next month
        const nextMonthDay = currentDay - daysInMonth;
        return {
          day: nextMonthDay,
          isOutOfMonth: true,
          date: new Date(year, month + 1, nextMonthDay),
        };
      }

      // Current month
      return {
        day: currentDay,
        isOutOfMonth: false,
        date: new Date(year, month, currentDay),
      };
    });
  });
};
