function getCurrentTimeInTimezone(timeZone) {
  const options = {
    timeZone: timeZone,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, // Set to true for 12-hour format
  };

  const formatter = new Intl.DateTimeFormat("en-US", options);
  const parts = formatter.formatToParts(new Date());

  // Extract hour, minute, and second
  const time = {
    hour: parts.find((part) => part.type === "hour").value,
    minute: parts.find((part) => part.type === "minute").value,
    second: parts.find((part) => part.type === "second").value,
  };

  return `${time.hour}:${time.minute}:${time.second}`;
}

module.exports = getCurrentTimeInTimezone;
