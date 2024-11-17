import React, { useEffect, useState } from "react";
import ComfyJS from "comfy.js";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import StatusBar from "../StatusBar/StatusBar.js";
import MainClock from "../MainClock/MainClock.js";
import Notifications from "../Notifications/Notifications.js";
import HomeIndicator from "../HomeIndicator/HomeIndicator.js";
import VideoWallpaper from "../VideoWallpaper/VideoWallpaper.js";
import "./App.css";

const initChannel = (channel) => {
  ComfyJS.Init(channel);
};

function App() {
  const [today, setDate] = useState(new Date());
  const [fileDataURL, setFileDataURL] = useState(null);
  const locale = "en";
  let location = useLocation();

  const day = today.toLocaleDateString(locale, { weekday: "long" });
  const shortDay = today.toLocaleDateString(locale, { weekday: "short" });

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 30 * 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    const channel = location.pathname.split("/");

    if (channel[2] === undefined) {
      return;
    }

    initChannel(channel[2]);
  }, [location]);

  const date = `${day}, ${today.toLocaleDateString(locale, {
    month: "long",
  })} ${today.getDate()}\n\n`;

  const shortDate = `${shortDay} ${today.toLocaleDateString(locale, {
    month: "short",
  })} ${today.getDate()}\n\n`;

  const time = today.toLocaleTimeString(locale, {
    hour: "numeric",
    hour12: false,
    minute: "numeric",
  });

  return (
    <Routes>
      <Route
        path="/:mainUrl/*"
        element={
          <>
            <main className="main">
              <VideoWallpaper sourseContent={fileDataURL} />
              <StatusBar
                date={shortDate}
                time={time}
                setFileDataURL={setFileDataURL}
              />
              <MainClock date={date} time={time} />
              <Notifications />
              <HomeIndicator />
            </main>
          </>
        }
      />
    </Routes>
  );
}

export default App;
