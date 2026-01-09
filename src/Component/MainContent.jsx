import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import PrayerPhoto from "./PrayerPhoto";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import useClock from "../hooks/useClock";
import useNextPrayer from "../hooks/useNextPrayer";
import egyptCities from "../data/egyptCities.js";

export default function MainContent() {
  const [timings, setTimings] = useState({});
  const today = useClock();
  const { nextPrayer, remaining } = useNextPrayer(timings);
  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });

  useEffect(() => {
    if (!selectedCity?.apiName) return;
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=EG&method=5`
        );
        setTimings(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
      }
    };
    fetchData();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    setSelectedCity(
      egyptCities.find((city) => city.apiName === event.target.value)
    );
  };

  return (
    <>
      {/* TOP ROW */}
      <Grid container justifyContent="space-around">
        <Grid item xs={6}>
          <h2 style={{ fontFamily: " IBM Plex Sans Arabic, sans-serif" }}>
            {today}
          </h2>
          <h1>{selectedCity.displayName}</h1>
        </Grid>

        <Grid item xs={6}>
          <h2>متبقي حتي صلاة {nextPrayer}</h2>
          <h1>{remaining}</h1>
        </Grid>
      </Grid>
      {/* TOP ROW */}
      <Divider style={{ borderColor: "white", opacity: "0.1" }} />
      {/* PRAYER CARDS */}

      <Stack
        direction="row"
        spacing={2}
        justifyContent="center"
        style={{ marginTop: "50px" }}
      >
        {timings && <PrayerPhoto timings={timings} />}
      </Stack>
      {/* PRAYER CARDS */}

      {/* SELECT CITY */}
      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "40px" }}
      >
        <FormControl style={{ width: "20%" }}>
          <InputLabel id="demo-simple-select-label">
            <span style={{ color: "white" }}>المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="المدينة"
            value={selectedCity.apiName || ""}
            onChange={handleCityChange}
            style={{ color: "white", fontWeight: "bold" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 5,
                  width: 250,
                },
              },
            }}
          >
            {egyptCities.map((city) => {
              return (
                <MenuItem key={city.apiName} value={city.apiName}>
                  {city.displayName}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Stack>
      {/* SELECT CITY */}
    </>
  );
}
