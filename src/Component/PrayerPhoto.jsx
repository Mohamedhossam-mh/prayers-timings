import Grid from "@mui/material/Grid";
import Prayer from "./Prayer";

import fajr from "../assets/fajr.png";
import dhuhr from "../assets/dhuhr.png";
import asr from "../assets/asr.png";
import maghrib from "../assets/maghrib.png";
import isha from "../assets/isha.png";

export default function PrayerPhoto({ timings }) {
  const prayers = [
    { title: "الفجر", time: timings.Fajr, image: fajr },
    { title: "الظهر", time: timings.Dhuhr, image: dhuhr },
    { title: "العصر", time: timings.Asr, image: asr },
    { title: "المغرب", time: timings.Maghrib, image: maghrib },
    { title: "العشاء", time: timings.Isha, image: isha },
  ];
  return (
    <Grid container spacing={2} justifyContent="center">
      {prayers.map((prayer, index) => (
        <Prayer
          key={index}
          image={prayer.image}
          title={prayer.title}
          time={prayer.time}
        />
      ))}
    </Grid>
  );
}
