import { useState, useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/ar-kw";

moment.locale("ar");
export default function useClock() {
  const [time, setTime] = useState(moment().format("MMMM Do YYYY | h:mm:ss"));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().format("MMMM Do YYYY | h:mm:ss"));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
}
