import { useState, useEffect } from "react";
import moment from "moment";
import "moment/dist/locale/ar-kw";

moment.locale("ar");
const PRAYER_NAMES_AR = {
  Fajr: "الفجر",
  Dhuhr: "الظهر",
  Asr: "العصر",
  Maghrib: "المغرب",
  Isha: "العشاء",
};

export default function useNextPrayer(timings) {
  const [nextPrayer, setNextPrayer] = useState(null);
  const [remaining, setRemaining] = useState("");
  useEffect(() => {
    if (!timings || !timings.Fajr) return;

    const prayerOrder = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];

    const calculateNext = () => {
      const now = moment();
      let nextPrayerName = null;
      let nextPrayerTime = null;

      for (let prayer of prayerOrder) {
        const prayerTime = moment(timings[prayer], "HH:mm");
        if (prayerTime.isAfter(now)) {
          nextPrayerName = prayer;
          nextPrayerTime = prayerTime;
          break;
        }
      }

      if (!nextPrayerTime) {
        nextPrayerName = "Fajr";
        nextPrayerTime = moment(timings.Fajr, "HH:mm").add(1, "day");
      }

      const diff = moment.duration(nextPrayerTime.diff(now));

      const hours = String(diff.hours()).padStart(2, "0");
      const minutes = String(diff.minutes()).padStart(2, "0");
      const seconds = String(diff.seconds()).padStart(2, "0");

      setNextPrayer(PRAYER_NAMES_AR[nextPrayerName]);
      setRemaining(`${hours}:${minutes}:${seconds}`);
    };

    calculateNext();

    const interval = setInterval(calculateNext, 1000);

    return () => clearInterval(interval);
  }, [timings]);

  return { nextPrayer, remaining };
}
