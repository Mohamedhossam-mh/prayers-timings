import Grid from "@mui/material/Grid";
import Prayer from "./Prayer";

import fajr from "../assets/fajr.avif";
import dhuhr from "../assets/dhuhr.avif";
import asr from "../assets/asr.avif";
import maghrib from "../assets/maghrib.avif";
import isha from "../assets/isha.avif";

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
