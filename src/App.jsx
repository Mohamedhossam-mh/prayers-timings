// import { useState } from "react";
import MainContent from "./Component/MainContent";
import PrayerPhoto from "./Component/PrayerPhoto";

import "./App.css";
import { Container } from "@mui/material";

function App() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        width: "100vw",
      }}
    >
      <Container maxWidth="xl">
        <MainContent />
      </Container>
    </div>
  );
}

export default App;
