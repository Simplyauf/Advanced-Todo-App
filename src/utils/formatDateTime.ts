export function formatDateTime(inputDateTime: string) {
  const dateTime = new Date(inputDateTime);

  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  return dateTime.toLocaleDateString("en-US", options);
}
