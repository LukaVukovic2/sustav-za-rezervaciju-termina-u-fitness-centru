export const formatirajVrijemeTreninga = (vrijeme: Date) => {
  return new Date(vrijeme).toLocaleString("hr-HR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
};
