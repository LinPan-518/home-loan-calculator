import { useState, useEffect } from "react";
import { toZonedTime } from "date-fns-tz";
import { isValid, format } from "date-fns";
//get current time
const useCurrentTime = () => {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Format date and time
      const formattedTime = formatDateToTimezone(now, "dd MMM yyyy, HH:mm");
      // let timezoneAbbr = Intl.DateTimeFormat('en', {timeZoneName: 'short'})?.formatToParts()?.find(p => p.type === 'timeZoneName')?.value
      setCurrentTime(`Current time ${formattedTime}`);
    };

    // Update the time immediately and set an interval to update every minute
    updateTime();
    const intervalId = setInterval(updateTime, 60000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return { currentTime };
};

// format UTC date to timezone date
function formatDateToTimezone(date: string | Date, dateFormat = "dd MMM yyyy") {
  if (!date || !isValid(new Date(date))) {
    return date.toString();
  }
  // Get the current timezone from the browser
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = toZonedTime(date, timeZone);
  const formattedDate = format(zonedDate, dateFormat);
  return formattedDate;
}

// compare expiry date with current date, return whether expiry
function checkIfExpiry(date: string | Date): boolean {
  const now = new Date();
  if (!date || !isValid(new Date(date))) {
    return true;
  }
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  // Convert UTC time to NZT
  const zonedDate = toZonedTime(now, timeZone);
  let zonedEndDate = toZonedTime(date, timeZone);
  zonedEndDate.setMonth(zonedEndDate.getMonth() - 1);
  return zonedEndDate <= zonedDate;
}

export { useCurrentTime, formatDateToTimezone, checkIfExpiry };
