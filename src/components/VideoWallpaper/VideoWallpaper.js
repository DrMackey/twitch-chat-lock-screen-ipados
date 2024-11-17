import React, { useEffect, useState } from "react";
import localforage from "localforage";
import "./VideoWallpaper.css";

export default function VideoWallpaper({ sourseContent }) {
  const [file, setFile] = useState({});

  useEffect(() => {
    if (sourseContent != undefined) {
      localforage
        .setItem("wallpaper-url", sourseContent)
        .then(function (value) {
          setFile(value);
        })
        .catch(function (err) {
          console.log(err);
        });
    }
  }, [sourseContent]);

  useEffect(() => {
    localforage
      .getItem("wallpaper-url")
      .then(function (value) {
        if (value) {
          setFile(value);
        }
      })
      .catch(function (err) {
        console.log(err);
      });
  }, []);

  return (
    <section className="video-wallpaper">
      {file.type === "video/mp4" ? (
        <video
          src={file.result}
          autoPlay
          muted
          playsInline
          loop
          className="background-video"
        />
      ) : null}
      {file.type === "image/jpeg" ? (
        <img src={file.result} className="background-image" alt="as" />
      ) : null}
    </section>
  );
}
