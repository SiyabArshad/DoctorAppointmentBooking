export function getSecondsUntil(dateTimeString) {
  // Split the date and time string
  const [dateStr, timeStr] = dateTimeString.split(" ");

  // Parse the date
  const [month, day, year] = dateStr.split("/");
  const hour = parseInt(timeStr);
  const isPM = timeStr.toLowerCase().includes("pm");
  const minutes = 0; // Assuming minutes are always 0 in your input format

  // Create a Date object with the given date and time
  const targetDate = new Date(
    year,
    month - 1,
    day,
    isPM && hour !== 12 ? hour + 12 : hour,
    minutes
  );

  // Get the current date
  const currentDate = new Date();

  // Calculate the difference in seconds
  const differenceInSeconds = Math.floor((targetDate - currentDate) / 1000);

  return differenceInSeconds;
}
