import { useState, useEffect, useMemo } from "react";
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
  const [timings, setTimings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const today = useClock();
  const { nextPrayer, remaining } = useNextPrayer(timings);
  const [selectedCity, setSelectedCity] = useState({
    displayName: "القاهرة",
    apiName: "Cairo",
  });

  const cityOptions = useMemo(() => egyptCities, []);

  useEffect(() => {
    if (!selectedCity?.apiName) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.aladhan.com/v1/timingsByCity?city=${selectedCity.apiName}&country=EG&method=5`,
        );
        setTimings(response.data.data.timings);
      } catch (error) {
        console.error("Error fetching prayer times:", error);
        setError("فشل تحميل المواقيت، حاول مرة أخرى.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCity]);

  const handleCityChange = (event) => {
    const city = egyptCities.find((c) => c.apiName === event.target.value);
    if (city) setSelectedCity(city);
  };

  return (
    <>
      {/* TOP ROW */}
      <Grid container justifyContent="space-around">
        <Grid item xs={12} md={6}>
          <h2>{today}</h2>
          <h1>{selectedCity.displayName}</h1>
        </Grid>

        <Grid item xs={12} md={6}>
          <h2>متبقي حتي صلاة {nextPrayer}</h2>
          <h1>{remaining}</h1>
        </Grid>
      </Grid>
      {/* TOP ROW */}
      <Divider style={{ opacity: "0.1" }} />
      {/* PRAYER CARDS */}

      <Stack direction="row" spacing={2} justifyContent="center" sx={{ mt: 5 }}>
        {timings && <PrayerPhoto timings={timings} />}
        {!timings && loading && <h2>جاري تحميل المواقيت...</h2>}
        {error && <h2 style={{ color: "red" }}>{error}</h2>}
      </Stack>
      {/* PRAYER CARDS */}

      {/* SELECT CITY */}
      <Stack
        direction="row"
        justifyContent="center"
        style={{ marginTop: "40px" }}
      >
        <FormControl sx={{ width: { xs: "70%", md: "20%" } }}>
          <InputLabel id="demo-simple-select-label">
            <span>المدينة</span>
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            label="المدينة"
            value={selectedCity.apiName || ""}
            onChange={handleCityChange}
            style={{ fontWeight: "bold" }}
            MenuProps={{
              PaperProps: {
                style: {
                  maxHeight: 48 * 5,
                  width: 250,
                },
              },
            }}
          >
            {cityOptions.map((city) => {
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
