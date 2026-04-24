export const vrijemeDo = (targetDate: string | Date) => {
  const now = new Date();
  const target = new Date(targetDate);

  let diff = target.getTime() - now.getTime();

  if (diff <= 0) return "Već je prošlo";

  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;

  const months = Math.floor(diff / month);
  diff %= month;

  const weeks = Math.floor(diff / week);
  diff %= week;

  const days = Math.floor(diff / day);
  diff %= day;

  const hours = Math.floor(diff / hour);
  diff %= hour;

  const minutes = Math.floor(diff / minute);

  if (months > 0)
    return `za ${months} mjesec${months > 1 ? (months < 5 ? "a" : "i") : ""}${weeks ? ` i ${weeks} tjedan` : ""}`;
  if (weeks > 0)
    return `za ${weeks} tjedan${weeks > 1 ? "a" : ""}${days ? ` i ${days} dan` : ""}`;
  if (days > 0) return `za ${days} dan${days > 1 ? "a" : ""}`;
  if (hours > 0)
    return `za ${hours} sat${hours > 1 ? (hours < 5 ? "a" : "i") : ""}`;
  if (minutes > 0) return `za ${minutes} min`;

  return "Uskoro";
};
